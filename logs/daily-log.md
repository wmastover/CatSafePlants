# Daily Log

<!-- Agent: record what you did each day, what worked, what didn't -->

## 2026-05-28

- Initial site scaffold deployed: Next.js MVP with 3 seed plant pages (Spider Plant, Peace Lily, Boston Fern)
- Design system ported from operator HTML/CSS mockups
- MDX + zod content pipeline established
- Published 10 new plant pages from keyword CSV (7 toxic, 3 safe): Easter Lily, Poinsettia, Pothos, Philodendron, Aloe Vera, Monstera, Dracaena, Calathea, Orchid, Christmas Cactus
- `npm run build` passed — 13 plant pages total in static export
- Generated hero images for all 13 plants (`npm run generate-image -- --all`)
- Added `/library/` page — searchable grid of all plants with safe/toxic filters
- Published 7 new safe plant pages for lookalike swaps: Prayer Plant, Cast-Iron Plant, Haworthia, Parlor Palm, Wax Plant (Hoya), Swedish Ivy, African Violet
- Updated lookalikes on all 8 toxic plant pages with best-matched safe alternatives (all slug-linked)
- `npm run build` passed — 20 plant pages total
- Generated hero images for 7 new safe plant pages (prayer-plant, cast-iron-plant, haworthia, parlor-palm, wax-plant, swedish-ivy, african-violet)
- Generated 46 cultivar images for all safe plant varieties (`npm run generate-cultivar-images -- --all`)

## 2026-05-31

- Engineering run: shipped 5 high-impact TOXIC plant pages from PM-scoped Notion queue
  - sago-palm (deadly, cycasin → liver failure, ASPCA verified)
  - oleander (deadly, cardiac glycosides, ASPCA verified)
  - snake-plant (mild GI, saponins, ASPCA verified — highest-volume search term in this batch)
  - chrysanthemum (moderate, pyrethrins + sesquiterpene lactones, ASPCA verified)
  - string-of-pearls (moderate GI + skin, Senecio alkaloids, ASPCA verified via /news/are-succulents-safe article)
- `npm run build` passed — 49 plant pages total in static export (up from 44)
- ASPCA verification completed for every page before write; all 5 link to canonical ASPCA URLs
- Hero images deferred to a separate batch ticket
- SKIPPED with reason in summary: ZZ plant (ASPCA listing ambiguous — page exists at /zamioculcas-zamiifolia but renders generic list; hepper.com explicitly states it is not on ASPCA's list; needs operator call), Bird of Paradise (two ASPCA species — Strelitzia reginae is mild, Caesalpinia/Poinciana is severe — needs PM clarification on which we cover), My Cat Ate a Lily emergency page (requires new route + page template + content type — out of scope for plant-page workflow, needs PM scoping)

## 2026-05-31 18:34 UTC — Hero art backfill (5 pages)

**Issue:** Engineering shipped chrysanthemum, oleander, sago-palm, snake-plant, and string-of-pearls to prod without hero art. PM scope incorrectly said "24 pages" needed art; actual was 5.

**Fix:** Generated all 5 via `npm run generate-image` (Nano Banana via OpenRouter). Committed in 9ee437f. Vercel deploying.

**Process change:** Engineering SOUL updated with hard rule — no plant page ships to prod without hero art. Image gen step is now mandatory before commit.

## 2026-06-01 — Engineering daily run

Drained the entire Notion Engineering queue (14 tickets). 12 shipped, 2 flagged for Will's call.

**Plant pages shipped (8):**
- daffodil (4fa9f22) — toxic, ASPCA verified (Narcissus spp., lycorine alkaloids)
- hydrangea (39fb840) — toxic, ASPCA verified (Hydrangea arborescens, cyanogenic glycoside)
- azalea (f500908) — severely toxic, ASPCA verified (Rhododendron spp., grayanotoxin, cardiac risk)
- fiddle-leaf-fig (4ac4bf3) — toxic, ASPCA genus-level entry (Ficus, ficin + psoralen); NCSU Extension confirms F. lyrata specifically
- caesalpinia-gilliesii / Mexican Bird of Paradise (98c6a2a) — toxic, ASPCA verified (GI irritants)
- strelitzia-reginae / Bird of Paradise houseplant (0fee7c8) — mildly toxic, ASPCA verified (GI irritants, fruit/seeds worst)
- rosemary (ce8a481) — safe, ASPCA verified (Rosmarinus officinalis non-toxic)
- thyme (0357a8e) — safe, ASPCA verified English thyme (Thymus vulgaris); flags Spanish thyme (Coleus amboinicus) as ASPCA toxic

**List pages shipped (2):**
- /cat-safe-plants/ (23f92fa) — 27,100/mo keyword
- /houseplants-safe-for-cats/ (12409a7) — 22,200/mo keyword
- New shared ListPage component; both have Article schema, FAQ schema, intro + curated grid

**Infra shipped (2):**
- Internal link audit (ea05a58) — bumped peace-lily relateds (2→4); added in-body links to peace-lily, boston-fern, spider-plant; logged audit results to logs/issues.md
- SEO infrastructure (cc0b66d) — robots.ts expanded with full AI-bot allowlist + host directive; new scripts/submit-to-gsc.ts (sitemap ping + Indexing API URL submission gated on GSC_SERVICE_ACCOUNT_JSON)

**Hero art:** all 8 plant pages generated via npm run generate-image (azalea required one retry; all others first attempt).

**Flagged for Will (left In Progress with detailed notes):**
- ZZ plant ticket — Zamioculcas zamiifolia is NOT on the ASPCA database. Cannot publish a toxicity claim without ASPCA backing. Note in ticket suggests two options: (a) ship as verdict: insufficient-data with non-ASPCA evidence, (b) skip.
- "My cat ate a lily" emergency page — needs a new route type + content schema (not a plant profile). PM previously flagged the same on 2026-05-31. Offered alternative: add emergency-CTA section inside /plants/lily.

**Queue size after run:** 0 Not started, 2 In progress (both flagged for review). The PM agent runs at 19:00 UTC and will scope the next batch.

