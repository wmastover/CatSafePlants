import type { MetadataRoute } from "next";
import { getAllPlants } from "@/lib/plants";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const plants = getAllPlants();

  const plantEntries: MetadataRoute.Sitemap = plants.map((plant) => ({
    url: `${siteConfig.url}/plants/${plant.slug}/`,
    lastModified: plant.frontmatter.lastReviewed,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...plantEntries,
  ];
}
