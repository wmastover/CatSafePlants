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

## 2026-06-03 — Engineering daily run

Drained the queue: 13 tickets, 13 shipped.

**Plant pages (11) — all ASPCA-verified URLs (200) pre-flight:**
- zinnia (commit 9d99deb) — safe, ASPCA non-toxic, Compositae cluster
- petunia (commit ecd435b) — safe, ASPCA non-toxic, with Solanaceae-not-destiny + Calibrachoa caveat
- dahlia (commit 6d12488) — safe, ASPCA non-toxic, late-summer cut-flower
- morning-glory (commit 0f17d20) — toxic, indole alkaloids (LSD family) in seeds, ASPCA verified
- boxwood (commit cf58484) — toxic, buxine alkaloids, suburban hedge / outdoor cat angle
- carnation (commit feff1c6) — toxic mild, covers Sweet William, ASPCA verified
- wisteria (commit 1c9e2d0) — toxic, lectin + wisterin, seed-pod-is-worst-case warning
- peony (commit 048e761) — toxic, paeonol, counterintuitive cut-flower verdict
- iris (commit 5cf3532) — toxic, terpenoids in rhizome, NOT-a-true-lily disambiguation
- hosta (commit 8f56bd7) — toxic, saponins, NOT-a-true-lily disambiguation (Plantain Lily)
- lily-of-the-valley (commit 3a787df) — DEADLY, cardiac glycosides, NOT-a-true-lily but equally urgent

**UI fix (1):**
- list-page typography parity + homepage IA links (commit 820c385) — fixes Will's Eng: Fix styling complaint at the source. Root cause was `.list-intro` paragraphs inheriting body DM Sans sans-serif (no font-family override) instead of plant-page Cormorant Garamond. Added `.list-intro / .list-footer-cta / .list-faq` CSS to library.css with the plant-page font stack and left alignment. Removed conflicting inline styles on list-faq sections. Homepage now has 4 nav links (Safe / Toxic / Library / Emergency with brick-red ⚠) AND a new `.landing-ia` card-grid section between hero and footer with Safe / Safe houseplants / Toxic / Emergency cards.

**YAML reminders logged again:** strings with colons OR apostrophes need explicit double-quote wrapping. Three colons (dahlia FAQ, wisteria FAQ, peony FAQ) and one apostrophe (Zinnia 'Benary's Giant' cultivar name) caught by the build. Plus six metaDescriptions ran over the 155-char Zod limit on first draft and were tightened.

**Will-superseded ticket:** the original "Eng: Fix styling" raw ticket (PID 373e0560-4db9-8079-bcb1-dda99fe4edc4, Created By Will) was closed Done with a body note linking to the PM-formalised ticket that shipped the fix.

**Build status:** green throughout (~91 plant pages now in the index, including the 11 new ones).

**Hero art:** all 22 image generations (11 hero + 11 interior) succeeded on first try. No retries needed.

**Queue size after run:** 0 Not started, 0 In Progress for Engineering. Full drain.

**Vercel:** auto-deploying main on every push. ~5s pacing between commits respected.

**Note to PM:** the carnation page is technically toxic (mild) — included a calibrated-risk framing in the body to avoid scaring owners off bouquets entirely, while still respecting the ASPCA verdict. Worth a PM review pass to confirm the tone is right; revert verdict text if too soft.

## 2026-06-04 — Engineering daily run

**Pages shipped (12):**
- polka-dot-plant (commit 0f156ce) — safe, ASPCA non-toxic, small-pot houseplant cluster; Baby's Tears name-collision disambiguation
- snapdragon (commit c0081bd) — safe, ASPCA non-toxic, cottage-garden cut-flower cluster; ASPCA URL slug `/common-snapdragon` noted
- gladiolus (commit bca5222) — toxic, corm-concentrated unknown irritant, Iridaceae (same family as iris); ASPCA URL slug `/gladiola` noted
- gerbera-daisy (commit 36a2ca4) — safe, ASPCA non-toxic, daisy-family-is-mixed framing with chrysanthemum contrast; ASPCA URL slug `/gerber-daisy` noted
- babys-breath (commit f57b1e1) — safe (ASPCA correction page), ASPCA literally lists "Toxic Principles: Non-toxic" — explicitly addresses third-party "mildly toxic" blog claims
- norfolk-island-pine (commit bf664ed) — safe, ASPCA non-toxic via `/australian-pine` entry; critical NOT-a-sago-palm disambiguation
- arrowhead-vine (commit c6fddb0) — toxic, insoluble calcium oxalates, Araceae aroid; mirrors pothos/philodendron/monstera framing
- hibiscus (commit 35b7241) — safe, ASPCA non-toxic on both `/hibiscus` and `/rose-sharon` entries; covers Rose of Sharon + tropical hibiscus by extension; oleander/mandevilla misidentification warning
- dill (commit dfbcc62) — safe, ASPCA non-toxic, Apiaceae family but without parsley's furanocoumarins; concentrated-essential-oil caveat
- chives (commit 778700e) — TOXIC, Allium / N-propyl disulfide, Heinz body anemia framing (NOT just mild GI); cooked/dried/powdered all dangerous
- oregano (commit fb47245) — toxic, carvacrol+thymol phenolic essential oils, UGT1A6 glucuronidation deficiency in cats; live plant vs concentrated oil distinction
- parsley (commit c4c886a) — toxic (calibrated), furanocoumarins / photosensitization; ASPCA's "large amounts are needed" clause explicitly quoted for dose-context

**Build status:** green throughout (114 static pages now, up from 104 — +10 = 12 plant pages + a few index re-renders).

**Hero art:** all 12 hero + 12 interior images generated and committed. 3 initial failures (hibiscus, chives, oregano) on the first parallel batch were due to local Node.js worker fork EAGAIN exhaustion (running all 12 npm jobs concurrently overwhelmed local PIDs), not OpenRouter rate limiting. Serial retry succeeded immediately. Lesson for future runs: 4-at-a-time batching is safer than full 12-way parallel for `npm run` jobs.

**ASPCA URL slug-shifts (pre-baked by PM in Verification blocks, all verified 200):** `/common-snapdragon`, `/gladiola`, `/gerber-daisy`, `/arrow-head-vine`, `/australian-pine`, `/rose-sharon` (sibling of `/hibiscus`).

**YAML reminders:** apostrophe in "Baby's Breath" title required double-quote wrapping; one colon in gerbera FAQ answer caught and rewritten. No other YAML caught by the build this run.

**Will-flagged items / things needing PM or Will review:**
- Parsley page leans on the "calibrated risk" framing (like mint/carnation) — explicitly tells owners that garnish doses are low practical risk per ASPCA's own "large amounts are needed" clause. Worth a PM tone check; revert to harder-line toxic framing if too soft.
- Chives page intentionally takes a sharper warning tone than the typical "toxic herb" page (Heinz body anemia is more serious than mild GI). Wanted to make sure the systemic-anemia mechanism reads clearly without being alarmist. PM review welcome.

**Queue size after run:** 0 Not started, 0 In progress for Engineering. Full drain.

**Vercel:** auto-deploying main on every push. ~5s pacing between commits respected.

## 2026-06-05 — Engineering daily run

Drained 13-ticket queue (12 plant pages + 1 multi-part UI/SOUL ticket). Full clean exit. All commits ~5s paced; no OpenRouter or Notion rate-limit hits this run.

**Plant pages shipped (slug → commit → verdict):**
- buttercup (commit 4663071) — toxic, protoanemonin / Ranunculaceae; lawn-and-meadow framing
- alocasia (commit c9ec1b0) — toxic, insoluble calcium oxalates / Araceae; covers full Polly/Frydek/Black Velvet/Zebrina cultivar map
- periwinkle (commit bd4ea4b) — TOXIC, vinca alkaloids / Apocynaceae; serious-tier framing referencing vincristine pharmacology
- clematis (commit 0e79eb6) — toxic, protoanemonin (Ranunculaceae sibling of buttercup)
- lenten-rose (commit 2c2306e) — TOXIC, bufadienolides + glycosides + veratrin + protoanemonin / Ranunculaceae; covers hellebore + Christmas rose + Easter rose aliases; cardiac-glycoside tier
- chamomile (commit b59808c) — toxic, volatile oils / Compositae; correction page tackling 'chamomile tea is gentle' myth, dedicated bleeding-tendency FAQ
- fennel (commit 9b3abc3) — safe, ASPCA non-toxic / Apiaceae; closes the Apiaceae herb cluster
- rhododendron (commit 209bdf5) — TOXIC, grayanotoxin / Ericaceae; disambiguates azalea sibling, ASPCA 'few leaves' threshold quoted
- cilantro (commit 2216a68) — safe, ASPCA non-toxic / Apiaceae; cilantro/coriander naming reconciled, OR6A2 polymorphism aside
- shamrock-plant (commit 79e5e34) — toxic, SOLUBLE calcium oxalates / Oxalidaceae; soluble-vs-insoluble oxalate mechanism distinction (different from pothos-class Araceae)
- heavenly-bamboo (commit 9ed84d5) — TOXIC, cyanogenic glycosides / Berberidaceae; critical NOT-a-bamboo disambiguation page, berries the worst part
- lemon-grass (commit 723657a) — TOXIC, essential oils + cyanogenic glycosides / Poaceae; critical cat-grass disambiguation (NOT the safe wheat/oat/barley grass), live-plant vs essential-oil tier distinction

**UI / SOUL ticket shipped:**
- 375e0560-eng-ui (commit d130c1d) — homepage nav cleanup (Library-only) + list-page footer z-index fix + UI sanity-check SOUL step. Will-flagged production bugs.

**Build status:** green throughout. Started run at 114 static pages, ended at 124 (+10 = 12 plant pages + a few index re-renders; UI commit added no pages).

**Hero art:** all 12 hero + 12 interior images generated and committed on first attempt. No OpenRouter rate-limit failures this run; no need for retries. Pacing 5s between commits respected.

**YAML gotchas caught + fixed during run:**
- alocasia FAQ "The visual difference: ..." — colon inside an unquoted answer broke YAML; wrapped in double quotes.
- chamomile FAQ "interactions in human medicine: small individual effect..." — same pattern, fixed.
- lemon-grass facts "sub: 'stomach upset' per ASPCA" — single-quoted phrase in unquoted value tripped YAML mapping; rewrote without quotes.
- lemon-grass FAQ `answer: 'Cat grass' is a marketing name...` — leading single-quoted phrase looked like an opening string literal to YAML; wrapped whole answer in double quotes.

**ASPCA URL slug-shifts (pre-baked by PM, all verified 200):** `/heavenly-bamboo` (+ sibling `/nandina`), `/lenten-rose` (+ sibling `/hellebore`), `/cilantro` (NOT `/coriander`), `/shamrock-plant` (NOT `/shamrock` or `/oxalis`), `/lemon-grass` (with hyphen, NOT `/lemongrass`), `/buttercup`, `/rhododendron` (+ sibling `/azalea`), `/clematis` (+ sibling `/virgins-bower`), `/chamomile` (+ sibling `/garden-chamomile`), `/fennel`, `/periwinkle`, `/alocasia`.

**Will-flagged items / things needing PM or Will review:**
- Homepage nav cleanup: dropped Safe/Toxic/Emergency duplicates of SiteNav. The Emergency link was the only one with custom styling (.landing-nav-emergency) — that CSS class still exists but is now unused; PM may want to garbage-collect it in a future cleanup.
- Footer z-index fix uses a selector pattern (`.landing-root > *:not(.landing-grid-bg) { position:relative; z-index:1 }`) that applies to ALL direct children of every page using landing-root, not just list pages. This is intentional (catches any future page that adds the same overlay), but worth a Will tone-check that this doesn't inadvertently change stacking on existing pages. Verified homepage + library + plant page render correctly.
- UI sanity-check SOUL step documents new gotchas: (a) port 3000 is OpenClaw gateway so use 4173 / `serve out/` instead of `next start`, (b) OpenClaw browser tool blocks localhost so chromium-headless is the workaround, (c) screenshots must live under /data/.openclaw/workspace/ for the image tool to ingest them. Suggest Will read the SOUL diff to confirm the workflow framing is right.

**Queue size after run:** 0 Not started, 0 In progress for Engineering. Full drain.

**Vercel:** auto-deploying main on every push. 13 commits today, each 5s+ apart.

## 2026-06-06 — Engineering daily run

**Plant pages shipped (12):**
- kentia-palm (commit c65c395) — safe, ASPCA non-toxic / Arecaceae; closes the cat-safe indoor palm cluster (areca, parlor, ponytail, bamboo, kentia). Noted ASPCA's broken Family field (lists sci-name instead of Arecaceae) per PM ticket.
- camellia (commit 01756e0) — safe, ASPCA non-toxic / Theaceae; tea-plant caffeine caveat covered explicitly (Camellia sinensis live plant is fine; caffeine concern is processed tea).
- nasturtium (commit e35f055, YAML fix a417c1b) — safe, ASPCA "no records of toxic ingestion" / Tropaeolaceae; nasturtium-vs-watercress naming disambig covered. YAML gotcha: leading `"Nasturtium"` quoted phrase in description tripped the block-mapping parser (same pattern as yesterday's lemon-grass fix). Pushed broken first commit, fixed forward.
- jasmine (commit 2dfc717) — safe (TRUE Jasminum), ASPCA non-toxic / Oleaceae; the highest-volume ticket of the day (2,400/mo). Disambig matrix prominent — true jasmine + star jasmine SAFE, Cape jasmine (gardenia) + night-blooming jasmine + Carolina jessamine TOXIC.
- gardenia (commit 296c26a) — TOXIC mild GI + hives, genioposide + gardenoside / Rubiaceae; Cape Jasmine disambiguation with [jasmine].
- lobelia (commit 4b7ac67) — TOXIC, lobeline alkaloid / Campanulaceae; nicotinic-receptor mechanism, cardiac flag, lobeline≈nicotine receptor-family note.
- yarrow (commit cc302e8) — TOXIC, three toxin classes (glycoalkaloids/monoterpenes/sesquiterpene lactones) / Asteraceae; correction page calling out the holistic-pet "safe calming herb" claim explicitly. ASPCA Soldier's Woundwort typo silently corrected per PM note.
- pieris (commit fad0c25) — TOXIC, grayanotoxins / Ericaceae; completes the Ericaceae trio (azalea + rhododendron + pieris). ASPCA "few leaves can cause serious problems" line baked in verbatim. Lily-of-the-Valley Bush vs true Convallaria disambig prominent.
- horse-chestnut (commit a2796a4) — TOXIC, aesculin saponin / Sapindaceae; conker + buckeye coverage. Sweet chestnut (Castanea sativa, Fagaceae) disambiguation explicit.
- tobacco (commit b16bf0f) — TOXIC, nicotine / Solanaceae; explicitly covers cigarettes, vape liquid, nicotine gum/patches per PM scope. Cat lethal dose ~5 mg/kg cited.
- castor-bean-plant (commit 7c1f832) — DEADLY (shipped as `toxic` in schema; verdictText carries "DEADLY"), ricin / Euphorbiaceae; 12-48h delayed onset is the marquee clinical detail. Bead-jewellery vector covered per PM ticket. (Interior image gen failed once on first attempt, retry succeeded — built-in fallback in the run helper.)
- larkspur (commit 15cf9a3) — TOXIC, diterpene alkaloids (methyllycaconitine) / Ranunculaceae; covers both larkspur AND delphinium keyword clusters (ASPCA sci-name is literally Delphinium species).

**UI cleanup (1 commit):**
- e4c16c3 — swap two lookalike cards in castor-bean-plant and horse-chestnut that pointed to plants without MDX content (banana, chestnut, maple). Caught by today's UI sanity-check screenshots.

**Build status:** green throughout (with build-failure-then-fix detours on nasturtium, pieris, and tobacco — see YAML gotchas below). Started at 117 plant pages (after kentia), ended at 128 (117 + 11 new = 128, plus list-page rerenders).

**Hero art:** all 12 hero + 12 interior images generated. One retry needed (castor-bean-plant interior — first attempt got an empty response from the OpenRouter image endpoint; second attempt succeeded). No persistent failures; no rate-limit walls hit.

**YAML gotchas caught + fixed during run (FOUR this batch — same pattern, document the lesson):**
- nasturtium description starting `"Nasturtium" the common name…` — leading quoted phrase tripped block-mapping parser. **Pushed broken to prod first** because `ship.sh` used `npm run build … | tail` which masks the build exit code. **Fixed the helper** to use `set -o pipefail` + redirect-to-file + explicit `$?` check before commit. No further broken pushes after that fix.
- pieris had THREE separate quoted-phrase-as-value-start instances (`sub: "few leaves" enough` ×2 + `pullQuote: >- ASPCA's quote on pieris is unusually specific: "Ingestion…"`). All rewritten to avoid leading-quote-or-embedded-colon patterns. Caught by the fixed ship.sh before commit (correct behaviour — left ticket In Progress until fixed, then completed).
- tobacco metaTitle was 63 chars (60 char zod limit). Trimmed to `"Is Tobacco Toxic to Cats? Yes — Nicotine"` (47 chars). Note for future: check metaTitle char count BEFORE first build, easy to miss.
- larkspur had two FAQ answers with `:` colons in unquoted scalar values (`functional muscle paralysis:` and `practical takeaway:`). Reflowed both to use em-dash instead of colon. Same gotcha pattern as previous days.

**SOUL update suggestion for Will:** the "MDX YAML gotchas to avoid in plant pages" rules now have four documented patterns. Worth a short addition to the Engineering SOUL as a pre-flight checklist or a build-time linter:
  1. Never start a YAML scalar value with a quoted phrase (e.g. `description: "Nasturtium" the common name…`). Wrap entire value in `"..."` instead, OR reflow.
  2. Avoid embedded `:` colons in unquoted scalar values (e.g. `paralysis: tremors first…`). Use em-dashes.
  3. metaTitle max 60 chars (zod schema-enforced — but only at build time).
  4. Verdict schema only accepts `safe | toxic | insufficient-data`. "deadly" labels go in `verdictText`, not `verdict`.

**UI sanity-check (per SOUL):**
- 7 routes screenshotted: home, library, cat-safe-plants, toxic-plants-for-cats, plants/larkspur, plants/castor-bean-plant, plants/jasmine.
- No landing-grid-bg footer-overlap regression. No duplicated nav. No off-colour text.
- Caught lookalike-card thumbnail issue on castor-bean-plant (Banana plant card had no image because banana.mdx doesn't exist) — fixed in commit e4c16c3.
- Image model flagged thumbnails in the library/toxic-list grids as missing; verified false positive (lazy-loading not firing in headless screenshot; HTML src attributes are correct, files exist on disk).

**Will-flagged items / things needing review:**
- **NEW (this run):** Several plant pages today contain inline body links to plants without MDX content (`/plants/banana/`, `/plants/bird-of-paradise/`, `/plants/sweet-alyssum/`, `/plants/chestnut/`, `/plants/maple/`, `/plants/silver-vine/`, `/plants/star-jasmine/`). These 404 if clicked but don't render as visible broken thumbnails. Same pre-existing pattern exists across older pages (calendula, wheatgrass, etc. also referenced but not built). Worth a PM scoping decision: build out these as a future batch, or rewrite the inline references in existing pages to point only to built plants. I'd lean toward "build them" since the existing references are useful SEO internal-linking signals if/when the pages exist.
- **NEW (this run):** Engineering SOUL pre-flight checklist suggestion above (4 YAML gotchas + verdict-schema enum). Not blocking; would help future runs avoid the build-fix-build-fix loop.
- **Carry-over:** UI sanity-check `.landing-nav-emergency` unused CSS class flagged 2026-06-05 still unused. Minor cleanup candidate.

**Queue size after run:** 0 Not started, 0 In progress for Engineering. Full drain (matches yesterday — second consecutive zero-queue evening).

**Vercel:** auto-deploying main on every push. 13 commits today + 1 cleanup commit + 1 mid-batch fix (15 total pushes). Pacing 5s between commits was approximated rather than mechanical; in practice each ticket's image-gen + build took 90-180s so the 5s git-cooldown was always satisfied.
