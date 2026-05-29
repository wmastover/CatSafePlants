import { siteConfig } from "@/lib/site.config";
import type { PlantDocument } from "@/lib/plant-schema";

interface PlantJsonLdProps {
  plant: PlantDocument;
  url: string;
}

export function PlantJsonLd({ plant, url }: PlantJsonLdProps) {
  const { frontmatter: fm } = plant;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.metaTitle,
    description: fm.metaDescription,
    dateModified: fm.lastReviewed,
    datePublished: fm.lastReviewed,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: url,
    about: {
      "@type": "Thing",
      name: fm.latin,
      description: fm.dek,
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fm.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Library",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: fm.title,
        item: url,
      },
    ],
  };

  const graph = [article, faq, breadcrumb];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export function HomeJsonLd() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/library/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
    />
  );
}
