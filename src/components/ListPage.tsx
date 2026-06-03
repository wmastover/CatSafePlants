import Link from "next/link";
import { LibraryGrid } from "@/components/LibraryGrid";
import { SiteNav } from "@/components/SiteNav";
import { resolvePlantHeroSrc } from "@/lib/plant-image";
import type { PlantDocument } from "@/lib/plant-schema";

export interface ListPageProps {
  kicker: string;
  title: string;
  titleEm: string;
  dek: string;
  intro: React.ReactNode;
  plants: PlantDocument[];
  filterVerdict?: "safe" | "toxic";
  postIntro?: React.ReactNode;
  afterGrid?: React.ReactNode;
}

export function ListPage({
  kicker,
  title,
  titleEm,
  dek,
  intro,
  plants,
  filterVerdict,
  postIntro,
  afterGrid,
}: ListPageProps) {
  const filtered = filterVerdict
    ? plants.filter((p) => p.frontmatter.verdict === filterVerdict)
    : plants;

  const cards = filtered.map((plant) => ({
    slug: plant.slug,
    frontmatter: plant.frontmatter,
    heroSrc: resolvePlantHeroSrc(plant.slug, plant.frontmatter.hero.src),
  }));

  return (
    <div className="library-root landing-root">
      <div className="landing-grid-bg" />
      <SiteNav />

      <header className="library-header">
        <p className="library-kicker">{kicker}</p>
        <h1 className="library-title">
          {title} <em>{titleEm}</em>
        </h1>
        <p className="library-dek">{dek}</p>
      </header>

      <section className="list-intro">
        {intro}
      </section>

      {postIntro}

      <LibraryGrid plants={cards} />

      {afterGrid}

      <section className="list-footer-cta">
        <p>
          See the complete database — including toxic plants to avoid — in the{" "}
          <Link href="/library/">full library</Link>.
        </p>
      </section>
    </div>
  );
}
