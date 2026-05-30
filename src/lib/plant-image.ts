import fs from "fs";
import path from "path";

const HERO_NAMES = ["hero.webp", "hero.jpg", "hero.jpeg", "hero.png"];
const INTERIOR_NAMES = [
  "hero-interior.webp",
  "hero-interior.jpg",
  "hero-interior.jpeg",
  "hero-interior.png",
];

function resolveFromDir(
  slug: string,
  names: string[],
  imagePath?: string,
): string | null {
  if (imagePath) {
    const publicPath = path.join(process.cwd(), "public", imagePath.replace(/^\//, ""));
    if (fs.existsSync(publicPath)) {
      return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    }
  }

  const dir = path.join(process.cwd(), "public", "images", "plants", slug);
  for (const name of names) {
    const full = path.join(dir, name);
    if (fs.existsSync(full)) {
      return `/images/plants/${slug}/${name}`;
    }
  }

  return null;
}

/** Resolve public URL for a plant hero image (server-only). */
export function resolvePlantHeroSrc(slug: string, imagePath?: string): string | null {
  return resolveFromDir(slug, HERO_NAMES, imagePath);
}

/** Resolve public URL for a plant interior lifestyle photo (server-only). */
export function resolvePlantInteriorSrc(slug: string, imagePath?: string): string | null {
  return resolveFromDir(slug, INTERIOR_NAMES, imagePath);
}
