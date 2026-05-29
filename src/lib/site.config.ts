export const siteConfig = {
  name: "CatSafePlants",
  title: "Cat Safe Plants",
  description:
    "A careful guide to which houseplants are safe for cats — illustrated, sourced, and kept honest.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://catsafeplant.com",
  locale: "en-GB",
  affiliate: {
    amazonTag: process.env.NEXT_PUBLIC_AMAZON_TAG ?? "catsafe-21",
    currency: "GBP",
    currencySymbol: "£",
    discloseText: "Affiliate link — your purchase supports the library.",
  },
  emergency: {
    aspcaPhone: "+1 (888) 426-4435",
    aspcaPhoneHref: "tel:+18884264435",
    aspcaFeeNote: "24 hours · $95 consult fee · case number returned for your vet.",
  },
} as const;

export function amazonSearchUrl(query: string, tag?: string): string {
  const affiliateTag = tag ?? siteConfig.affiliate.amazonTag;
  const encoded = encodeURIComponent(query);
  return `https://www.amazon.co.uk/s?k=${encoded}&tag=${affiliateTag}`;
}

export function formatPrice(amount: number): string {
  return `${siteConfig.affiliate.currencySymbol}${amount}`;
}
