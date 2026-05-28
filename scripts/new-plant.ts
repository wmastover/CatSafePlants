#!/usr/bin/env npx tsx
/**
 * Scaffold a new plant MDX file from the template.
 * Usage: npm run new-plant -- spider-plant "Spider Plant"
 */

import fs from "fs";
import path from "path";

const [, , slug, ...titleParts] = process.argv;
const title = titleParts.join(" ") || slug?.replace(/-/g, " ");

if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: npm run new-plant -- <slug> [Title]");
  console.error("Example: npm run new-plant -- monstera-deliciosa \"Monstera Deliciosa\"");
  process.exit(1);
}

const templatePath = path.join(process.cwd(), "content", "plants", "_TEMPLATE.mdx");
const outputPath = path.join(process.cwd(), "content", "plants", `${slug}.mdx`);

if (fs.existsSync(outputPath)) {
  console.error(`File already exists: ${outputPath}`);
  process.exit(1);
}

let template = fs.readFileSync(templatePath, "utf8");
template = template.replace(/^title: Plant Common Name$/m, `title: ${title}`);
template = template.replace(/^slug: plant-slug$/m, `slug: ${slug}`);
template = template.replace(/plant-slug/g, slug);
template = template.replace(/Plant Common Name/g, title);
template = template.replace(/\[Plant\]/g, title);
template = template.replace(/\[plant\]/g, title.toLowerCase());

fs.writeFileSync(outputPath, template);
console.log(`Created ${outputPath}`);
console.log("Next steps:");
console.log("  1. Fill in frontmatter (ASPCA URL, verdict, facts, FAQ)");
console.log("  2. Write the MDX body with a direct answer in paragraph one");
console.log("  3. Run npm run build to validate");
console.log("  4. Log the page in logs/published-pages.md");
