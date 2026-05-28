#!/usr/bin/env npx tsx
/**
 * Generate a botanical hero image via OpenRouter Nano Banana.
 *
 * Usage:
 *   npm run generate-image -- spider-plant "Spider Plant"
 *   npm run generate-image -- --all
 *   npm run generate-image -- peace-lily "Peace Lily" --reference ./my-photo.jpg
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { generatePlantImage } from "./lib/image-gen";

const PLANTS_DIR = path.join(process.cwd(), "content", "plants");

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

function listPlantSlugs(): string[] {
  return fs
    .readdirSync(PLANTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function getPlantTitle(slug: string): string {
  const raw = fs.readFileSync(path.join(PLANTS_DIR, `${slug}.mdx`), "utf8");
  const { data } = matter(raw);
  return (data.title as string) ?? slug.replace(/-/g, " ");
}

function parseArgs(argv: string[]) {
  const args = argv.filter((a) => !a.startsWith("#"));
  const all = args.includes("--all");
  const refIdx = args.indexOf("--reference");
  const referenceArg = refIdx >= 0 ? args[refIdx + 1] : undefined;
  const filtered = args.filter(
    (a) => a !== "--all" && a !== "--reference" && a !== referenceArg,
  );
  return { all, referenceArg, filtered };
}

async function main() {
  loadEnvLocal();

  const { all, referenceArg, filtered } = parseArgs(process.argv.slice(2));

  const jobs: Array<{ slug: string; title: string }> = [];

  if (all) {
    for (const slug of listPlantSlugs()) {
      jobs.push({ slug, title: getPlantTitle(slug) });
    }
  } else {
    const slug = filtered[0];
    const title = filtered.slice(1).join(" ") || (slug ? getPlantTitle(slug) : "");
    if (!slug) {
      console.error(
        "Usage: npm run generate-image -- <slug> [Title]\n" +
          "       npm run generate-image -- --all\n" +
          "       npm run generate-image -- spider-plant \"Spider Plant\" --reference ./photo.jpg",
      );
      process.exit(1);
    }
    jobs.push({ slug, title });
  }

  let ok = 0;
  let failed = 0;

  for (const job of jobs) {
    console.log(`Generating ${job.slug} (${job.title})…`);
    try {
      const { outputPath, usedReferencePhoto } = await generatePlantImage({
        slug: job.slug,
        plantName: job.title,
        referencePhotoPath: referenceArg,
        onReferenceMissing: (msg) => console.warn(`  ⚠ ${msg}`),
      });
      console.log(
        `  ✓ Saved ${outputPath}${usedReferencePhoto ? "" : " (style reference only)"}`,
      );
      ok++;
    } catch (err) {
      console.error(`  ✗ ${job.slug}: ${err instanceof Error ? err.message : err}`);
      failed++;
    }
  }

  if (jobs.length > 1) {
    console.log(`\nDone: ${ok} succeeded, ${failed} failed.`);
  }

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main();
