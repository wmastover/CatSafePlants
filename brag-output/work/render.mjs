import puppeteer from "puppeteer-core";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";

// usage: node render.mjs stills 0.5 1.2 ...   |   node render.mjs video out.mp4
const [mode, ...rest] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  args: ["--no-sandbox", "--hide-scrollbars", "--font-render-hinting=none"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
page.on("console", (m) => console.log("[page]", m.text()));
page.on("pageerror", (e) => console.log("[pageerror]", e.message));
await page.goto("http://localhost:4173/_brag/", { waitUntil: "networkidle0" });
await page.waitForFunction(() => window.isReady && window.isReady(), { timeout: 60000 });

if (mode === "stills") {
  mkdirSync("stills", { recursive: true });
  for (const t of rest.map(Number)) {
    await page.evaluate((t) => window.seek(t), t);
    await page.screenshot({ path: `stills/t${t.toFixed(2)}.png` });
    console.log("still", t);
  }
} else {
  const out = rest[0] ?? "frames.mp4";
  const { DURATION, FPS } = await page.evaluate(() => ({ DURATION: window.DURATION, FPS: window.FPS }));
  const n = Math.round(DURATION * FPS);
  const ff = spawn("ffmpeg", ["-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", out], { stdio: ["pipe", "inherit", "inherit"] });
  for (let i = 0; i < n; i++) {
    await page.evaluate((t) => window.seek(t), i / FPS);
    const buf = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (i % 30 === 0) console.log(`frame ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
}
await browser.close();
