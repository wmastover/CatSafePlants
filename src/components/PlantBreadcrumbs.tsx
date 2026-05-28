import Link from "next/link";
import type { PlantFrontmatter } from "@/lib/plant-schema";

interface PlantBreadcrumbsProps {
  plant: PlantFrontmatter;
}

function formatReviewDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PlantBreadcrumbs({ plant }: PlantBreadcrumbsProps) {
  return (
    <div className="crumbs">
      <div>
        <Link href="/">Library</Link>
        <span className="sep">/</span>
        <span>{plant.taxonomy.family}</span>
        <span className="sep">/</span>
        <span>{plant.taxonomy.genus}</span>
        <span className="sep">/</span>
        <span className="now">{plant.taxonomy.species}</span>
      </div>
      <div>
        Last reviewed ·{" "}
        <time dateTime={plant.lastReviewed}>{formatReviewDate(plant.lastReviewed)}</time>
      </div>
    </div>
  );
}
