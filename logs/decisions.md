# Decisions

<!-- Agent: significant decisions made and reasoning -->

## 2026-05-28 — Foundation MVP scope

**Decision:** Ship landing page + plant profile template (safe/toxic) + 3 seed pages. Defer list pages and search tool.

**Reasoning:** Per prime directive progression — individual plant pages are the atomic unit. Search tool needs ~50 plants to be useful.

## 2026-05-28 — MDX + zod content model

**Decision:** One MDX file per plant with typed frontmatter validated by zod at build time.

**Reasoning:** Balances editorial prose flexibility with schema enforcement. Build fails on missing ASPCA citation or invalid SEO fields.

## 2026-05-28 — Static export

**Decision:** Next.js static export (`output: "export"`) hosted on Vercel.

**Reasoning:** Per prime directive. Maximum performance, minimal hosting cost, ideal for SEO content site.

## 2026-05-30 — Batch build from plant_build_order.csv (24 pages)

**Decision:** Published the 24 remaining single-plant pages from the build-order CSV. Skipped the three MIXED/"overview-split" rows (Succulent, Palm, Fern generic) and built a new general `lily` umbrella page.

**Reasoning:** Overview pages need a non–verdict-based template; deferred pending a page-type proposal (operator approval per AGENTS.md). The general `lily` page targets "are lilies poisonous to cats" and links down to the existing `easter-lily` page to avoid keyword cannibalisation.

**ASPCA verification correction:** The CSV drafted **Peruvian Lily (Alstroemeria) as TOXIC**, but the ASPCA lists it as **non-toxic to cats** (Liliaceae, not a true lily). Built as a `safe` page with strong identification warnings. **Rubber Plant (Ficus elastica)** and **Ficus** are not individually on ASPCA; both cite the ASPCA "Fig" entry (Ficus benjamina, incl. "Indian Rubber Plant"), which covers the genus's irritant latex.

**Note:** Hero images omitted (placeholder shown). Generate later via `npm run generate-image -- <slug> "Name"`.
