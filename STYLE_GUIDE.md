# catsafeplant.com — Style Guide

_Last updated: 2026-06-19_

## Typography

Three font families, loaded via next/font/google in repo/src/lib/fonts.ts.

| Family | CSS variable | Where to use |
|--------|--------------|--------------|
| Cormorant Garamond (serif) | --font-cormorant | Headings (h1, h2), all body prose (paragraphs, bulleted lists, ordered lists, pull quotes, blockquotes). The default "voice" of the page. |
| DM Sans (sans-serif) | --font-dm-sans | UI chrome only — nav, footer, button labels OUTSIDE the body column. NEVER used inside .col except for code siblings. |
| JetBrains Mono (mono) | --font-jetbrains-mono | Side cards (.side-card), hero alternatives lists (.hero-alts), H3 micro-headers in the body column, source citations, inline code, button glyph arrows, anything that should read as "metadata". |

## CSS rules (canonical)

- .col p, .col ul, .col ol, .col li — Cormorant Garamond, 21px, line-height 1.55, color #2d3a2a, max-width 62ch.
- .col h2 — Cormorant Garamond, 48px, weight 400.
- .col h3 — JetBrains Mono, 10.5px uppercase, letter-spacing 0.28em (the "label" style).
- .side-card * — JetBrains Mono.
- .hero-alts * — JetBrains Mono.

## Authoring rules

- Body bullets get Cormorant automatically via .col li. Don't add inline style overrides.
- For metadata-style lists (specs, references, side panels), use the .side-card component.
- Don't introduce new font-family declarations in component CSS without updating this file.

## How to verify

After any CSS change, screenshot the chamomile page and confirm body bullets match prose font (Cormorant serif). Side-card lists should still be JetBrains Mono.
