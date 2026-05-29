"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useLazyBatch } from "@/hooks/useLazyBatch";
import type { PlantFrontmatter } from "@/lib/plant-schema";

export interface LibraryPlantCard {
  slug: string;
  frontmatter: PlantFrontmatter;
  heroSrc: string | null;
}

interface LibraryGridProps {
  plants: LibraryPlantCard[];
}

type Filter = "all" | "safe" | "toxic";

function verdictMeta(verdict: string): { label: string; warn: boolean } {
  if (verdict === "safe") return { label: "Safe", warn: false };
  if (verdict === "toxic") return { label: "Toxic", warn: true };
  return { label: "Unknown", warn: true };
}

export function LibraryGrid({ plants }: LibraryGridProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return plants.filter((plant) => {
      if (filter !== "all" && plant.frontmatter.verdict !== filter) return false;
      if (!q) return true;
      const fm = plant.frontmatter;
      return (
        plant.slug.includes(q) ||
        fm.title.toLowerCase().includes(q) ||
        fm.latin.toLowerCase().includes(q) ||
        (fm.targetKeyword?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [plants, query, filter]);

  const { visibleCount, sentinelRef, hasMore } = useLazyBatch({
    total: filtered.length,
    resetKey: `${query}|${filter}`,
  });

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const counts = useMemo(() => {
    const safe = plants.filter((p) => p.frontmatter.verdict === "safe").length;
    const toxic = plants.filter((p) => p.frontmatter.verdict === "toxic").length;
    return { all: plants.length, safe, toxic };
  }, [plants]);

  return (
    <>
      <div className="library-toolbar">
        <div className="library-search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search the library…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search plants in library"
          />
        </div>

        <div className="library-filters" role="tablist" aria-label="Filter by verdict">
          {(
            [
              ["all", `All (${counts.all})`],
              ["safe", `Safe (${counts.safe})`],
              ["toxic", `Toxic (${counts.toxic})`],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              className={filter === value ? "active" : undefined}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="library-empty">No plants match your search. Try another name.</p>
      ) : (
        <>
          <ul className="library-grid">
            {visible.map((plant) => {
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
                          loading="lazy"
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
          {hasMore ? (
            <div ref={sentinelRef} className="library-load-sentinel" aria-hidden />
          ) : null}
        </>
      )}
    </>
  );
}
