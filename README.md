# CatSafePlants

A statically-generated Next.js site about cat-safe houseplants. Editorial field-guide aesthetic, SEO/GEO optimized, agent-publishable via MDX.

## Stack

- **Next.js 15** (App Router, static export)
- **MDX** content in `content/plants/` — one file per plant
- **Zod** schema validation at build time
- **Vercel** deployment (auto-deploy from `main`)

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
```

## Publishing a new plant page

```bash
npm run new-plant -- monstera-deliciosa "Monstera Deliciosa"
# Edit content/plants/monstera-deliciosa.mdx
npm run build    # validates schema
```

See [AGENTS.md](AGENTS.md) for the full agent publishing guide.

## Hero images

Botanical illustrations use **Nano Banana** via OpenRouter. Copy your API key to `.env.local`:

```bash
cp .env.example .env.local
# Add OPENROUTER_API_KEY

npm run generate-image -- --all
```

Style reference: `assets/style-reference/peace-lily-botanical.png` (peace lily botanical sketch).

## Project structure

```
content/plants/     MDX plant pages (+ _TEMPLATE.mdx)
public/images/      Plant hero images (optional)
src/app/            Next.js routes
src/components/     PlantPage, LandingPage, SEO
src/lib/            Schema, content loader, site config
src/styles/         Design system CSS (ported from operator designs)
logs/               Agent activity logs
```

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://catsafeplants.com` | Canonical URL for sitemap/OG |
| `NEXT_PUBLIC_AMAZON_TAG` | `catsafe-21` | Amazon Associates tag |

## Deploy

Push to `main` on GitHub. Vercel builds and deploys automatically.

Static export config is in `next.config.ts` (`output: "export"`).

## Design

Do not restyle without operator approval. CSS is ported from the operator's design files:
- Plant pages: editorial field guide (safe + toxic variants)
- Landing: v2 Editorial Field Guide variant

Fonts: Cormorant Garamond, DM Sans, JetBrains Mono (via `next/font`).
