import path from "path";

export const STYLE_REFERENCE_PATH = path.join(
  process.cwd(),
  "assets",
  "style-reference",
  "peace-lily-botanical.png",
);

/** OpenRouter model: Nano Banana 2 (Gemini 3.1 Flash Image Preview) */
export const NANO_BANANA_MODEL =
  process.env.OPENROUTER_IMAGE_MODEL ?? "google/gemini-3.1-flash-image-preview";

export const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export function buildPrompt(plantName: string, hasReferencePhoto: boolean): string {
  const lines = [
    "Look at the botanical drawing style image of a peace lily.",
    `Now make a similar style image for a ${plantName}.`,
  ];
  if (hasReferencePhoto) {
    lines.push("I've attached a photo of this plant for context.");
  } else {
    lines.push(
      "Draw the plant accurately from botanical knowledge — habit, leaves, and overall form.",
    );
  }
  lines.push("Include no text, just the drawing of the plant, on an off white background.");
  return lines.join(" ");
}

/** Wikimedia Commons search terms for reference photos (real-world context). */
export const REFERENCE_SEARCH: Record<string, string> = {
  "spider-plant": "Chlorophytum comosum plant",
  "peace-lily": "Spathiphyllum wallisii plant",
  "boston-fern": "Nephrolepis exaltata Boston fern",
  "prayer-plant": "Maranta leuconeura plant",
  "cast-iron-plant": "Aspidistra elatior plant",
};

export const HERO_OUTPUT_NAMES = ["hero.png", "hero.webp", "hero.jpg"] as const;
