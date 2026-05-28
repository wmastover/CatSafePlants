#!/usr/bin/env npx tsx
/**
 * Restore em dashes (—) in site source files.
 * Reverses accidental hyphen substitution while preserving YAML list markers
 * and compound words (Cast-Iron, african-violet, etc.).
 *
 * Usage: npm run restore-em-dashes [-- --dry-run]
 */

import fs from "fs";
import path from "path";

const EM_DASH = "\u2014";
const HYPHEN = "-";

const DRY_RUN = process.argv.includes("--dry-run");

const ROOT = process.cwd();
const SCAN_DIRS = ["content", "src", "scripts"];
const EXTENSIONS = new Set([
  ".mdx",
  ".md",
  ".ts",
  ".tsx",
  ".css",
  ".json",
  ".js",
  ".jsx",
]);

const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);

function restoreSegment(text: string): string {
  return text
    .replaceAll(` ${HYPHEN} `, ` ${EM_DASH} `)
    .replaceAll(`"${HYPHEN} `, `"${EM_DASH} `)
    .replaceAll(` ${HYPHEN}"`, ` ${EM_DASH}"`)
    .replaceAll(`'${HYPHEN} `, `'${EM_DASH} `)
    .replaceAll(` ${HYPHEN}'`, ` ${EM_DASH}'`)
    .replaceAll(` ${HYPHEN}<`, ` ${EM_DASH}<`)
    .replace(new RegExp(` ${HYPHEN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`), ` ${EM_DASH}`);
}

function restoreLine(line: string): string {
  const listMatch = line.match(/^(\s*-\s)/);
  if (listMatch) {
    const prefix = listMatch[1];
    return prefix + restoreSegment(line.slice(prefix.length));
  }
  return restoreSegment(line);
}

function restoreContent(text: string): string {
  return text.split("\n").map(restoreLine).join("\n");
}

function countRestorations(original: string, updated: string): number {
  let count = 0;
  const origLines = original.split("\n");
  const updatedLines = updated.split("\n");

  for (let i = 0; i < origLines.length; i++) {
    const before = origLines[i] ?? "";
    const after = updatedLines[i] ?? "";
    if (before === after) continue;
    count += (after.match(new RegExp(EM_DASH, "g")) ?? []).length -
      (before.match(new RegExp(EM_DASH, "g")) ?? []).length;
  }

  return count;
}

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".") continue;
    if (SKIP_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

let filesChanged = 0;
let totalReplacements = 0;

for (const dir of SCAN_DIRS) {
  const absDir = path.join(ROOT, dir);
  if (!fs.existsSync(absDir)) continue;

  for (const filePath of walk(absDir)) {
    if (filePath.endsWith("restore-em-dashes.ts")) continue;

    const original = fs.readFileSync(filePath, "utf8");
    const updated = restoreContent(original);
    if (updated === original) continue;

    const count = countRestorations(original, updated);
    const relPath = path.relative(ROOT, filePath);

    if (DRY_RUN) {
      console.log(`[dry-run] ${relPath}: ${count} restoration(s)`);
    } else {
      fs.writeFileSync(filePath, updated, "utf8");
      console.log(`${relPath}: ${count} restoration(s)`);
    }

    filesChanged++;
    totalReplacements += count;
  }
}

if (filesChanged === 0) {
  console.log("No spaced hyphens to restore.");
} else {
  const prefix = DRY_RUN ? "Would restore" : "Restored";
  console.log(`\n${prefix} ${filesChanged} file(s), ${totalReplacements} em dash(es) total.`);
}
