import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return <LandingPage />;
}
