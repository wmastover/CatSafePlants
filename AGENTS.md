# Agent Guide — Publishing Plant Pages

This repo is designed for an autonomous agent to publish new plant profile pages by adding a single MDX file.

## Quick publish workflow

1. Research the target keyword and confirm ASPCA has an entry for the plant
2. Run `npm run new-plant -- <slug> "Plant Name"` to scaffold from template
3. Fill in all frontmatter fields in `content/plants/<slug>.mdx`
4. Write the MDX body — **first paragraph must directly answer the title question**
5. Add hero image to `public/images/plants/<slug>/hero.webp` (optional; placeholder shown until added)
6. Run `npm run build` — zod validation fails the build on missing/invalid data
7. Commit and push to `main` (Vercel auto-deploys)
8. Log the page in `logs/published-pages.md`

## Hard rules (non-negotiable)

- Every toxicity claim must cite [ASPCA](https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants) via `aspcaUrl` and in the body
- If ASPCA data is ambiguous, use `verdict: insufficient-data` — never guess
- Never publish a "safe" claim based on inference from related species
- Every page needs `lastReviewed` date (YYYY-MM-DD)
- `metaTitle` ≤ 60 characters, `metaDescription` ≤ 155 characters
- Safe plants require `affiliate` block; toxic plants require `lookalikes` block
- Do not redesign the site or change brand identity without operator approval

## Content schema

Full schema: [`src/lib/plant-schema.ts`](src/lib/plant-schema.ts)
Template: [`content/plants/_TEMPLATE.mdx`](content/plants/_TEMPLATE.mdx)

### Required for every plant

| Field | Purpose |
|-------|---------|
| `title`, `slug`, `latin` | Identity |
| `verdict` | `safe`, `toxic`, or `insufficient-data` |
| `verdictText` | HTML ruling shown in verdict card |
| `dek` | Hero subtitle — direct answer |
| `aspcaUrl` | ASPCA citation (must be aspca.org) |
| `lastReviewed` | Visible review date |
| `facts[]` | At-a-glance strip |
| `observations[]` | Observed effects grid |
| `sources[]` | References (ASPCA first) |
| `faq[]` | FAQPage schema + GEO |
| `related[]` | 1–5 slugs of related plant pages |
| `metaTitle`, `metaDescription` | SEO |

### Safe plant extras

- `affiliate` (price + amazonQuery)
- `care[]` (4 items recommended)
- `cultivars[]` (optional)

### Toxic plant extras

- `lookalikes[]` (≥1 safe alternative with affiliate links)
- `lookalikesIntro` (optional)
- `sidebar[]` with warn cards for symptoms/emergency

## SEO checklist (per page)

- [ ] Meta title under 60 chars with target keyword
- [ ] Meta description under 155 chars with direct answer
- [ ] One H1 (auto-generated from title)
- [ ] Hero image alt text describes the image
- [ ] FAQ entries match common search queries
- [ ] Internal links to 3–5 related pages
- [ ] Schema: Article + FAQPage + BreadcrumbList (automatic)

## Hero images (Nano Banana via OpenRouter)

Botanical illustrations are generated with **Nano Banana** (`google/gemini-3.1-flash-image-preview`) through OpenRouter.

1. Style reference is always [`assets/style-reference/peace-lily-botanical.png`](assets/style-reference/peace-lily-botanical.png)
2. A real plant photo is fetched from Wikimedia Commons (or pass `--reference ./photo.jpg`)
3. Prompt template is in [`scripts/lib/image-gen-config.ts`](scripts/lib/image-gen-config.ts)

```bash
# Set OPENROUTER_API_KEY in .env.local (see .env.example)
npm run generate-image -- spider-plant "Spider Plant"
npm run generate-image -- --all   # all published plants
```

Output: `public/images/plants/<slug>/hero.png`

## Affiliate links

Amazon tag is set in `src/lib/site.config.ts` (default: `catsafe-21`).
Use `amazonQuery` in frontmatter — URLs are built automatically with `rel="sponsored noopener nofollow"`.

## Logs (required)

Maintain files in `/logs`:
- `daily-log.md` — daily activity
- `published-pages.md` — every page published
- `keyword-research.md` — keywords and priority
- `decisions.md` — significant decisions
- `issues.md` — problems encountered

## Prime directive

See [`PRIME-DIRECTIVE.md`](PRIME-DIRECTIVE.md) for the full mission, monetization strategy, and operating rules.
