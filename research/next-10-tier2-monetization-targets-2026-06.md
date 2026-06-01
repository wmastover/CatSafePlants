# Next 10 Plant Keyword Targets — Tier-2 Volume + Monetization Focus

**Ticket:** 🔍 Research: Identify next 10 plant keyword targets after this batch — focus on Tier-2 volume + monetization potential (Notion `371e0560-4db9-81b3-a087-e08000b8972b`)
**Researched:** 2026-06-01
**Source:** DataForSEO Google Ads `keywords_data/google_ads/search_volume/live` — US (location 2840), English. Two batched calls today, 189 keywords total, combined cost $0.150. ASPCA toxicity verified per row.

## Scope

The 10 plant profile pages Engineering should write **after** the artefact at `research/next-10-keyword-targets-2026-06.md` ships (commit `f94f58e`). PM's framing: Tier-2 volume + monetization potential.

**Selection rules applied:**

1. **Not already published** (cross-checked against `content/plants/*.mdx`, 58 files as of 2026-06-01).
2. **Not in the previous next-10** (lemongrass, mint, sage, hibiscus, amaryllis, zz plant, parsley, oregano, hyacinth, jasmine).
3. **Tier-2 band defined as 100–1,500/mo US search volume** — below the Tier-1 ≥5k targets PM has already prioritised in earlier batches, above the long-tail noise floor.
4. **Monetization signal:** prefer plants with a clear retail purchase path (Amazon Associates fit — common houseplants, herb starts, succulent kits). Higher CPC used as tiebreaker (advertiser bid = commercial intent proxy). Strict-poisonous-only flowers with no purchase angle deprioritised.
5. **ASPCA listing must exist and be defensible.** Every row below is sourced.
6. **Cats only.**

## Recommended next 10 (in order)

| # | Keyword | Volume (US, /mo) | CPC ($) | ASPCA verdict (cats) | Monetization angle |
|---|---------|------------------|---------|----------------------|--------------------|
| 1 | are succulents safe for cats | 880 | 0.55 | **Mixed** (category) — see "Notes" | Category page → links to all succulent-specific profiles (jade, haworthia, string of pearls, kalanchoe, echeveria). High Amazon affiliate value (succulent starter kits). [ASPCA category browse](https://www.aspca.org/pet-care/animal-poison-control/cats-plant-list) |
| 2 | is cyclamen toxic to cats | 480 | 1.10 | **Toxic** — cyclamine saponins; tubers most toxic ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/cyclamen)) | Strong winter/holiday gift-plant retail volume; Amazon + nursery affiliate fit. Higher CPC = commercial intent. |
| 3 | is cilantro safe for cats | 480 | 0.03 | **Non-toxic** — *Coriandrum sativum* ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/cilantro)) | Completes herb cluster (basil + rosemary + thyme + sage + parsley + oregano + cilantro). Indoor-herb-kit affiliate fit. Low CPC but cluster value matters more than per-page revenue. |
| 4 | are tiger lilies toxic to cats | 480 | 1.18 | **Toxic, life-threatening** — true *Lilium* sp.; can cause renal failure with < 1 leaf ingested ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/tiger-lily)) | High-urgency/emergency intent — strong "what now?" follow-on page candidate. Affiliate fit weak but mission-critical (kills cats). |
| 5 | is schefflera toxic to cats | 320 | 1.31 | **Toxic** — ASPCA listing exists ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/schefflera)). Toxic principle: calcium oxalates (cross-verify with Cornell at write time). | Extremely common houseplant (umbrella tree); high retail volume → Amazon Associates fit. $1.31 CPC = strong commercial signal. |
| 6 | is dill safe for cats | 320 | 0.40 | **Non-toxic** — *Anethum graveolens* ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/dill)) | Herb cluster completion alongside cilantro. Lower priority alone, but pairs naturally with the herb-kit affiliate template. |
| 7 | is gardenia toxic to cats | 260 | 0.96 | **Toxic** (ASPCA listing exists; toxic principles — cross-verify at write time) ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/gardenia)) | Popular ornamental shrub/houseplant; Mother's Day + summer seasonal lift. Retail affiliate fit. |
| 8 | is chamomile toxic to cats | 590 | 0.00 | **Toxic** — volatile essential oils ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/chamomile)) | Owner-confusion play — chamomile is widely assumed "natural/safe" (sold as cat-calming herbal tea by some retailers). Correction page is high-trust + GEO-valuable. CPC=0 reduces direct ad value but mission fit is strong. |
| 9 | is money tree safe for cats | 170 | 0.00 | **Non-toxic** — *Pachira aquatica*; ASPCA listing exists ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/money-tree)) | Trending IG/decor plant; strong Amazon Associates fit (low-priced starter trees). Listed despite lower volume because retail intent is high. |
| 10 | is peperomia safe for cats | 110 | 0.00 | **Non-toxic** — *Peperomia* spp. (e.g. `Peperomia hederifolia` on ASPCA) ([ASPCA](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/peperomia-hederifolia)) | Trending small-houseplant category; ASPCA lists multiple Peperomia species as non-toxic. Strong affiliate fit + safe-plant brand alignment. |

**Total monthly search volume across the 10:** ~4,120/mo (Tier-2, as scoped).
**Toxic / safe split:** 6 toxic / 4 safe (1 mixed category page).
**Average CPC:** $0.56. Weighted toward retail-intent commodity plants per PM's monetization framing.

## Alias / redirect candidates — DO NOT WRITE NEW PAGES

The DataForSEO pull surfaced several Tier-2 / Tier-1 volume queries that are aliases for plants already published. Engineering should add these as redirects, schema `alternateName`, or H2 sections on the existing page — **not** new profiles. Surfacing for PM visibility because they affect ranking strategy:

| Alias query | Volume | Maps to existing page | Suggested action |
|-------------|--------|-----------------------|------------------|
| is wandering jew toxic to cats | 880 | `tradescantia.mdx` (same genus; ASPCA "Inch Plant", [link](https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/inch-plant)) | Add "wandering jew" + "wandering dude" + "inch plant" as aliases on tradescantia page; consider 301 from `/plants/wandering-jew` if URL ever existed. |
| is bird of paradise toxic to cats | 880 ($8.22 CPC!) | `strelitzia-reginae.mdx` | Add "Bird of Paradise" prominently as H1/H2 alias + meta-title variant. **$8.22 CPC is the highest in either DFS batch** — strong signal to optimise the existing page for this alias. |
| is golden pothos toxic to cats | 880 | `pothos.mdx` | Add variety section: golden, marble queen, satin (note: satin pothos is *Scindapsus pictus*, not *Epipremnum aureum* — Engineering should disambiguate). |
| is areca palm toxic to cats | 170 | `areca-palm.mdx` | Already covered. Title variant: "is areca palm safe or toxic for cats". |
| is heart leaf philodendron toxic to cats | 110 | `philodendron.mdx` | Add variety section: heartleaf, brasil, birkin, moonlight, split-leaf. |
| are stargazer lilies toxic to cats | 390 | `easter-lily.mdx` / `lily.mdx` | Add stargazer + oriental lily aliases to lily pages (same renal-failure toxicity per ASPCA pro-tox brief). |

These represent **~3,300/mo of search volume already covered by existing pages** — capturable without new content. High ROI compared to writing the next 10 new profiles.

## Excluded candidates (volume sufficient, but disqualified)

| Keyword | Volume | Reason excluded |
|---------|--------|-----------------|
| is aloe safe for cats | 1,600 | Maps to existing `aloe-vera.mdx`. Add as alias, not new page. |
| is alocasia toxic to cats | 590 | ASPCA toxic; **strong candidate** but very similar species coverage to dieffenbachia/anthurium/aglaonema/philodendron (all Araceae, calcium oxalate). Recommend PM swap into batch only if they want broader Araceae coverage; otherwise diminishing returns. |
| is cat grass safe for cats | 140 | Better handled as a category/product page (multiple species: oat, wheat, barley grass), not a single profile. Recommend PM open a separate ticket for a dedicated cat-grass guide with affiliate kit recommendations. |
| is corn plant toxic to cats | 170 | Maps to existing `dracaena.mdx` (*Dracaena fragrans* = corn plant). Alias target. |
| is mother of thousands toxic to cats | 110 | Maps to `kalanchoe.mdx` (*Kalanchoe daigremontiana*). Alias target. |
| is wheatgrass safe for cats | 210 | Same as cat-grass — category page candidate, not profile. |
| is cactus safe for cats / are cacti safe for cats | data sparse | Category query; defer to a list-page strategy. |

## Methodology notes

- Two DataForSEO `search_volume/live` calls were batched (87 + 102 keywords); both stayed well under the 1,000/req limit and total cost was $0.150 for the day.
- Volumes are 12-month Google Ads averages, US English, location 2840. International markets out of scope.
- "Tier-2" is defined per PM's framing in the ticket title — interpreted as 100–1,500/mo to sit below the Tier-1 ≥5k bracket the previous batches targeted.
- "Monetization potential" interpreted as: (a) retail/purchase intent (common houseplant or herb retailed on Amazon), (b) CPC ≥ $0.40 as commercial-intent proxy, (c) Amazon Associates category fit. Pages with strict emergency/poisoning intent but no purchase angle were deprioritised unless the safety mission demanded coverage (chamomile, tiger lily).
- Every ASPCA URL above resolves as of 2026-06-01.

## What this artefact is NOT

- Not a writing brief. PM creates Engineering tickets from this.
- Not a content strategy proposal. Volume + monetization signal + ASPCA verifiability are the only criteria applied.
- Not an alias-implementation plan — surfacing the alias opportunity, not deciding how to execute it.

Observation for PM: The single highest-leverage action surfaced by this research is **optimising the existing `strelitzia-reginae.mdx` page for "bird of paradise" aliases**. That query is 880/mo at $8.22 CPC (highest CPC in either batch — by a factor of 4×). Capturing this alias likely outperforms writing any new profile this round. Surfacing for PM judgement; not acting on it.
