import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/usr/local/bin/google-chrome", args: ["--no-sandbox", "--hide-scrollbars"] });
const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
await p.goto("http://localhost:4173/_brag/", { waitUntil: "networkidle0" });
await p.waitForFunction(() => window.isReady(), { timeout: 60000 });
await p.evaluate(async () => { await window.seek(2.72); document.getElementById("cursor").style.opacity = 0; document.getElementById("ripple").style.opacity = 0; });
await p.screenshot({ path: "poster.png" });
await b.close();
