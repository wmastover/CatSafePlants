import type { PlantFrontmatter } from "@/lib/plant-schema";

export function filterPlantsByQuery<
  T extends { slug: string; frontmatter: PlantFrontmatter },
>(plants: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return plants;

  return plants.filter((plant) => {
    const fm = plant.frontmatter;
    return (
      plant.slug.includes(q) ||
      fm.title.toLowerCase().includes(q) ||
      fm.latin.toLowerCase().includes(q) ||
      (fm.targetKeyword?.toLowerCase().includes(q) ?? false)
    );
  });
}
