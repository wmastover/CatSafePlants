# /brag plan — Cat Safe Plants (catsafeplant.com)

## The questions

- **What is it?** An illustrated field guide that tells you whether a houseplant is safe for your cat. Every verdict is sourced from the ASPCA.
- **Who is it for?** Cat owners standing in a plant shop (or staring at a gift bouquet) wondering if the cat will be fine.
- **What sets it apart?** It's beautiful where the competition is clinical: botanical plates, an editorial field-guide layout, one clear verdict per plant. Toxic plants come with safe lookalikes you can buy instead.
- **Most impressive / funniest claim:** "For the cat who *eats everything.*" Runner-up: spider plant is "actively dull, in the chemical sense, which is the kindest thing a leaf can be."
- **Visual hook:** The real landing headline at full scale over the cream grid, with the spider-plant plate wiping in beside it.
- **Real flow to show:** Type "lily" into the search. The library returns a wall of red TOXIC labels. Click Peace Lily to get the verdict "Toxic — do not bring home", then scroll to the three safe lookalikes with Buy buttons. For contrast, the Spider Plant page: "Safe — entirely non-toxic".
- **Tone:** `default`, leaning `polished`. Warm, calm and precise like the site's own voice, with one dry laugh.
- **Share caption:** "Is that plant safe for your cat? 182 illustrated entries, one ASPCA-sourced verdict each."

## Angle

The cat will eat it. This tells you whether that's fine.

## Visual identity (from the source)

- Paper `#f4efe2`, ink green `#2f4530`, sage `#6a7a55`, warn terracotta (`--warn`) for toxic.
- Cormorant Garamond for headlines and prose, JetBrains Mono for labels, DM Sans for UI chrome.
- Faint 12-column vertical grid lines; botanical plate illustrations.
- The real pages are rendered from `out/` (static export) in iframes at 1440×810 and scaled to 1920×1080. Every element is the site's real markup and CSS, animated per frame.

## Storyboard (22.0s, 1920×1080, 30fps, 120 BPM → cuts on beats)

| # | Time | Scene | What happens |
|---|------|-------|--------------|
| 1 | 0.0–3.5 | **Hook**: landing | "For the cat who" rises in word by word, then "*eats everything.*" slides in. The spider-plant plate wipes in top to bottom. The camera eases out from a tight headline crop. A cursor clicks the search box and types "lily". |
| 2 | 3.5–8.0 | **Reveal**: library | The real library opens: "Every plant, *one verdict.*" and "182 entries — each reviewed against ASPCA data". Nine lily cards stagger in, eight marked TOXIC. The page scrolls to row two. The cursor finds Peace Lily, hovers, and clicks. |
| 3 | 8.0–11.0 | **Highlight 1**: toxic verdict | Peace Lily page. The title settles and the verdict card stamps in: "Toxic — *do not bring home*". Slow push toward the card. |
| 4 | 11.0–14.5 | **Highlight 2**: safe swaps | The page scrolls to "Three plants that look the part, *without the risk.*" Prayer Plant, Cast-Iron Plant and Calathea cards rise in with their Buy on Amazon buttons. |
| 5 | 14.5–18.5 | **Highlight 3**: safe, and funny | Spider Plant page. The verdict card chimes in: "Safe — *entirely non-toxic*". A marker underlines "the kindest thing a leaf can be." The cursor hovers "Buy on Amazon" (£18). |
| 6 | 18.5–22.0 | **Outro** | Logo and the wordmark "cat *safe* plants", then "Every plant, one verdict." and "catsafeplant.com". Final chord rings out. |

## Sound

An original 120 BPM piece in D major (D – Bm – G – A), synthesized in `work/audio.py`. It opens with soft marimba-like plucks, adds a felt kick, shaker and round bass when the library opens, and ends on a sustained D chord. Effects are tuned to the key and mixed under the music:

- typing: muted wooden ticks
- card stagger: pentatonic plucks rising
- toxic verdict: low D felt thump plus a soft filtered swell
- safe verdict: A5 + D6 chime
- transitions: gentle filtered-noise air swells
