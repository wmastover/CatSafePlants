import fs from "fs";
import path from "path";
import {
  buildInteriorPrompt,
  buildPrompt,
  buildCultivarPrompt,
  cultivarSlug,
  NANO_BANANA_MODEL,
  OPENROUTER_API_URL,
  REFERENCE_SEARCH,
  STYLE_REFERENCE_PATH,
} from "./image-gen-config";

type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

interface OpenRouterImage {
  type?: string;
  image_url?: { url?: string };
}

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
      images?: OpenRouterImage[];
    };
  }>;
  error?: { message?: string };
}

const FETCH_HEADERS = { "User-Agent": "CatSafePlants/1.0 (botanical image pipeline)" };

function readAsDataUrl(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime =
    ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function writeDataUrl(dataUrl: string, outPath: string): void {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error("Invalid image data URL from API");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, Buffer.from(match[2], "base64"));
}

async function downloadToCache(url: string, cachePath: string): Promise<string> {
  const photoRes = await fetch(url, { headers: FETCH_HEADERS });
  if (!photoRes.ok) throw new Error(`Failed to download reference photo: ${photoRes.status}`);
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, Buffer.from(await photoRes.arrayBuffer()));
  return cachePath;
}

async function searchCommons(searchTerm: string): Promise<string | null> {
  const searchUrl = new URL("https://commons.wikimedia.org/w/api.php");
  searchUrl.searchParams.set("action", "query");
  searchUrl.searchParams.set("format", "json");
  searchUrl.searchParams.set("generator", "search");
  searchUrl.searchParams.set("gsrsearch", searchTerm);
  searchUrl.searchParams.set("gsrnamespace", "6");
  searchUrl.searchParams.set("gsrlimit", "10");
  searchUrl.searchParams.set("prop", "imageinfo");
  searchUrl.searchParams.set("iiprop", "url");
  searchUrl.searchParams.set("iiurlwidth", "1200");

  const res = await fetch(searchUrl, { headers: FETCH_HEADERS });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    query?: {
      pages?: Record<
        string,
        { title?: string; imageinfo?: Array<{ thumburl?: string; url?: string }> }
      >;
    };
  };

  const candidates = Object.values(data.query?.pages ?? {})
    .flatMap((p) => p.imageinfo ?? [])
    .map((info) => info.thumburl ?? info.url)
    .filter((url): url is string => !!url && !/\.(svg|gif)$/i.test(url));

  return candidates[0] ?? null;
}

async function searchWikipedia(searchTerm: string): Promise<string | null> {
  const apiUrl = new URL("https://en.wikipedia.org/w/api.php");
  apiUrl.searchParams.set("action", "query");
  apiUrl.searchParams.set("format", "json");
  apiUrl.searchParams.set("generator", "search");
  apiUrl.searchParams.set("gsrsearch", searchTerm);
  apiUrl.searchParams.set("gsrlimit", "3");
  apiUrl.searchParams.set("prop", "pageimages");
  apiUrl.searchParams.set("piprop", "thumbnail");
  apiUrl.searchParams.set("pithumbsize", "1200");

  const res = await fetch(apiUrl, { headers: FETCH_HEADERS });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    query?: {
      pages?: Record<string, { thumbnail?: { source?: string } }>;
    };
  };

  for (const page of Object.values(data.query?.pages ?? {})) {
    if (page.thumbnail?.source) return page.thumbnail.source;
  }
  return null;
}

/** Returns local path to reference photo, or null if none found (non-fatal). */
export async function fetchReferencePhoto(
  slug: string,
  plantName: string,
  cachePath: string,
): Promise<string | null> {
  if (fs.existsSync(cachePath)) {
    return cachePath;
  }

  const base = REFERENCE_SEARCH[slug] ?? plantName;
  const queries = [
    base,
    `${base} filetype:bitmap`,
    plantName,
    slug.replace(/-/g, " "),
  ];

  for (const q of queries) {
    const commonsUrl = await searchCommons(q);
    if (commonsUrl) {
      try {
        return await downloadToCache(commonsUrl, cachePath);
      } catch {
        /* try next */
      }
    }
  }

  for (const q of queries) {
    const wikiUrl = await searchWikipedia(q);
    if (wikiUrl) {
      try {
        return await downloadToCache(wikiUrl, cachePath);
      } catch {
        /* try next */
      }
    }
  }

  return null;
}

function extractGeneratedImageUrl(response: OpenRouterResponse): string {
  const message = response.choices?.[0]?.message;
  if (!message) throw new Error("No message in OpenRouter response");

  const fromImages = message.images?.[0]?.image_url?.url;
  if (fromImages) return fromImages;

  if (typeof message.content === "string") {
    const match = message.content.match(/data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+/);
    if (match) return match[0];
  }

  throw new Error(
    response.error?.message ??
      "No image returned. Check OPENROUTER_API_KEY and model access.",
  );
}

export interface GeneratePlantImageOptions {
  slug: string;
  plantName: string;
  cultivarName?: string;
  cultivarSubtitle?: string;
  referencePhotoPath?: string;
  outputPath?: string;
  /** Called when reference photo could not be fetched (generation still proceeds). */
  onReferenceMissing?: (message: string) => void;
}

export interface GeneratePlantImageResult {
  outputPath: string;
  usedReferencePhoto: boolean;
}

export async function generatePlantImage({
  slug,
  plantName,
  cultivarName,
  cultivarSubtitle,
  referencePhotoPath,
  outputPath,
  onReferenceMissing,
}: GeneratePlantImageOptions): Promise<GeneratePlantImageResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set. Add it to .env.local (see .env.example).",
    );
  }

  if (!fs.existsSync(STYLE_REFERENCE_PATH)) {
    throw new Error(
      `Style reference missing at ${STYLE_REFERENCE_PATH}. Copy peace-lily-botanical.png there.`,
    );
  }

  const refCache = path.join(
    process.cwd(),
    "assets",
    "reference-photos",
    cultivarName
      ? `${slug}-${cultivarSlug(cultivarName)}-reference.jpg`
      : `${slug}-reference.jpg`,
  );

  let referencePath: string | null = referencePhotoPath ?? null;
  if (!referencePath) {
    const searchName = cultivarName
      ? `${plantName} ${cultivarName}${cultivarSubtitle ? ` ${cultivarSubtitle}` : ""}`
      : plantName;
    referencePath = await fetchReferencePhoto(slug, searchName, refCache);
  }

  if (!referencePath && cultivarName) {
    const parentRef = path.join(
      process.cwd(),
      "assets",
      "reference-photos",
      `${slug}-reference.jpg`,
    );
    const parentHero = path.join(
      process.cwd(),
      "public",
      "images",
      "plants",
      slug,
      "hero.png",
    );
    if (fs.existsSync(parentRef)) referencePath = parentRef;
    else if (fs.existsSync(parentHero)) referencePath = parentHero;
  }

  const usedReferencePhoto = !!referencePath;
  if (!usedReferencePhoto) {
    const label = cultivarName ? `${plantName} (${cultivarName})` : plantName;
    const msg = `No reference photo found for "${label}" — generating from style reference only.`;
    onReferenceMissing?.(msg);
  }

  const out =
    outputPath ??
    (cultivarName
      ? path.join(
          process.cwd(),
          "public",
          "images",
          "plants",
          slug,
          `${cultivarSlug(cultivarName)}.png`,
        )
      : path.join(process.cwd(), "public", "images", "plants", slug, "hero.png"));

  const content: ContentPart[] = [
    {
      type: "image_url",
      image_url: { url: readAsDataUrl(STYLE_REFERENCE_PATH) },
    },
  ];

  if (referencePath) {
    content.push({
      type: "image_url",
      image_url: { url: readAsDataUrl(referencePath) },
    });
  }

  content.push({
    type: "text",
    text: cultivarName
      ? buildCultivarPrompt(plantName, cultivarName, cultivarSubtitle, usedReferencePhoto)
      : buildPrompt(plantName, usedReferencePhoto),
  });

  const body = {
    model: NANO_BANANA_MODEL,
    messages: [{ role: "user", content }],
    modalities: ["image", "text"],
    image_config: {
      aspect_ratio: "4:5",
      image_size: "1K",
    },
  };

  const res = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://catsafeplant.com",
      "X-Title": "CatSafePlants Image Generator",
    },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as OpenRouterResponse;
  if (!res.ok) {
    throw new Error(json.error?.message ?? `OpenRouter error ${res.status}`);
  }

  const imageDataUrl = extractGeneratedImageUrl(json);
  writeDataUrl(imageDataUrl, out);
  return { outputPath: out, usedReferencePhoto };
}

function resolveReferenceForInterior(
  slug: string,
  referencePhotoPath?: string,
): string | null {
  if (referencePhotoPath && fs.existsSync(referencePhotoPath)) {
    return referencePhotoPath;
  }

  const refCache = path.join(
    process.cwd(),
    "assets",
    "reference-photos",
    `${slug}-reference.jpg`,
  );
  if (fs.existsSync(refCache)) return refCache;

  const heroPath = path.join(
    process.cwd(),
    "public",
    "images",
    "plants",
    slug,
    "hero.png",
  );
  if (fs.existsSync(heroPath)) return heroPath;

  return null;
}

export async function generateInteriorPhoto({
  slug,
  plantName,
  referencePhotoPath,
  outputPath,
  onReferenceMissing,
}: Omit<GeneratePlantImageOptions, "cultivarName" | "cultivarSubtitle">): Promise<GeneratePlantImageResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set. Add it to .env.local (see .env.example).",
    );
  }

  const refCache = path.join(
    process.cwd(),
    "assets",
    "reference-photos",
    `${slug}-reference.jpg`,
  );

  let referencePath = resolveReferenceForInterior(slug, referencePhotoPath);
  if (!referencePath) {
    referencePath = await fetchReferencePhoto(slug, plantName, refCache);
  }

  const usedReferencePhoto = !!referencePath;
  if (!usedReferencePhoto) {
    onReferenceMissing?.(
      `No reference photo found for "${plantName}" — generating interior shot from prompt only.`,
    );
  }

  const out =
    outputPath ??
    path.join(
      process.cwd(),
      "public",
      "images",
      "plants",
      slug,
      "hero-interior.png",
    );

  const content: ContentPart[] = [];

  if (referencePath) {
    content.push({
      type: "image_url",
      image_url: { url: readAsDataUrl(referencePath) },
    });
  }

  content.push({
    type: "text",
    text: buildInteriorPrompt(plantName, usedReferencePhoto),
  });

  const body = {
    model: NANO_BANANA_MODEL,
    messages: [{ role: "user", content }],
    modalities: ["image", "text"],
    image_config: {
      aspect_ratio: "4:5",
      image_size: "1K",
    },
  };

  const res = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://catsafeplant.com",
      "X-Title": "CatSafePlants Interior Image Generator",
    },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as OpenRouterResponse;
  if (!res.ok) {
    throw new Error(json.error?.message ?? `OpenRouter error ${res.status}`);
  }

  const imageDataUrl = extractGeneratedImageUrl(json);
  writeDataUrl(imageDataUrl, out);
  return { outputPath: out, usedReferencePhoto };
}
