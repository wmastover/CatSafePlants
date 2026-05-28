import { z } from "zod";

const verdictSchema = z.enum(["safe", "toxic", "insufficient-data"]);

const taxonomySchema = z.object({
  family: z.string().min(1),
  genus: z.string().min(1),
  species: z.string().min(1),
});

const factSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  sub: z.string().optional(),
  italic: z.boolean().optional(),
});

const observationSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  frequency: z.string().min(1),
  warn: z.boolean().optional(),
});

const cultivarSchema = z.object({
  name: z.string().min(1),
  tag: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  image: z.string().optional(),
});

const lookalikeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  latin: z.string().min(1),
  why: z.string().min(1),
  price: z.number().positive().optional(),
  amazonQuery: z.string().min(1),
  image: z.string().optional(),
});

const careSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  scale: z.number().int().min(1).max(5),
  icon: z.enum(["light", "water", "soil", "placement"]).optional(),
});

const sourceSchema = z.object({
  citation: z.string().min(1),
  note: z.string().optional(),
  url: z.string().url().optional(),
});

const sidebarCardSchema = z
  .object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    items: z
      .array(
        z.object({
          text: z.string().min(1),
          sub: z.string().optional(),
        }),
      )
      .optional(),
    warn: z.boolean().optional(),
    ordered: z.boolean().optional(),
    body: z.string().optional(),
    footer: z.string().optional(),
  })
  .refine((data) => data.items?.length || data.body, {
    message: "Sidebar card must have items or body",
  });

const affiliateSchema = z.object({
  price: z.number().positive(),
  amazonQuery: z.string().min(1),
  altLinks: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url(),
      }),
    )
    .optional(),
});

const heroImageSchema = z.object({
  src: z.string().optional(),
  alt: z.string().min(1),
  tag: z.string().optional(),
  caption: z.string().optional(),
  scale: z.string().optional(),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const sectionSchema = z.object({
  lab: z.string().min(1),
  title: z.string().min(1),
  titleEm: z.string().optional(),
});

export const plantFrontmatterSchema = z
  .object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    latin: z.string().min(1),
    verdict: verdictSchema,
    verdictMark: z.string().min(1),
    verdictLabel: z.string().default("The verdict"),
    verdictText: z.string().min(1),
    dek: z.string().min(1),
    taxonomy: taxonomySchema,
    lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    aspcaUrl: z.string().url(),
    plateNumber: z.string().optional(),
    colophonEnd: z.string().optional(),

    metaTitle: z.string().max(60),
    metaDescription: z.string().max(155),
    ogImage: z.string().optional(),
    targetKeyword: z.string().optional(),

    hero: heroImageSchema,
    facts: z.array(factSchema).min(1),
    observations: z.array(observationSchema).min(1),
    cultivars: z.array(cultivarSchema).optional(),
    lookalikes: z.array(lookalikeSchema).optional(),
    lookalikesIntro: z.string().optional(),
    care: z.array(careSchema).optional(),
    sources: z.array(sourceSchema).min(1),
    related: z.array(z.string()).min(1).max(5),
    faq: z.array(faqSchema).min(1),

    affiliate: affiliateSchema.optional(),
    sidebar: z.array(sidebarCardSchema).optional(),

    bodyTitle: z.string().min(1),
    bodyTitleEm: z.string().optional(),
    pullQuote: z.string().optional(),

    relatedSection: sectionSchema.optional(),
    alsoAvoidSection: sectionSchema.optional(),
    cultivarsSection: sectionSchema.optional(),
    careSection: sectionSchema.optional(),
    observationsSection: sectionSchema.optional(),
    sourcesSection: sectionSchema.optional(),
    lookalikesSection: sectionSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.verdict !== "insufficient-data" && !data.aspcaUrl.includes("aspca.org")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "aspcaUrl must point to aspca.org for toxicity claims",
        path: ["aspcaUrl"],
      });
    }

    if (data.verdict === "safe" && !data.affiliate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Safe plants must include affiliate purchase info",
        path: ["affiliate"],
      });
    }

    if (data.verdict === "toxic" && !data.lookalikes?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Toxic plants must include at least one safe lookalike",
        path: ["lookalikes"],
      });
    }

    if (data.verdict === "safe" && !data.care?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Safe plants must include care guide",
        path: ["care"],
      });
    }
  });

export type PlantFrontmatter = z.infer<typeof plantFrontmatterSchema>;
export type PlantVerdict = z.infer<typeof verdictSchema>;

export interface PlantDocument {
  slug: string;
  frontmatter: PlantFrontmatter;
  content: string;
}
