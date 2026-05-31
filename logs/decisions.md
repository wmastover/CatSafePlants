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

## 2026-05-31 — PM Planning Round 3 (post-board-clear)

**Context:** Board cleared (5 prior tickets archived). 44 plant pages live. Keyword CSV reveals untapped high-volume list page opportunities (27,100/mo). Hero images missing for entire May 30 batch.

**Decision 1: Prioritise list pages NOW.**

We have 44 individual plant pages — more than sufficient to populate high-quality list content. The keyword CSV shows "cat safe plants" and "indoor plants safe for cats" at 27,100 and 22,200/mo respectively, with MEDIUM/HIGH competition. These are the highest-ROI pages we haven't built yet. Created 2 list page tickets (Engineering). *Note: list page design/template may require operator approval if it differs materially from the plant profile template — flagged in summary.*

**Decision 2: Push to 50 individual plant pages (search tool threshold).**

Added 6 individual plant page tickets: snake plant (safe, extremely popular), sago palm (TOXIC — among deadliest for cats, moral priority), ZZ plant (toxic, trendy), string of pearls (toxic, popular succulent), oleander (TOXIC — extremely toxic, high urgency), bird of paradise (mildly toxic per ASPCA). This brings the pipeline to 50 plants if all ship.

**Decision 3: Clear the May 30 hero image debt.**

24 pages are live with placeholder images. This hurts brand quality — a core moat per the Prime Directive. Created a dedicated Engineering ticket to batch-generate hero images (`npm run generate-image -- --all`).

**Decision 4: Emergency/problem pages unlocked.**

With enough toxic plant pages live, "My cat ate a lily — what now?" is the first priority problem page. High urgency, high conversion. Ticketed for Engineering.

**Decision 5: Keyword research log backfill + Research ticket.**

The keyword-research.md only covers the first 20 pages. The May 30 batch of 24 is completely untracked. Created a Research ticket to backfill and identify the next 10 keyword targets.

**Tickets created this round:** 14 total (Engineering: 11, Research: 1, Project Manager: 1, Operations: 0)
