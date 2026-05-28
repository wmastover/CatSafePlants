import Image from "next/image";
import { resolvePlantHeroSrc } from "@/lib/plant-image";

interface PlantImageProps {
  slug: string;
  imagePath?: string;
  alt: string;
  placeholder?: string;
  className?: string;
  /** Pre-resolved src for client components (avoids fs on client). */
  resolvedSrc?: string | null;
}

export function PlantImage({
  slug,
  imagePath,
  alt,
  placeholder,
  className = "",
  resolvedSrc,
}: PlantImageProps) {
  const src =
    resolvedSrc !== undefined ? resolvedSrc : resolvePlantHeroSrc(slug, imagePath);

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
