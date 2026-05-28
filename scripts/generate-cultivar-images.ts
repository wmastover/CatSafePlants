#!/usr/bin/env npx tsx
/**
 * Generate botanical cultivar images for safe plant pages.
 *
 * Usage:
 *   npm run generate-cultivar-images -- --all
 *   npm run generate-cultivar-images -- spider-plant
 *   npm run generate-cultivar-images -- spider-plant --force
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { generatePlantImage } from "./lib/image-gen";
import { cultivarImagePath, cultivarSlug } from "./lib/image-gen-config";

const PLANTS_DIR = path.join(process.cwd(), "content", "plants");

interface CultivarEntry {
  name: string;
  subtitle?: string;
}

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

function listSafePlantsWithCultivars(slugFilter?: string) {
  const files = fs
    .readdirSync(PLANTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  const jobs: Array<{
    slug: string;
    title: string;
    cultivars: CultivarEntry[];
  }> = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    if (slugFilter && slug !== slugFilter) continue;

    const raw = fs.readFileSync(path.join(PLANTS_DIR, file), "utf8");
    const { data } = matter(raw);
    if (data.verdict !== "safe" || !Array.isArray(data.cultivars) || !data.cultivars.length) {
      continue;
    }

    jobs.push({
      slug,
      title: (data.title as string) ?? slug,
      cultivars: data.cultivars as CultivarEntry[],
    });
  }

  return jobs;
}

function outputExists(slug: string, cultivarName: string): boolean {
  const out = path.join(
    process.cwd(),
    "public",
    "images",
    "plants",
    slug,
    `${cultivarSlug(cultivarName)}.png`,
  );
  return fs.existsSync(out);
}

function parseArgs(argv: string[]) {
  const force = argv.includes("--force");
  const all = argv.includes("--all");
  const filtered = argv.filter((a) => a !== "--force" && a !== "--all");
  const slug = filtered[0];
  return { force, all, slug };
}

async function main() {
  loadEnvLocal();

  const { force, all, slug } = parseArgs(process.argv.slice(2));

  if (!all && !slug) {
    console.error(
      "Usage: npm run generate-cultivar-images -- --all\n" +
        "       npm run generate-cultivar-images -- <slug>\n" +
        "       npm run generate-cultivar-images -- spider-plant --force",
    );
    process.exit(1);
  }

  const plants = listSafePlantsWithCultivars(all ? undefined : slug);
  if (!plants.length) {
    console.error("No safe plants with cultivars found.");
    process.exit(1);
  }

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const plant of plants) {
    console.log(`\n${plant.title} (${plant.slug})`);
    for (const cultivar of plant.cultivars) {
      const imagePath = cultivarImagePath(plant.slug, cultivar.name);
      if (!force && outputExists(plant.slug, cultivar.name)) {
        console.log(`  ◦ ${cultivar.name} — already exists, skipping`);
        skipped++;
        continue;
      }

      console.log(`  → ${cultivar.name}…`);
      try {
        const { outputPath } = await generatePlantImage({
          slug: plant.slug,
          plantName: plant.title,
          cultivarName: cultivar.name,
          cultivarSubtitle: cultivar.subtitle,
        });
        console.log(`    ✓ ${outputPath}`);
        ok++;
      } catch (err) {
        console.error(
          `    ✗ ${cultivar.name}: ${err instanceof Error ? err.message : err}`,
        );
        failed++;
      }
    }
  }

  console.log(`\nDone: ${ok} generated, ${skipped} skipped, ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

main();
