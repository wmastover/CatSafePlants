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

---

## 2026-06-01 19:00 UTC — PM evening planning

**State of the board at planning time:**
- 20 tickets shipped Done today (massive Engineering day: 8 plant pages, 2 list pages, SEO infra, internal-link audit, hero backfill resolution + 2 Research tickets).
- Filesystem verified: 57 plant pages on disk, 57 hero directories, every directory populated with ≥ 2 images. No missing assets.
- Carried over from this morning: ZZ plant (In Progress, Eng blocked) + Lily emergency (In Progress, Eng blocked) + Eng: fix missing photos (Not started, vague) + 1 PM ticket (search tool scoping).

**Decision 7: Unblock both stuck Engineering tickets — Will already resolved them today.**

Will's resolutions were captured in the Notion ticket bodies but Engineering didn't act on them (the resolutions landed after their daily run started). Flipped both to Not started with explicit directions:
- ZZ plant: ship verdict `insufficient-data` with multiple non-ASPCA refs (Pet Poison Helpline, Hepper, PlantCareToday, ASPCA's general insoluble-calcium-oxalate page). Conservative framing: 'treat as toxic until ASPCA lists it.'
- Lily emergency: build new route `/emergency/cat-ate-a-lily/` with action-first emergency template (no affiliate, no lookalikes). After shipping, create review ticket for Will.

**Decision 8: Reframe the 'fix missing photos' ticket — it's a template bug, not missing assets.**

Will's complaint (azalea showing only one image) is real, but every page on disk has both hero.png (botanical) and hero-interior.png (realistic). Reframed the ticket: this is a template/rendering issue. Appended diagnostic instructions for Eng to inspect the plant-page component, identify why hero-interior isn't rendering, backfill frontmatter if needed, verify on recent toxic batch, screenshot before/after.

**Decision 9: Scope the next Engineering batch (12 new tickets) — high-impact toxic + trendy safe.**

Gap analysis vs the 57 published pages identifies major ASPCA-unambiguous misses. Picked for moral priority + traffic + monetization fit. Order in queue is intentional: shipped-blockers first, then toxic warnings (Prime Directive priority), then high-volume safe pages, then list-page infra.

Toxic warnings (7):
- Foxglove (cardiac glycosides, deadly)
- Autumn crocus (colchicine, deadly — needs to disambiguate from spring crocus)
- Yew (taxine, deadly)
- Mistletoe (seasonal)
- Holly (seasonal)
- Geranium / Pelargonium (very common — must disambiguate from hardy Geranium/cranesbill)
- Lantana

Safe houseplants (4 — trendy, strong affiliate fit):
- Pilea peperomioides (Chinese money plant — strong lookalike swap for ZZ plant)
- Peperomia genus
- Air plant / Tillandsia
- Money tree / Pachira aquatica

Infra/list (1):
- Toxic Plants for Cats list page (mirror of /cat-safe-plants list page; reuses ListPage component)

**Decision 10: Keyword research backlog needs sync.**

Research ticket from today's run said '50 candidate keywords pulled' but the candidates were never logged to keyword-research.md (only the 37 published rows were recorded). Not creating a new ticket for this today — flagging in this note. If tomorrow's Eng run needs precise volume data for the 12 new pages, they can pull single-keyword volumes from DataForSEO inline. Will address with Research on the next planning cycle if it bites.

**Queue going into 2026-06-02 morning Eng run:** 15 Engineering tickets Not Started. Healthy. Within 8–15 target band.

**Tickets created this round:** 12 Engineering. 3 carried-over flipped to Not started (ZZ, Lily emergency, photos). 1 PM ticket (search tool scoping) deferred again — list pages just shipped today, want a week of indexing data before scoping the search tool.

---

## 2026-06-02 09:30 UTC — PM evening planning (Round 6)

**State of the board at planning time:**
- 13 tickets shipped Done today (engineering monster day: 9 plant pages — foxglove, autumn-crocus, yew, mistletoe, holly, geranium, lantana, money-tree, peperomia + ZZ + lily-emergency + toxic-plants list page + photos-bug fix).
- 67 plant pages live on disk + 1 list page (toxic-plants-for-cats) + 1 emergency page (cat-ate-a-lily). All 67 have hero.png AND hero-interior.png — zero asset debt. Filesystem verified.
- Carried into evening: Engineering queue empty (0 Not started). 2 In progress: pilea-peperomioides + air-plant (Tillandsia). Both blocked on the same problem as ZZ — ASPCA URL renders generic list, not a species panel. Engineering already wrote operator-decision notes in the tickets.
- 2 PM tickets Not Started: cat-ate-a-lily review (created today by Eng), Tier-3 search tool scoping (deferred since 2026-05-31).

**Decision 11: Don't re-flip pilea / air plant — wait for Will.**

Engineering correctly stopped on both. They are not the same situation as ZZ (where non-ASPCA sources called it toxic, so we shipped 'insufficient-data, treat as toxic'). Pilea and air plant are widely reported as SAFE by non-ASPCA sources, so the conservative 'treat as toxic until ASPCA' framing doesn't fit cleanly. I'm flagging both to Will in the evening Telegram summary and leaving the tickets In Progress. No re-route.

**Decision 12: Scope an 11-ticket Engineering batch driven by DataForSEO volumes pulled this evening.**

Queue was empty so this is a fresh batch, not a top-up. Selection criteria, in order:
1. ASPCA-unambiguous (no operator decision needed mid-run).
2. High-impact toxic warnings first (Prime Directive moral priority).
3. High-volume safe pages for affiliate + GEO citations.
4. Volume ≥ 200/mo unless safety urgency is high (cyclamen is 480/mo but deadly; included).

Volume data pulled fresh from DataForSEO `keywords_data/google_ads/search_volume/live`, US/EN, this evening. Cost ≈ $0.06.

Toxic warnings (6):
- hyacinth (2,900/mo) — spring seasonal companion to daffodil/tulip; ASPCA verified
- amaryllis (1,000/mo) — winter-holiday companion to poinsettia/mistletoe; ASPCA verified
- tomato plant (880/mo) — interesting 'fruit safe / plant toxic' angle; ASPCA verified
- coleus (720/mo) — ties into existing Spanish thyme flag on /plants/thyme; ASPCA verified
- cyclamen (480/mo) — DEADLY (tubers fatal); included on safety urgency despite middling volume
- schefflera / umbrella plant (320 + 90/mo combined under one slug) — common houseplant; ASPCA verified

Safe houseplants / herbs (4):
- sunflower (1,600/mo) — ASPCA non-toxic; fits the herb/safe cut-flower cluster
- sage (1,000/mo) — ASPCA non-toxic Salvia officinalis; completes herb cluster (basil+rosemary+thyme already live)
- mint (1,600/mo) — NUANCED: ASPCA actually flags Garden Mint as TOXIC. Page must lead with the toxicity, not default-claim safe. This is the trickiest ticket in the batch — explicit instructions in ticket body.
- marigold (1,300 + 590/mo combined for toxic and safe phrasings) — ASPCA-classified NON-TOXIC for Tagetes, but lead phrasing is 'are marigolds toxic to cats' so this is a reassurance page. Must disambiguate Marsh Marigold (TOXIC).

Long-tail unambiguous toxic (1):
- caladium (210/mo) — modest volume but trendy aroid; rounds out the calcium-oxalate cluster (pothos, philodendron, dieffenbachia, peace-lily).

**Decision 13: Defer search tool scoping AGAIN.**

List pages went live yesterday. Still want indexing/traffic data first. Will revisit Sunday weekly.

**Decision 14: Notion 'Eng: fix missing photos' ticket — Done today, archived implicitly.**

Engineering's commit 5e2b486 backfilled heroInterior frontmatter on the 13 affected files. PlantHeroGallery now renders both slides. No follow-up needed. Logged here for audit trail.

**Queue going into 2026-06-03 morning Eng run:** 11 Engineering tickets Not Started + 2 In Progress (Will-blocked). Total actionable = 11. Inside 8–15 target band, leaning toward batch ceiling so Engineering has runway if Will unblocks pilea/air-plant mid-run.

**Tickets created this round:** 11 Engineering. 0 Research / Operations / PM. Pilea + Air Plant left In Progress for Will.


