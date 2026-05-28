import type { Metadata } from "next";
import { LibraryPage } from "@/components/LibraryPage";
import { getAllPlants } from "@/lib/plants";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Plant Library",
  description:
    "Browse every cat-safe and toxic houseplant in the library — ASPCA-sourced verdicts for each species.",
  alternates: { canonical: `${siteConfig.url}/library/` },
};

export default function LibraryRoute() {
  const plants = getAllPlants();
  return <LibraryPage plants={plants} />;
}
