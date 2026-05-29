"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { PlantFrontmatter } from "@/lib/plant-schema";

interface LandingPlant {
  slug: string;
  frontmatter: PlantFrontmatter;
  heroSrc: string | null;
}

interface LandingHeroSearchProps {
  heroPlant: LandingPlant | undefined;
  suggested: (LandingPlant | undefined)[];
  featured: LandingPlant[];
}

function verdictLabel(verdict: string): { text: string; warn: boolean } {
  if (verdict === "safe") return { text: "◦ Safe", warn: false };
  if (verdict === "toxic") return { text: "◦ Toxic", warn: true };
  return { text: "◦ Unknown", warn: true };
}

export function LandingHeroSearch({
  heroPlant,
  suggested,
  featured,
}: LandingHeroSearchProps) {
  const router = useRouter();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.length > 0) {
      router.push(`/library/?q=${encodeURIComponent(value)}`);
    }
  }

  return (
    <>
      <section className="landing-hero">
        <div className="landing-left">
          <h1 className="landing-headline">
            For the cat who<em>eats everything.</em>
          </h1>
          <p className="landing-dek">
            A careful guide to which houseplants she can nibble freely, and which
            ones belong somewhere else entirely.
          </p>

          <div className="landing-search">
            <div className="landing-search-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Type a plant name…"
              defaultValue=""
              onChange={handleSearchChange}
              aria-label="Search plants"
            />
          </div>

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

        {heroPlant && (
          <div className="landing-right">
            <div className="landing-figure">
              {heroPlant.heroSrc ? (
                <Image
                  src={heroPlant.heroSrc}
                  alt={heroPlant.frontmatter.hero.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              ) : (
                <div className="plant-image-placeholder" aria-hidden>
                  Botanical plate — featured specimen
                </div>
              )}
              <div className="landing-figure-tag">Fig. I · Specimen</div>
            </div>
            <p className="landing-figcaption">
              <strong>Featured</strong>
              {heroPlant.frontmatter.latin} — {heroPlant.frontmatter.dek}
            </p>
          </div>
        )}
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
    </>
  );
}
