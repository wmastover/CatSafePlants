import Image from "next/image";
import fs from "fs";
import path from "path";

interface PlantImageProps {
  slug: string;
  imagePath?: string;
  alt: string;
  placeholder?: string;
  className?: string;
}

const HERO_NAMES = ["hero.webp", "hero.jpg", "hero.jpeg", "hero.png"];

function resolveHeroPath(slug: string): string | null {
  const dir = path.join(process.cwd(), "public", "images", "plants", slug);
  for (const name of HERO_NAMES) {
    const full = path.join(dir, name);
    if (fs.existsSync(full)) {
      return `/images/plants/${slug}/${name}`;
    }
  }
  return null;
}

function resolveImageSrc(slug: string, imagePath?: string): string | null {
  if (!imagePath) {
    return resolveHeroPath(slug);
  }

  const publicPath = path.join(process.cwd(), "public", imagePath.replace(/^\//, ""));
  if (fs.existsSync(publicPath)) {
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  }

  return null;
}

export function PlantImage({
  slug,
  imagePath,
  alt,
  placeholder,
  className = "",
}: PlantImageProps) {
  const src = resolveImageSrc(slug, imagePath);

  return (
    <div className={`plant-image ${className}`.trim()}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
      ) : (
        <div className="plant-image-placeholder" aria-hidden={!!placeholder}>
          {placeholder ?? alt}
        </div>
      )}
    </div>
  );
}
