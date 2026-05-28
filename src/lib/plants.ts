import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { plantFrontmatterSchema, type PlantDocument } from "./plant-schema";

const PLANTS_DIR = path.join(process.cwd(), "content", "plants");

function isPlantFile(filename: string): boolean {
  return filename.endsWith(".mdx") && !filename.startsWith("_");
}

export function getPlantSlugs(): string[] {
  if (!fs.existsSync(PLANTS_DIR)) return [];
  return fs
    .readdirSync(PLANTS_DIR)
    .filter(isPlantFile)
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPlantBySlug(slug: string): PlantDocument | null {
  const filePath = path.join(PLANTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const parsed = plantFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid frontmatter in ${slug}.mdx: ${details}`);
  }

  if (parsed.data.slug !== slug) {
    throw new Error(
      `Slug mismatch in ${slug}.mdx: frontmatter.slug is "${parsed.data.slug}"`,
    );
  }

  return {
    slug,
    frontmatter: parsed.data,
    content: content.trim(),
  };
}

export function getAllPlants(): PlantDocument[] {
  return getPlantSlugs()
    .map((slug) => getPlantBySlug(slug))
    .filter((plant): plant is PlantDocument => plant !== null)
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}

export function getRelatedPlants(slugs: string[]): PlantDocument[] {
  return slugs
    .map((slug) => getPlantBySlug(slug))
    .filter((plant): plant is PlantDocument => plant !== null);
}

export function getFeaturedPlants(limit = 4): PlantDocument[] {
  return getAllPlants().slice(0, limit);
}
