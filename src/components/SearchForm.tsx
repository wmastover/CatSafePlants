"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { PlantDocument } from "@/lib/plant-schema";

interface SearchFormProps {
  plants: PlantDocument[];
}

export function SearchForm({ plants }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    const match =
      plants.find((p) => p.slug.includes(q)) ??
      plants.find((p) => p.frontmatter.title.toLowerCase().includes(q)) ??
      plants.find((p) => p.frontmatter.latin.toLowerCase().includes(q));

    if (match) {
      router.push(`/plants/${match.slug}/`);
    }
  }

  return (
    <form className="landing-search" onSubmit={handleSubmit}>
      <div className="landing-search-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <input
        type="search"
        placeholder="Type a plant name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search plants"
      />
      <button type="submit">Look up</button>
    </form>
  );
}
