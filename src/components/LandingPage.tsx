import Link from "next/link";
import { PlantImage } from "@/components/PlantImage";
import { HomeJsonLd } from "@/components/PlantJsonLd";
import { getAllPlants } from "@/lib/plants";
import { SearchForm } from "@/components/SearchForm";

function verdictLabel(verdict: string): { text: string; warn: boolean } {
  if (verdict === "safe") return { text: "◦ Safe", warn: false };
  if (verdict === "toxic") return { text: "◦ Toxic", warn: true };
  return { text: "◦ Unknown", warn: true };
}

export function LandingPage() {
  const plants = getAllPlants();
  const featured = plants.slice(0, 4);
  const heroPlant = plants.find((p) => p.slug === "spider-plant") ?? plants[0];
  const suggested = ["peace-lily", "spider-plant", "boston-fern"]
    .map((slug) => plants.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      <HomeJsonLd />
      <div className="landing-root">
        <div className="landing-grid-bg" />

        <nav className="landing-nav">
          <div className="landing-issue" />
          <Link href="/" className="landing-wordmark">
            cat <em>safe</em> plants
          </Link>
          <div className="landing-nav-right">
            <Link href="/library/">Library</Link>
          </div>
        </nav>

        <section className="landing-hero">
          <div className="landing-left">
            <h1 className="landing-headline">
              For the cat who<em>eats everything.</em>
            </h1>
            <p className="landing-dek">
              A careful guide to which houseplants she can nibble freely, and which
              ones belong somewhere else entirely.
            </p>

            <SearchForm plants={plants} />

            <div className="landing-suggest">
              <span>Often asked —</span>
              {suggested.map((plant) =>
                plant ? (
                  <Link key={plant.slug} href={`/plants/${plant.slug}/`}>
                    {plant.frontmatter.title}
                  </Link>
                ) : null,
              )}
            </div>
          </div>

          <div className="landing-right">
            {heroPlant && (
              <>
                <div className="landing-figure">
                  <PlantImage
                    slug={heroPlant.slug}
                    imagePath={heroPlant.frontmatter.hero.src}
                    alt={heroPlant.frontmatter.hero.alt}
                    placeholder="Botanical plate — featured specimen"
                  />
                  <div className="landing-figure-tag">Fig. I · Specimen</div>
                </div>
                <p className="landing-figcaption">
                  <strong>Featured</strong>
                  {heroPlant.frontmatter.latin} — {heroPlant.frontmatter.dek}
                </p>
              </>
            )}
          </div>
        </section>

        <div className="landing-strip">
          <Link href="/library/" className="landing-strip-label landing-strip-label-link">
            The full
            <br />
            library →
          </Link>
          {featured.map((plant) => {
            const v = verdictLabel(plant.frontmatter.verdict);
            return (
              <Link
                href={`/plants/${plant.slug}/`}
                className="landing-strip-item"
                key={plant.slug}
              >
                <div className={`landing-mark${v.warn ? " warn" : ""}`} />
                <div>
                  <h5>{plant.frontmatter.title}</h5>
                  <div className="lat">{plant.frontmatter.latin}</div>
                  <div className={`verdict${v.warn ? " warn" : ""}`}>{v.text}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
