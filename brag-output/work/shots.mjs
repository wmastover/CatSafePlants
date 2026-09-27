import puppeteer from "puppeteer-core";

const pages = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
for (const p of pages) {
  const [path, scroll = "0"] = p.split("@");
  await page.goto(`http://localhost:4173${path}`, { waitUntil: "networkidle0" });
  await page.evaluate((y) => window.scrollTo(0, Number(y)), scroll);
  await new Promise((r) => setTimeout(r, 600));
  const name = (path.replace(/\W+/g, "_") || "home") + "_" + scroll;
  await page.screenshot({ path: `shots/${name}.png` });
  console.log(name);
}
await browser.close();
