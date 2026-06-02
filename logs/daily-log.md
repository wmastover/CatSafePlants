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


## 2026-06-02 — Engineering daily run

Drained the entire 15-ticket Notion Engineering queue in one session. 13 shipped, 2 flagged for Will's call.

**Carried-over unblocked (3 shipped):**
- `photos-bug` (commit 5e2b486) — root cause: 13 of 57 plant MDX files were missing the heroInterior frontmatter block even though hero-interior.png existed on disk. Backfilled all 13; added heroInterior to _TEMPLATE.mdx so new-plant scaffold includes it going forward. PlantHeroGallery now renders both slides.
- `zz-plant` (commit 1e1241f) — shipped as verdict insufficient-data per Will's instruction. Multiple non-ASPCA references (Pet Poison Helpline, Hepper, PlantCareToday). Conservative framing: treat as toxic until ASPCA lists it.
- `cat-ate-a-lily` emergency page (commit 0c59a14) — new route `/emergency/cat-ate-a-lily/`, new action-first template (separate from plant-schema), new src/styles/emergency.css. Big phone CTA, 6-step ordered checklist, 0-2h/2-12h/12-24h/24-72h symptom timeline, which-lily-was-it disambiguation. Cross-links from /plants/lily, /plants/easter-lily, /plants/calla-lily, /plants/peruvian-lily. PM-assigned review ticket created.

**Toxic warnings (7 shipped — high priority per Prime Directive):**
- `foxglove` (commit f058592) — deadly, cardiac glycosides (Digitalis purpurea, ASPCA verified)
- `autumn-crocus` (commit bbecf33) — deadly, colchicine (Colchicum autumnale, ASPCA verified). Page disambiguates from spring crocus.
- `yew` (commit 99618db) — deadly, taxine alkaloids (Taxus spp., ASPCA verified via Japanese Yew entry). Page covers no-warning cardiac arrest + the aril/seed trap.
- `mistletoe` (commit 71cb27d) — toxic, phoratoxin + viscumin (Phoradendron flavescens, ASPCA verified). December seasonal trap.
- `holly` (commit 69a26ce) — toxic, saponins + spine injury (Ilex opaca, ASPCA verified). Genus-wide.
- `geranium` (commit 540da50) — toxic, geraniol + linalool (Pelargonium spp., ASPCA verified). Disambiguates from true Geranium (cranesbill, not ASPCA listed).
- `lantana` (commit 58d1956) — toxic, triterpenoids + possible liver (Lantana camara, ASPCA verified). Outdoor-cat risk.

**Safe houseplants (2 shipped):**
- `money-tree` (commit 2c6365f) — safe, ASPCA verified (Pachira aquatica, Toxic Principles None). Disambiguates from jade plant / Pilea peperomioides.
- `peperomia` (commit 3c91683) — safe, ASPCA verified Peperomia obtusifolia (Baby Rubber Plant) + Peperomia argyreia (Watermelon Peperomia). Page covers the genus.

**List page (1 shipped):**
- `/toxic-plants-for-cats/` (commit 68db916) — mirror of `/cat-safe-plants/` for verdict=toxic. Reuses shared ListPage component, Article + FAQPage schema, FAQ covers the six deadly plants + aroid family + ASPCA-database-gap caveat. Sitemap updated.

**Hero art:** all 9 new plant pages have both hand-drawn (`hero.png`) and realistic interior (`hero-interior.png`) images generated via npm run generate-image + generate-interior-image. No retries needed. Heroes display correctly thanks to the morning's frontmatter backfill.

**Flagged for Will (left In Progress with detailed notes):**
- `pilea-peperomioides` — ASPCA does NOT list Pilea peperomioides. ASPCA lists Pilea cadierei (Aluminum Plant) as non-toxic. Per Prime Directive can't ship "safe" by inference from related species. Same call as ZZ plant: ship as insufficient-data, ship under Aluminum Plant URL with explicit caveat, or reassign to Research.
- `air-plant` (Tillandsia) — same situation as ZZ plant. The /tillandsia-air-plants ASPCA URL exists but renders the generic plant index, not a species panel. Multiple non-ASPCA sources say non-toxic. Same options.

**YAML lesson:** strings containing colons must be quoted in MDX frontmatter (mistletoe FAQ had to be patched). Going forward: when a question or answer contains ` : ` or starts with a non-trivial punctuation set, wrap in double quotes.

**Build status:** green throughout. 59 plant pages total in static export (up from 57). Build also covers the new /toxic-plants-for-cats route and /emergency/cat-ate-a-lily route.

**Vercel:** auto-deploying main on every push. Final commit at the end of the run: 68db916.

**Queue size after run:** 0 Not started, 2 In progress (pilea + air-plant — flagged for Will's call). The PM agent runs at 19:00 UTC and will scope the next batch.

## 2026-06-02 — follow-up ship of the 2 flagged tickets (operator override: lean SAFE)

Will directed the Engineering agent to ship the 2 in-progress flagged tickets, marking them safe given the ASPCA gap is genus/family level rather than contradictory. Both shipped with verdict=safe, transparent body notes about the species-level ASPCA gap, and conservative framing.

- `air-plant` (Tillandsia spp.) — safe. ASPCA does not list Tillandsia individually but lists multiple sibling Bromeliaceae genera (Neoregelia/blushing-bromeliad, Cryptanthus/earth-star) as non-toxic. No Bromeliaceae species appears on the ASPCA toxic list. Pet Poison Helpline treats Tillandsia as non-toxic. aspcaUrl points to the Blushing Bromeliad species page (closest documented family member). Hero + interior art generated.
- `pilea-peperomioides` (Chinese money plant) — safe. ASPCA does not list P. peperomioides individually but lists two sibling Pilea species — Aluminum Plant (P. cadieri) and Friendship Plant (P. involucrata) — as non-toxic. No Pilea species on the ASPCA toxic list. aspcaUrl points to the Aluminum Plant species page (closest documented genus-mate). Disambiguates from Peperomia, money tree, and jade plant. Hero + interior art generated.

Build: green. 61 plant pages total in static export.

## 2026-06-02 (Round 2, ~10:00 UTC) — Engineering daily run

Second cron run of the day. Drained the entire 12-ticket queue scoped by PM at 09:30 UTC. 12 shipped, 0 skipped this round.

**Carry-over fix shipped:**
- Lily emergency page restyle (commit 65f8731) — Will's review flagged the previous styling as broken: dark green BG from globals.css bleeding through with black text, unreadable. Root cause: page never wrapped content in .landing-root, so it inherited the dark site-wide body BG with no override. Fix: wrap in .emergency-root.landing-root + SiteNav (mirroring /cat-safe-plants/ pattern). Rewrote src/styles/emergency.css to use brand palette throughout — paper #fbf7ea cards on #f4efe2 base, Cormorant Garamond serif headings, DM Sans body, JetBrains Mono kickers, brick-red #b85a3a urgency accents. Verified live via screenshot post-deploy: readable, on-brand, urgency cues intact. Review ticket moved to Done.

**Toxic warnings shipped (7):**
- hyacinth (commit b151b07) — Hyacinthus orientalis, Narcissus-like alkaloids; PM URL was /hyacinth, correct URL is /garden-hyacinth
- amaryllis (commit 06b5fa5) — Amaryllis spp., lycorine; boxed-winter-bulb gift trap
- cyclamen (commit b0ed8a2) — DEADLY, terpenoid saponins; tuber dose differential emphasised
- tomato-plant (commit 9403b1f) — Lycopersicon spp., solanine; fruit-safe / plant-toxic distinction
- coleus (commit fc64c8e) — Plectranthus, essential oils; covers the Spanish Thyme genus-mate
- schefflera (commit 63b7a97) — calcium oxalate; covers all 4 common-name variants
- caladium (commit c4c63bb) — calcium oxalate; painted-leaf aroid family member

**Safe pages shipped (3):**
- sunflower (commit 834a556) — Helianthus, ASPCA non-toxic; warns about mixed bouquets containing lilies
- sage (commit 37443eb) — Salvia officinalis, ASPCA non-toxic; PM URL was /garden-sage, correct URL is /sage; completes safe-herb cluster
- mint (commit 9541b01) — TOXIC (Mentha, essential oils) per PM's explicit nuance instructions; covers the three-verdict genus split (most mints mildly toxic, pennyroyal deadly, catnip safe)

**Insufficient-data shipped (1):**
- marigold (commit 798f56d) — PM ticket said Tagetes was ASPCA non-toxic, but that's WRONG. ASPCA "Garden Marigold" entry is for Calendula officinalis (pot marigold). Tagetes (French/African — the bedding-plant most people grow) is NOT on ASPCA. Shipped as insufficient-data with full Calendula-vs-Tagetes disambiguation, following the ZZ-plant pattern.

**ASPCA URL corrections made by Eng during ASPCA verification step:**
- PM had /hyacinth → actual /garden-hyacinth
- PM had /garden-sage → actual /sage
- PM had /marigold → conflated two genera; actual /garden-marigold is Calendula not Tagetes

**Hero art:** all 11 new plant pages have hand-drawn + interior images. No retries needed.

**Build status:** green throughout. 70 plant pages + 1 toxic-plants list page + 2 safe-plants list pages + 1 library + 1 emergency route. Final commit at the end of the run: 37443eb.

**YAML reminder logged again:** strings containing colons must be quoted. Three pages needed fixes during the run (mistletoe yesterday + tomato-plant + caladium + marigold today).

**Vercel:** auto-deploying main on every push. Pace ~5s between commits respected.

**Queue size after run:** 0 Not started, 2 In Progress (pilea + air-plant, both shipped earlier today by a separate run with operator override — but tickets still In Progress from this morning's flag). The PM agent runs at 19:00 UTC and will scope the next batch.

**Note to PM:** the 3 incorrect ASPCA URLs in the morning's batch suggest a verification step before scoping. Suggest Research validates ASPCA URLs against actual species panels in the ticket-creation flow.
