# Next 10 Plant Keyword Targets (post-Jun 1 batch)

**Ticket:** 🔍 Research: Update keyword-research.md for May 30 batch + identify next 10 plant keyword targets (Notion `371e0560-4db9-8186-b922-f8880f4ef1ee`)
**Researched:** 2026-06-01
**Source:** DataForSEO Google Ads `keywords_data/google_ads/search_volume/live` — US (location 2840), English, single batched call (87 keywords, cost $0.075). ASPCA toxicity verified per row via ASPCA's plant database (URLs cited inline).

## Scope

Identify the next 10 plant profile pages Engineering should write after the Jun 1 batch ships. Selection rules applied:

1. **Not already published** (cross-checked against `content/plants/*.mdx` — 58 files as of 2026-06-01).
2. **Has a verifiable ASPCA listing** — toxicity claim must be defensible. If ASPCA listing is absent or ambiguous, the keyword is excluded.
3. **Real DataForSEO search volume** (no estimates).
4. **Ranked primarily by monthly volume**, with a tiebreaker toward herbs/houseplants over rarer flowering plants (matches existing site composition + monetization fit).
5. **Cats only** — confirmed for every row.

## Recommended next 10 (in order)

| # | Keyword | Volume (US, /mo) | CPC ($) | Competition | ASPCA verdict (cats) | Notes |
|---|---------|------------------|---------|-------------|----------------------|-------|
| 1 | is lemongrass safe for cats | 2,400 | 0.00 | LOW | **Toxic** — essential oils, cyanogenic glycosides ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/lemon-grass)) | Common herb, high intent. Note: many owners assume "grass = safe"; correction page is high-value GEO. |
| 2 | is mint safe for cats | 1,600 | 0.60 | LOW | **Toxic** — *Mentha sp.* listed toxic (essential oils) ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/mint)) | Owner-confusion play; pairs with catnip page for internal linking. |
| 3 | is sage safe for cats | 1,000 | 1.52 | LOW | **Non-toxic** — *Salvia officinalis* ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/sage)) | Highest CPC of the herb set; clean "safe" page. |
| 4 | is hibiscus toxic to cats | 1,000 | 0.57 | LOW | **Non-toxic** (ASPCA listing exists; no toxic principles flagged) ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/hibiscus)) | Garden/houseplant; broad seasonal demand. ASPCA listing is sparse — recommend Engineering cite ASPCA listing existence + flag absence of toxic-principles entry verbatim. |
| 5 | is amaryllis toxic to cats | 1,000 | 0.55 | LOW | **Toxic** — lycorine + alkaloids; bulbs most toxic (ASPCA "Lily of the Palace", *Hippeastrum spp.*) ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/lily-palace)) | Strong holiday/winter seasonality. Pair with existing lily/easter-lily internal links. |
| 6 | is zz plant toxic to cats | 880 | 0.39 | LOW | **Toxic** — listed in ASPCA's *Zamioculcas zamiifolia* entry ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/zamioculcas-zamiifolia)) | Extremely common houseplant; high commercial intent (Amazon affiliate fit). ASPCA listing brief — Engineering should quote it verbatim and cross-check with Cornell or VCA for toxic-principle (calcium oxalate crystals, per industry consensus). |
| 7 | is parsley safe for cats | 880 | 0.68 | LOW | **Toxic** — furanocoumarins, photosensitization ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/parsley)) | Owner-confusion: parsley appears in some cat treats. Page must distinguish trace/seasoning use vs plant ingestion — explicit quote of ASPCA's "large amounts are needed" clause. |
| 8 | is oregano safe for cats | 720 | 0.25 | LOW | **Toxic** — GI irritants; mild vomiting/diarrhea ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/oregano)) | Completes the kitchen-herb cluster (basil, rosemary, thyme already published + sage, parsley, oregano queued). |
| 9 | is hyacinth toxic to cats | 720 | 0.66 | LOW | **Toxic** — narcissus-like alkaloids; intense vomiting/diarrhea/tremors ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/hyacinth)) | Spring bulb cluster (pairs with tulip, daffodil published Jun 1). Strong seasonal lift Q1. |
| 10 | is jasmine safe for cats | 480 | 1.00 | LOW | **Non-toxic** — true *Jasminum* spp. ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/jasmine)) | Page must explicitly disambiguate "true jasmine" from Carolina jessamine / star jasmine — those are different genera and ASPCA-toxic. |

**Total monthly search volume across the 10:** 9,680/mo.
**Average CPC:** $0.62.
**Split:** 7 toxic / 3 non-toxic. Mix preserves existing site balance (toxic pages drive emergency/urgency traffic; safe pages drive purchase intent).

## Candidates considered but excluded

These showed up in the DataForSEO pull but did not make the top 10. Recording so PM has visibility and can override.

| Keyword | Volume | Reason excluded |
|---------|--------|-----------------|
| is mother in law tongue toxic to cats | 70 | Already covered by `snake-plant` (same species, *Sansevieria*); ranking signal collapses into existing page. |
| is succulent safe for cats | 20 | Category query, not a plant. Better handled as a future list page, not a profile. |
| is fern safe for cats | 70 | Category query (multiple species — boston, asparagus, staghorn). Already partially covered. |
| is cyclamen toxic to cats | 480 | ASPCA listing exists (Engineering can build it), but lower commercial intent (poisonous-only angle, no affiliate fit). Reasonable P3 swap-in if PM prefers seasonal coverage over a herb. |
| is cilantro safe for cats | 480 | ASPCA: non-toxic. Reasonable swap-in if PM prefers more herbs over flowering plants. Excluded only because the top-10 already has 3 herbs (sage, parsley, oregano). |
| is dill safe for cats | 320 | ASPCA: non-toxic. Same logic as cilantro. |
| is wheatgrass safe for cats | 210 | High commercial intent (cat-grass kits) but ASPCA listing is for `Triticum aestivum` and only marginally relevant — recommend revisiting in a future batch with a careful species write-up. |
| is geranium toxic to cats | 170 | ASPCA-toxic (geraniol/linalool). Volume too low for this batch; queue for the round after. |
| is foxglove toxic to cats | 140 | ASPCA-toxic (cardiac glycosides). Volume too low for this batch. |
| is hostas toxic to cats / is mums toxic to cats / is begonias toxic to cats | covered or low | `is mums toxic to cats` (50) collapses to existing chrysanthemum page; begonia already published. |

## Methodology notes

- DataForSEO query was a single batched call (87 keywords) — well under the 1,000/req limit and the cheapest way to ground the recommendation set.
- Volumes are 12-month Google Ads averages, US English. Tier-2 international markets not in scope per existing logs.
- "Already published" cross-check used the file listing in `content/plants/` (58 `.mdx` files as of 2026-06-01).
- Every ASPCA URL above resolves to a real listing as of 2026-06-01. If Engineering hits a 404 or layout change at write time, escalate via the per-page Notion ticket — do not infer toxicity from secondary sources.

## What this artefact is NOT

- Not a writing brief. PM creates Engineering tickets; this file just hands PM 10 prioritised, sourced keyword targets.
- Not a content strategy proposal. Volume + ASPCA verifiability are the only selection criteria applied here.
- Not a guarantee of ranking — only of search demand and toxicity-source defensibility.

Observation for PM: 4 keywords from the May 30/Jun 1 batches landed at near-zero volume (mexican bird of paradise, oleander, peruvian lily, areca palm). All pages exist — flagging for visibility in case PM wants to deprioritise that template for future batches. No action being taken; this is observation only.
