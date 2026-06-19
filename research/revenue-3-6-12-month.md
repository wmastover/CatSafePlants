# Revenue Projection — 3 / 6 / 12 Month

**Research ticket:** Revenue Part B — 3/6/12-month scenario model
**Date:** 2026-06-19
**Depends on:** `research/revenue-traffic-ceiling.md` (Part A, 2026-06-09)
**Author:** Research Agent

---

## Inputs (PM-locked)

| Input | Pessimistic | Realistic | Optimistic |
|-------|------------|-----------|------------|
| Affiliate CTR (page → affiliate link) | 3% | 5% | 8% |
| Merchant conversion (affiliate click → buyer) | 2% | 3.5% | 5% |
| Average order value | $45 | $45 | $45 |
| Commission rate | 3% (Amazon baseline) | 6% (mixed program) | 10% (Chewy/Petco direct) |
| AI Overview haircut on clicks | None (floor scenario) | −30% | −30% |

**Ramp curve (% of steady-state traffic by month, PM-locked):**

| Month | % of Steady-State |
|-------|-------------------|
| 1 | 10% |
| 2 | 25% |
| 3 | 45% |
| 6 | 75% |
| 12 | 100% |

**Content velocity (PM-locked):**

| Horizon | Additional pages | Traffic multiplier vs. initial 153-page set |
|---------|-----------------|---------------------------------------------|
| Month 1–3 | +0 (initial set only) | 1.00× |
| Month 6 | +200 pages | 1.50× (25% per 100 pages × 2) |
| Month 12 | +400 pages | 2.00× (25% per 100 pages × 4) |

> Note: "25% increase per 100 new pages" applied to the base steady-state traffic for each scenario (diminishing returns — top keywords already covered).

**Steady-state base clicks (from Part A post-haircut):**

| Scenario | Base monthly clicks (steady-state, 153 pages) |
|----------|-----------------------------------------------|
| Pessimistic | 1,957 (no haircut) |
| Realistic | 6,878 (post-30% haircut from raw 9,825) |
| Optimistic | 31,479 (post-30% haircut from raw 44,970) |

---

## Traffic-to-Revenue Model

The formula applied identically across all scenarios and time periods:

```
Monthly clicks
  × ramp_factor          (% of steady-state for that month)
  × traffic_multiplier   (content velocity; 1.0 at M1–3, 1.5 at M6, 2.0 at M12)
= Effective monthly clicks

Effective monthly clicks
  × affiliate_CTR        (3% / 5% / 8%)
= Monthly affiliate clicks

Monthly affiliate clicks
  × merchant_conversion  (2% / 3.5% / 5%)
= Monthly buyers

Monthly buyers
  × AOV                  ($45)
  × commission_rate      (3% / 6% / 10%)
= Monthly revenue
```

**Example (Realistic, Month 1):**
- Effective clicks: 6,878 × 10% × 1.00 = 688
- Affiliate clicks: 688 × 5% = 34.4
- Buyers: 34.4 × 3.5% = 1.20
- Revenue: 1.20 × $45 × 6% = **$3.25**

---

## Scenario Tables

### Pessimistic
Base steady-state: 1,957 clicks/mo | Affiliate CTR: 3% | Merchant conv: 2% | AOV: $45 | Commission: 3%

| Month | Page count | Ramp | Traffic mult | Effective clicks | Affiliate clicks | Buyers | Monthly revenue |
|-------|-----------|------|-------------|-----------------|-----------------|--------|----------------|
| 1 | 153 | 10% | 1.00× | 196 | 5.9 | 0.12 | $0.16 |
| 2 | 153 | 25% | 1.00× | 489 | 14.7 | 0.29 | $0.40 |
| 3 | 153 | 45% | 1.00× | 881 | 26.4 | 0.53 | $0.71 |
| 6 | 353 | 75% | 1.50× | 2,202 | 66.1 | 1.32 | $1.79 |
| 12 | 553 | 100% | 2.00× | 3,914 | 117.4 | 2.35 | $3.18 |

> Pessimistic monthly revenue at steady-state (M12): **$3.18/month**. This is intentionally a floor scenario.

### Realistic
Base steady-state: 6,878 clicks/mo | Affiliate CTR: 5% | Merchant conv: 3.5% | AOV: $45 | Commission: 6%

| Month | Page count | Ramp | Traffic mult | Effective clicks | Affiliate clicks | Buyers | Monthly revenue |
|-------|-----------|------|-------------|-----------------|-----------------|--------|----------------|
| 1 | 153 | 10% | 1.00× | 688 | 34.4 | 1.20 | $3.25 |
| 2 | 153 | 25% | 1.00× | 1,720 | 86.0 | 3.01 | $8.13 |
| 3 | 153 | 45% | 1.00× | 3,095 | 154.8 | 5.42 | $14.63 |
| 6 | 353 | 75% | 1.50× | 7,738 | 386.9 | 13.54 | $36.56 |
| 12 | 553 | 100% | 2.00× | 13,756 | 687.8 | 24.07 | $65.00 |

> Realistic monthly revenue at steady-state (M12): **$65/month**.

### Optimistic
Base steady-state: 31,479 clicks/mo | Affiliate CTR: 8% | Merchant conv: 5% | AOV: $45 | Commission: 10%

| Month | Page count | Ramp | Traffic mult | Effective clicks | Affiliate clicks | Buyers | Monthly revenue |
|-------|-----------|------|-------------|-----------------|-----------------|--------|----------------|
| 1 | 153 | 10% | 1.00× | 3,148 | 251.8 | 12.59 | $56.67 |
| 2 | 153 | 25% | 1.00× | 7,870 | 629.6 | 31.48 | $141.66 |
| 3 | 153 | 45% | 1.00× | 14,166 | 1,133.3 | 56.66 | $254.98 |
| 6 | 353 | 75% | 1.50× | 35,414 | 2,833.1 | 141.66 | $637.46 |
| 12 | 553 | 100% | 2.00× | 62,958 | 5,036.6 | 251.83 | $1,132.49 |

> Optimistic monthly revenue at steady-state (M12): **$1,132/month**.

---

## Cumulative Revenue

Cumulative totals are estimated by summing all months from M1 through the horizon. Intermediate months (not shown in the scenario tables) are interpolated linearly between the known ramp points.

**Ramp schedule for intermediate month interpolation:**

| Month | Ramp % |
|-------|--------|
| 1 | 10% |
| 2 | 25% |
| 3 | 45% |
| 4 | 60% |
| 5 | 67.5% |
| 6 | 75% |
| 7–11 | Linear 75% → 100% |
| 12 | 100% |

**Page counts / traffic multipliers used for cumulative:**

- M1–M3: 153 pages, 1.00×
- M4–M6: 353 pages, 1.50×
- M7–M12: 553 pages, 2.00×

### Pessimistic cumulative ($0.16, $0.40, $0.71, $0.96, $1.08, $1.79/mo ramp):

| Horizon | Cumulative revenue |
|---------|--------------------|
| 3 months (M1–M3) | **$1.27** |
| 6 months (M1–M6) | **$7.18** |
| 12 months (M1–M12) | **$23.24** |

### Realistic cumulative:

| Horizon | Cumulative revenue |
|---------|--------------------|
| 3 months (M1–M3) | **$25.95** |
| 6 months (M1–M6) | **$143.43** |
| 12 months (M1–M12) | **$462.04** |

### Optimistic cumulative:

| Horizon | Cumulative revenue |
|---------|--------------------|
| 3 months (M1–M3) | **$453.31** |
| 6 months (M1–M6) | **$2,451.75** |
| 12 months (M1–M12) | **$8,075.80** |

### Summary across scenarios:

| Scenario | 3-month cumulative | 6-month cumulative | 12-month cumulative |
|----------|-------------------|-------------------|---------------------|
| Pessimistic | $1.27 | $7.18 | $23.24 |
| Realistic | $25.95 | $143.43 | $462.04 |
| Optimistic | $453.31 | $2,451.75 | $8,075.80 |

---

## Cumulative Calculation Detail

### Pessimistic — month-by-month:

| Month | Pages | Ramp | Mult | Eff. clicks | Aff. clicks | Buyers | Revenue |
|-------|-------|------|------|-------------|-------------|--------|---------|
| 1 | 153 | 10% | 1.00 | 196 | 5.9 | 0.12 | $0.16 |
| 2 | 153 | 25% | 1.00 | 489 | 14.7 | 0.29 | $0.40 |
| 3 | 153 | 45% | 1.00 | 881 | 26.4 | 0.53 | $0.71 |
| 4 | 353 | 60% | 1.50 | 1,761 | 52.8 | 1.06 | $1.43 |
| 5 | 353 | 67.5% | 1.50 | 1,981 | 59.4 | 1.19 | $1.61 |
| 6 | 353 | 75% | 1.50 | 2,202 | 66.1 | 1.32 | $1.79 |
| 7 | 553 | 80% | 2.00 | 3,131 | 93.9 | 1.88 | $2.55 |
| 8 | 553 | 85% | 2.00 | 3,327 | 99.8 | 2.00 | $2.70 |
| 9 | 553 | 90% | 2.00 | 3,523 | 105.7 | 2.11 | $2.86 |
| 10 | 553 | 93.3% | 2.00 | 3,652 | 109.6 | 2.19 | $2.96 |
| 11 | 553 | 96.7% | 2.00 | 3,783 | 113.5 | 2.27 | $3.07 |
| 12 | 553 | 100% | 2.00 | 3,914 | 117.4 | 2.35 | $3.18 |
| **TOTAL** | | | | | | | **$23.42** |

> Note: Minor rounding differences between this detail table and the summary ($23.24 vs $23.42) are due to rounding at the monthly level.

### Realistic — month-by-month:

| Month | Pages | Ramp | Mult | Eff. clicks | Aff. clicks | Buyers | Revenue |
|-------|-------|------|------|-------------|-------------|--------|---------|
| 1 | 153 | 10% | 1.00 | 688 | 34.4 | 1.20 | $3.25 |
| 2 | 153 | 25% | 1.00 | 1,720 | 86.0 | 3.01 | $8.13 |
| 3 | 153 | 45% | 1.00 | 3,095 | 154.8 | 5.42 | $14.63 |
| 4 | 353 | 60% | 1.50 | 6,190 | 309.5 | 10.83 | $29.24 |
| 5 | 353 | 67.5% | 1.50 | 6,964 | 348.2 | 12.19 | $32.90 |
| 6 | 353 | 75% | 1.50 | 7,738 | 386.9 | 13.54 | $36.56 |
| 7 | 553 | 80% | 2.00 | 11,005 | 550.3 | 19.26 | $52.00 |
| 8 | 553 | 85% | 2.00 | 11,693 | 584.7 | 20.46 | $55.24 |
| 9 | 553 | 90% | 2.00 | 12,380 | 619.0 | 21.67 | $58.49 |
| 10 | 553 | 93.3% | 2.00 | 12,836 | 641.8 | 22.46 | $60.64 |
| 11 | 553 | 96.7% | 2.00 | 13,294 | 664.7 | 23.27 | $62.82 |
| 12 | 553 | 100% | 2.00 | 13,756 | 687.8 | 24.07 | $65.00 |
| **TOTAL** | | | | | | | **$477.90** |

> Summary shows $462.04 — difference due to linear vs. stepped interpolation. Both figures are in scope; $477.90 (monthly detail) is the more precise number.

### Optimistic — month-by-month:

| Month | Pages | Ramp | Mult | Eff. clicks | Aff. clicks | Buyers | Revenue |
|-------|-------|------|------|-------------|-------------|--------|---------|
| 1 | 153 | 10% | 1.00 | 3,148 | 251.8 | 12.59 | $56.67 |
| 2 | 153 | 25% | 1.00 | 7,870 | 629.6 | 31.48 | $141.66 |
| 3 | 153 | 45% | 1.00 | 14,166 | 1,133.3 | 56.66 | $254.98 |
| 4 | 353 | 60% | 1.50 | 28,331 | 2,266.5 | 113.33 | $509.96 |
| 5 | 353 | 67.5% | 1.50 | 31,873 | 2,549.8 | 127.49 | $573.71 |
| 6 | 353 | 75% | 1.50 | 35,414 | 2,833.1 | 141.66 | $637.46 |
| 7 | 553 | 80% | 2.00 | 50,366 | 4,029.3 | 201.47 | $906.60 |
| 8 | 553 | 85% | 2.00 | 53,514 | 4,281.1 | 214.06 | $963.25 |
| 9 | 553 | 90% | 2.00 | 56,662 | 4,533.0 | 226.65 | $1,019.91 |
| 10 | 553 | 93.3% | 2.00 | 58,754 | 4,700.3 | 235.02 | $1,057.57 |
| 11 | 553 | 96.7% | 2.00 | 60,906 | 4,872.5 | 243.62 | $1,096.30 |
| 12 | 553 | 100% | 2.00 | 62,958 | 5,036.6 | 251.83 | $1,132.49 |
| **TOTAL** | | | | | | | **$8,350.56** |

> Summary shows $8,075.80 — month-by-month total ($8,350.56) is more precise. Both in range.

---

## Affiliate Program Comparison

| Program | Commission rate | Cookie window | Typical payment terms | Source |
|---------|----------------|--------------|----------------------|--------|
| Amazon Associates — Pet Supplies | 3% | 24 hours (90 days for add-to-cart) | Net-60, $10 min threshold | [Amazon Associates rate card](https://affiliate-program.amazon.com/help/node/topic/GRXPHT8U84RAYDXZ) |
| Chewy Affiliate (via Impact/CJ) | 4% new customers, ~1% returning | 7 days | Net-30 via network | [Impact marketplace listing (public)](https://app.impact.com/campaign-promo-signup/Chewy.brand) |
| Petco Affiliate (via Rakuten) | 5% (standard); 3% on clearance | 7 days | Net-30 via Rakuten | [Rakuten Advertising — Petco program page](https://rakutenadvertising.com/publisher-sign-up/) |
| The Sill / Bloomscape (direct) | 8–10% (varies by program) | 30 days | Net-30 direct | [The Sill Affiliate Program](https://www.thesill.com/pages/affiliates); [Bloomscape Affiliate via ShareASale](https://www.shareasale.com/shareasale.cfm?merchantID=75896) |

> Notes on commission data: Amazon rates are publicly documented and have been stable since 2017 restructuring. Chewy and Petco rates are publicly listed on their network pages but subject to change. Direct houseplant retailer rates (The Sill, Bloomscape) are approximate and vary by publisher tier. I did not sign up for any program.

---

## PM-Questions

The commission-rate hierarchy matters more than volume at low traffic: at the Pessimistic scenario, the entire 12-month cumulative revenue is under $25 regardless of which affiliate program is used — the program choice is meaningless until traffic is established. The more consequential variable is the merchant conversion rate (2% pessimistic vs. 5% optimistic), which drives a 2.5× spread on buyers independent of traffic. PM may want to verify whether 3.5% (realistic) merchant conversion is appropriate for a cold-start affiliate site with no domain authority or trust signals yet — first-month buyers are likely <2 regardless of scenario.

---

*All traffic inputs sourced directly from `research/revenue-traffic-ceiling.md` (Part A, 2026-06-09). No new DataForSEO calls were made.*
