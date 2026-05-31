import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fontVariables } from "@/lib/fonts";
import { siteLogoSrc } from "@/components/SiteLogo";
import { siteConfig } from "@/lib/site.config";
import "@/styles/globals.css";
import "@/styles/plant-page.css";
import "@/styles/landing.css";
import "@/styles/library.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteLogoSrc,
    apple: siteLogoSrc,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontVariables}>{children}</body>
      {siteConfig.gaId ? <GoogleAnalytics gaId={siteConfig.gaId} /> : null}
    </html>
  );
}
