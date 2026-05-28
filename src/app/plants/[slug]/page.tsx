import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlantPage } from "@/components/PlantPage";
import { getPlantBySlug, getPlantSlugs } from "@/lib/plants";
import { siteConfig } from "@/lib/site.config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPlantSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) return {};

  const fm = plant.frontmatter;
  const url = `${siteConfig.url}/plants/${slug}/`;
  const ogImage = fm.ogImage ?? `/images/plants/${slug}/hero.webp`;

  return {
    title: fm.metaTitle,
    description: fm.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: fm.metaTitle,
      description: fm.metaDescription,
      url,
      type: "article",
      modifiedTime: fm.lastReviewed,
      images: [{ url: ogImage, alt: fm.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.metaTitle,
      description: fm.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function PlantRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) notFound();

  const pageUrl = `${siteConfig.url}/plants/${slug}/`;

  return <PlantPage plant={plant} pageUrl={pageUrl} />;
}
