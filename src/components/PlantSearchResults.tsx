import Link from "next/link";
import Image from "next/image";
import type { PlantFrontmatter } from "@/lib/plant-schema";

export interface PlantSearchCard {
  slug: string;
  frontmatter: PlantFrontmatter;
  heroSrc: string | null;
}

function verdictMeta(verdict: string): { label: string; warn: boolean } {
  if (verdict === "safe") return { label: "Safe", warn: false };
  if (verdict === "toxic") return { label: "Toxic", warn: true };
  return { label: "Unknown", warn: true };
}

interface PlantSearchResultsProps {
  plants: PlantSearchCard[];
  className?: string;
  emptyMessage?: string;
  lazyImages?: boolean;
}

export function PlantSearchResults({
  plants,
  className,
  emptyMessage = "No plants match your search. Try another name.",
  lazyImages = false,
}: PlantSearchResultsProps) {
  if (plants.length === 0) {
    return <p className="library-empty">{emptyMessage}</p>;
  }

  return (
    <ul className={className ? `library-grid ${className}` : "library-grid"}>
      {plants.map((plant) => {
        const v = verdictMeta(plant.frontmatter.verdict);
        return (
          <li key={plant.slug}>
            <Link href={`/plants/${plant.slug}/`} className="library-card">
              <div className="library-card-image">
                {plant.heroSrc ? (
                  <Image
                    src={plant.heroSrc}
                    alt={plant.frontmatter.hero.alt}
                    fill
                    loading={lazyImages ? "lazy" : undefined}
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                ) : (
                  <div className="plant-image-placeholder" aria-hidden>
                    {plant.frontmatter.title}
                  </div>
                )}
              </div>
              <div className="library-card-body">
                <div className={`library-card-verdict${v.warn ? " warn" : ""}`}>
                  {v.label}
                </div>
                <h2>{plant.frontmatter.title}</h2>
                <p className="library-card-latin">{plant.frontmatter.latin}</p>
                <p className="library-card-dek">{plant.frontmatter.dek}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
