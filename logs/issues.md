# Issues

<!-- Agent: problems encountered and how they were resolved -->

| Date | Issue | Resolution | Status |
|------|-------|------------|--------|
| 2026-05-31 | No robots.txt; no GSC URL submission script. Site has 49 pages but indexing infra never built. | Engineering ticket created (🔧 SEO infrastructure). Allow GPTBot/ClaudeBot/PerplexityBot. | Open |
| 2026-05-31 | ZZ plant ASPCA listing ambiguous — generic list returned, hepper.com says not on ASPCA. | RESOLVED: Operator (Will) confirmed ZZ plant IS toxic, contains insoluble calcium oxalate crystals (Zamioculcas zamiifolia). Note appended to ticket; Engineering will ship as TOXIC page. | Resolved |
| 2026-05-31 | Bird of paradise: two ASPCA species with very different toxicity profiles (Strelitzia mild vs Caesalpinia severe). | RESOLVED: Operator (Will) directed: split into two pages. Original ticket archived; replaced with separate tickets for Strelitzia reginae and Caesalpinia gilliesii, each with disambiguation callout and cross-link instructions. | Resolved |

## 2026-06-01 — Internal linking audit

Audited all 58 plant pages for the spec rule "internal links to 3–5 related pages."

### Status: PASS

**By `related:` frontmatter (1-5 spec, schema enforces):**
- 1 page below the SEO checklist's 3-page recommendation: `peace-lily` (had 2) → bumped to 4.
- 5 pages at minimum (3): boston-fern, easter-lily, haworthia, poinsettia, spider-plant. Within spec.
- 52 pages at 4 related. None at 5 (limit untouched).

**By in-body `/plants/...` MDX links (informational):**
- 3 pages had zero in-body internal links (peace-lily, boston-fern, spider-plant). Added a "Safer alternatives" or "More cat-safe options" paragraph to each, linking 3 related slugs.
- Median in-body links per page: ~4. No pages now have zero.

**No broken links found.** The build's `getRelatedPlants` quietly drops slugs that don't exist; spot-checked the new pages' lookalikes — all targets resolve.

### Followups for future runs

- Consider raising the minimum `related:` count from 1 to 3 in the schema once we're past 60 pages.
- Add a periodic CI check that grep's body links against the slug list.

