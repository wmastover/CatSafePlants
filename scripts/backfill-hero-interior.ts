#!/usr/bin/env npx tsx
/**
 * One-off backfill: add a minimal heroInterior block to plant MDX files
 * that have hero-interior.* on disk but no heroInterior frontmatter.
 *
 * Inserts heroInterior immediately after the hero: block.
 */
import fs from "fs";
import path from "path";

const PLANTS_DIR = path.join(process.cwd(), "content", "plants");
const PUBLIC_DIR = path.join(process.cwd(), "public", "images", "plants");

const files = fs
  .readdirSync(PLANTS_DIR)
  .filter((f) => f.endsWith(".mdx") && f !== "_TEMPLATE.mdx");

let added = 0;
let skipped = 0;

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const full = path.join(PLANTS_DIR, file);
  const raw = fs.readFileSync(full, "utf8");

  if (raw.includes("heroInterior:")) {
    skipped++;
    continue;
  }

  // Confirm an interior image actually exists on disk
  const interiorExists = ["hero-interior.png", "hero-interior.webp", "hero-interior.jpg", "hero-interior.jpeg"]
    .some((n) => fs.existsSync(path.join(PUBLIC_DIR, slug, n)));
  if (!interiorExists) {
    console.log(`skip ${slug} — no hero-interior file on disk`);
    skipped++;
    continue;
  }

  // Pull title from frontmatter (between leading --- and next ---)
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    console.warn(`skip ${slug} — no frontmatter block`);
    skipped++;
    continue;
  }
  const titleMatch = fmMatch[1].match(/^title:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim().replace(/^["']|["']$/g, "") : slug;

  // Find the hero: block and its end. Hero is a top-level key in frontmatter
  // whose nested fields are indented by 2 spaces. The block ends at the first
  // line that is not blank and not indented.
  const lines = raw.split("\n");
  let heroStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("hero:")) {
      heroStart = i;
      break;
    }
  }
  if (heroStart === -1) {
    console.warn(`skip ${slug} — no hero: block found`);
    skipped++;
    continue;
  }

  let heroEnd = heroStart + 1;
  while (heroEnd < lines.length) {
    const line = lines[heroEnd];
    if (line === "" || line.startsWith("  ") || line.startsWith("\t")) {
      heroEnd++;
      continue;
    }
    break;
  }

  const interiorBlock = [
    `heroInterior:`,
    `  alt: ${title} photographed in a sunlit interior`,
    `  tag: Fig. II · In situ`,
    `  caption: ${title} — photographed in a calm, sunlit home setting.`,
  ];

  lines.splice(heroEnd, 0, ...interiorBlock);
  fs.writeFileSync(full, lines.join("\n"));
  console.log(`added heroInterior → ${slug}`);
  added++;
}

console.log(`\nDone. added=${added} skipped=${skipped}`);
