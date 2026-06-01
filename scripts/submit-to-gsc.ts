#!/usr/bin/env npx tsx
/**
 * Submit URLs to Google Search Console.
 *
 * Two modes:
 *   1. Sitemap submission — pings GSC with the public sitemap URL. No auth.
 *      `npm run submit-gsc -- --sitemap`
 *
 *   2. Indexing API URL submission — sends individual URL_UPDATED requests.
 *      Requires a Google Cloud service account with the
 *      "Owner" role for the site in Search Console and the Indexing API
 *      enabled. Put the JSON key in .env.local as a single line:
 *        GSC_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
 *
 *      `npm run submit-gsc -- --urls`              (submits all plant URLs)
 *      `npm run submit-gsc -- --url <path>`        (submits a single URL)
 *      `npm run submit-gsc -- --recent <N>`        (submits N most recently modified)
 *
 * Notes:
 *   - The Indexing API officially supports only JobPosting and BroadcastEvent
 *     URLs, but search consoles widely report it works for general URLs and
 *     gets URLs crawled faster than the sitemap alone.
 *   - This script is best-effort. Errors are logged but do not fail the build.
 *   - Vercel auto-deploys on push; run this script AFTER deploy completes.
 */

import fs from "fs";
import path from "path";
import https from "https";
import { getAllPlants } from "../src/lib/plants";
import { siteConfig } from "../src/lib/site.config";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

interface ServiceAccount {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

function getJWT(sa: ServiceAccount): string {
  // Minimal JWT for Google service account auth (RS256).
  const crypto = require("node:crypto");
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT" }),
  ).toString("base64url");
  const claim = Buffer.from(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: sa.token_uri ?? "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url");
  const signing = `${header}.${claim}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signing);
  const sig = signer.sign(sa.private_key).toString("base64url");
  return `${signing}.${sig}`;
}

async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const jwt = getJWT(sa);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: jwt,
  }).toString();
  const res = await fetch(
    sa.token_uri ?? "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  const json: { access_token: string } = await res.json();
  return json.access_token;
}

async function submitUrlToIndexing(url: string, accessToken: string) {
  const res = await fetch(
    "https://indexing.googleapis.com/v3/urlNotifications:publish",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    },
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`  ✗ ${url} — ${res.status} ${JSON.stringify(json)}`);
    return false;
  }
  console.log(`  ✓ ${url}`);
  return true;
}

function pingSitemap(): Promise<void> {
  return new Promise((resolve) => {
    const sitemapUrl = `${siteConfig.url}/sitemap.xml`;
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    console.log(`Pinging Google with sitemap: ${sitemapUrl}`);
    https
      .get(pingUrl, (res) => {
        console.log(`  ↳ HTTP ${res.statusCode}`);
        res.resume();
        resolve();
      })
      .on("error", (err) => {
        console.error(`  ✗ ${err.message}`);
        resolve();
      });
  });
}

async function main() {
  loadEnvLocal();
  const args = process.argv.slice(2);

  if (args.includes("--sitemap") || args.length === 0) {
    await pingSitemap();
    if (args.length === 0) {
      console.log("\nFor URL-level submission, also run:");
      console.log("  npm run submit-gsc -- --urls");
      console.log("  npm run submit-gsc -- --recent 10");
      console.log("  npm run submit-gsc -- --url /plants/spider-plant/");
      return;
    }
  }

  const wantsUrls = args.includes("--urls") || args.includes("--recent") || args.includes("--url");
  if (!wantsUrls) return;

  const saRaw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!saRaw) {
    console.error(
      "GSC_SERVICE_ACCOUNT_JSON is not set. Add the service-account JSON to .env.local.",
    );
    console.error("Sitemap ping completed; skipping per-URL Indexing API submission.");
    process.exit(0);
  }

  let sa: ServiceAccount;
  try {
    sa = JSON.parse(saRaw);
  } catch {
    console.error("GSC_SERVICE_ACCOUNT_JSON is not valid JSON. Aborting per-URL submission.");
    process.exit(1);
  }

  const token = await getAccessToken(sa);

  let urls: string[] = [];
  const singleIdx = args.indexOf("--url");
  if (singleIdx !== -1 && args[singleIdx + 1]) {
    urls = [`${siteConfig.url}${args[singleIdx + 1]}`];
  } else {
    const plants = getAllPlants();
    urls = plants.map((p) => `${siteConfig.url}/plants/${p.slug}/`);

    const recentIdx = args.indexOf("--recent");
    if (recentIdx !== -1) {
      const n = parseInt(args[recentIdx + 1] ?? "10", 10);
      const sorted = [...plants].sort((a, b) =>
        b.frontmatter.lastReviewed.localeCompare(a.frontmatter.lastReviewed),
      );
      urls = sorted.slice(0, n).map((p) => `${siteConfig.url}/plants/${p.slug}/`);
    }
  }

  console.log(`Submitting ${urls.length} URL(s) to the Indexing API...`);
  let ok = 0;
  for (const url of urls) {
    const success = await submitUrlToIndexing(url, token);
    if (success) ok++;
    // Tiny throttle to be friendly to the API.
    await new Promise((r) => setTimeout(r, 300));
  }
  console.log(`\nDone: ${ok}/${urls.length} URLs accepted by the Indexing API.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
