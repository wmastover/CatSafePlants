import { LibraryGrid } from "@/components/LibraryGrid";
import { SiteNav } from "@/components/SiteNav";
import { resolvePlantHeroSrc } from "@/lib/plant-image";
import type { PlantDocument } from "@/lib/plant-schema";

interface LibraryPageProps {
  plants: PlantDocument[];
}

export function LibraryPage({ plants }: LibraryPageProps) {
  const cards = plants.map((plant) => ({
    slug: plant.slug,
    frontmatter: plant.frontmatter,
    heroSrc: resolvePlantHeroSrc(plant.slug, plant.frontmatter.hero.src),
  }));

  return (
    <div className="library-root landing-root">
      <div className="landing-grid-bg" />
      <SiteNav active="library" />

      <header className="library-header">
        <p className="library-kicker">The library</p>
        <h1 className="library-title">
          Every plant,<em>one verdict.</em>
        </h1>
        <p className="library-dek">
          {plants.length} entries — each reviewed against ASPCA data. Search by
          common or Latin name, or filter by safety.
        </p>
      </header>

      <LibraryGrid plants={cards} />
    </div>
  );
}
