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

export function cultivarSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildCultivarPrompt(
  plantName: string,
  cultivarName: string,
  subtitle: string | undefined,
  hasReferencePhoto: boolean,
): string {
  const varietyLabel = subtitle
    ? `${plantName}, ${cultivarName} variety (${subtitle})`
    : `${plantName}, ${cultivarName} cultivar`;
  const lines = [
    "Look at the botanical drawing style image of a peace lily.",
    `Now make a similar style botanical illustration for ${varietyLabel}.`,
    "Show the distinctive features of this specific cultivar clearly.",
  ];
  if (hasReferencePhoto) {
    lines.push("I've attached a reference photo of this plant or cultivar for context.");
  } else {
    lines.push(
      "Draw the cultivar accurately from botanical knowledge — habit, leaves, and overall form.",
    );
  }
  lines.push("Include no text, just the drawing of the plant, on an off white background.");
  return lines.join(" ");
}

export function cultivarImagePath(slug: string, cultivarName: string): string {
  return `/images/plants/${slug}/${cultivarSlug(cultivarName)}.png`;
}

/** Wikimedia Commons search terms for reference photos (real-world context). */
export const REFERENCE_SEARCH: Record<string, string> = {
  "spider-plant": "Chlorophytum comosum plant",
  "peace-lily": "Spathiphyllum wallisii plant",
  "boston-fern": "Nephrolepis exaltata Boston fern",
  "prayer-plant": "Maranta leuconeura plant",
  "cast-iron-plant": "Aspidistra elatior plant",
  haworthia: "Haworthia attenuata plant",
  "parlor-palm": "Chamaedorea elegans plant",
  "wax-plant": "Hoya carnosa plant",
  "swedish-ivy": "Plectranthus verticillatus plant",
  "african-violet": "Saintpaulia ionantha plant",
};

export const HERO_OUTPUT_NAMES = ["hero.png", "hero.webp", "hero.jpg"] as const;
export const INTERIOR_OUTPUT_NAMES = [
  "hero-interior.png",
  "hero-interior.webp",
  "hero-interior.jpg",
] as const;

export function buildInteriorPrompt(
  plantName: string,
  hasReferencePhoto: boolean,
): string {
  const base = `A portrait, photorealistic, aesthetic interior photography shot of a ${plantName} potted in a stylish woven basket or terracotta pot, sitting on a warm wooden table. Soft, warm golden hour sunlight streams through a nearby window with sheer white curtains on the left, illuminating the plant with rays of light. The sunlight casts delicate, distinct leaf shadows on the smooth, plain beige wall behind it. Cozy Japandi interior design, warm cinematic lighting, serene and calming atmosphere, highly detailed, 8k resolution.`;
  if (hasReferencePhoto) {
    return `${base}\n\nI've attached a reference photo of this plant — match its species, leaf shape, flower colour, and overall habit accurately.`;
  }
  return base;
}
