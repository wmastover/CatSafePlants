import Link from "next/link";
import { HomeJsonLd } from "@/components/PlantJsonLd";
import { SiteLogo } from "@/components/SiteLogo";
import { LandingHeroSearch } from "@/components/LandingHeroSearch";
import { getAllPlants } from "@/lib/plants";
import { resolvePlantHeroSrc } from "@/lib/plant-image";

export function LandingPage() {
  const plants = getAllPlants();
  const featured = plants.slice(0, 4).map((plant) => ({
    slug: plant.slug,
    frontmatter: plant.frontmatter,
    heroSrc: null,
  }));
  const heroPlantDoc = plants.find((p) => p.slug === "spider-plant") ?? plants[0];
  const heroPlant = heroPlantDoc
    ? {
        slug: heroPlantDoc.slug,
        frontmatter: heroPlantDoc.frontmatter,
        heroSrc: resolvePlantHeroSrc(heroPlantDoc.slug, heroPlantDoc.frontmatter.hero.src),
      }
    : undefined;
  const suggested = ["peace-lily", "spider-plant", "boston-fern"]
    .map((slug) => plants.find((p) => p.slug === slug))
    .filter((plant): plant is NonNullable<typeof plant> => plant !== undefined)
    .map((plant) => ({
      slug: plant.slug,
      frontmatter: plant.frontmatter,
      heroSrc: null,
    }));

  return (
    <>
      <HomeJsonLd />
      <div className="landing-root">
        <div className="landing-grid-bg" />

        <nav className="landing-nav">
          <div className="landing-issue">
            <SiteLogo />
          </div>
          <Link href="/" className="landing-wordmark">
            cat <em>safe</em> plants
          </Link>
          <div className="landing-nav-right">
            <Link href="/library/">Library</Link>
          </div>
        </nav>

        <LandingHeroSearch
          heroPlant={heroPlant}
          suggested={suggested}
          featured={featured}
        />
      </div>
    </>
  );
}
