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

## 2026-05-31 — PM Planning Round 4 (Sunday weekly)

**Context:** 49 plant pages live (up from 44 — shipped 5 ASPCA-verified toxic pages this week: sago-palm, oleander, snake-plant, chrysanthemum, string-of-pearls). Hero art debt cleared. Engineering process update locked in (no plant page ships without hero art). Board: 5 Done from last week's tickets, 9 unstarted carrying over.

**Decision 1: Hold both blocked plant pages until operator resolves ASPCA ambiguity.**

`ZZ plant` and `bird of paradise` tickets remain open but cannot ship safely under our toxicity rule. Daily log flags:
- ZZ plant: ASPCA URL renders generic list; hepper.com states it is NOT on ASPCA's list. Prime Directive forbids inference. Needs operator call to either (a) confirm with ASPCA directly, (b) approve `verdict: insufficient-data` ruling, or (c) drop.
- Bird of paradise: Two ASPCA species (Strelitzia reginae mild vs Caesalpinia/Poinciana severe). Needs operator scope: which species do we cover, or do we ship both as a disambiguation?

**UPDATE (later same day, via Telegram):** Operator resolved both.
- ZZ plant: CONFIRMED TOXIC. Contains insoluble calcium oxalate crystals (Zamioculcas zamiifolia). Ship as TOXIC page. Operator note appended to Notion ticket.
- Bird of paradise: SPLIT. Original ticket archived; replaced with two separate tickets (Strelitzia reginae + Caesalpinia gilliesii), each carrying a disambiguation callout and cross-link instructions.

**Decision 2: Hold the lily emergency page until list pages ship.**

The "My Cat Ate a Lily — what now?" emergency page is genuinely high-conversion BUT requires a new page type/template. List pages (already ticketed, no new template needed beyond layout) will produce more traffic faster and prove the SEO foundation. Emergency page stays in backlog this week; revisit once both list pages are live.

**Decision 3: Ship SEO infrastructure NOW, before volume gets indexed.**

The site has 49 pages, a sitemap, but no robots.txt and no GSC submission flow. Per Prime Directive: must allow GPTBot/ClaudeBot/PerplexityBot for GEO; must submit URLs to GSC API on publish. New Engineering ticket created. This is foundational and was missed — flagging in issues log as a process gap.

**Decision 4: Add 6 ASPCA-unambiguous high-volume plant pages to backlog.**

Gap analysis vs the published 49: missing several Tier-1/Tier-2 volume plants that are unambiguous on ASPCA, so they can ship without the operator-blockers above. Picked for traffic + monetization fit:
- Hydrangea (toxic, very high seasonal volume)
- Daffodil (toxic, very high spring volume)
- Azalea (toxic, severe — moral priority)
- Rosemary (safe, herb, recipe adjacency)
- Thyme (safe, herb)
- Fiddle leaf fig (toxic, trendy houseplant — huge search volume)

All 6 should be writable straight from ASPCA without operator escalation.

**Decision 5: Defer search tool ticket (Tier-3 PM scoping) one more week.**

List pages first. Search tool only earns its keep once list pages exist to deep-link from.

**Decision 6: Internal-linking audit stays priority but de-emphasized vs net-new content this week.**

It's a maintenance task; carry it forward but Engineering should weight toward shipping the 6 new pages + the 2 list pages first if forced to choose.

**Tickets created this round:** 8 total (Engineering: 7, Research: 1). 9 prior tickets carried over. Two carried-over tickets (ZZ plant, bird of paradise) are flagged for operator decision.

