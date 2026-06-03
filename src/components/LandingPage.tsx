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
            <Link href="/cat-safe-plants/">Safe plants</Link>
            <Link href="/toxic-plants-for-cats/">Toxic plants</Link>
            <Link href="/library/">Library</Link>
            <Link href="/emergency/cat-ate-a-lily/" className="landing-nav-emergency">
              Emergency
            </Link>
          </div>
        </nav>

        <LandingHeroSearch
          heroPlant={heroPlant}
          suggested={suggested}
          featured={featured}
        />

        <section className="landing-ia" aria-label="Browse the database">
          <div className="landing-ia-inner">
            <p className="landing-ia-kicker">Browse the database</p>
            <h2 className="landing-ia-title">
              Where would you like to <em>start</em>?
            </h2>
            <div className="landing-ia-grid">
              <Link href="/cat-safe-plants/" className="landing-ia-card">
                <span className="landing-ia-card-tag">◦ Safe</span>
                <h3>Cat-safe plants</h3>
                <p>The full ASPCA non-toxic list — every plant cleared for a cat household, sourced and reviewed.</p>
              </Link>
              <Link href="/houseplants-safe-for-cats/" className="landing-ia-card">
                <span className="landing-ia-card-tag">◦ Safe · indoors</span>
                <h3>Safe houseplants</h3>
                <p>The indoor-only subset — cat-safe plants that thrive in pots, on shelves, and in low light.</p>
              </Link>
              <Link href="/toxic-plants-for-cats/" className="landing-ia-card landing-ia-card-warn">
                <span className="landing-ia-card-tag warn">! Toxic</span>
                <h3>Toxic plants</h3>
                <p>The full ASPCA toxic list — know what to avoid, and why. ASPCA-verified for every entry.</p>
              </Link>
              <Link href="/emergency/cat-ate-a-lily/" className="landing-ia-card landing-ia-card-emergency">
                <span className="landing-ia-card-tag emergency">⚠ Emergency</span>
                <h3>Cat ate a lily?</h3>
                <p>Stop reading and go to the vet. Then come back — this page covers true-lily renal failure protocol.</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
