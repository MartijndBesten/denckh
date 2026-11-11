// Deelbeeld voor /ouderhulp/ (1200 × 630): titel in de huisletters, echt applicatiebeeld (fictieve gegevens) en de
// Denckh-signatuur. Gebruik: node scripts/ouderhulp-og.mjs  (vereist Playwright, zoals de e2e-test).
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = (p) => "file://" + path.join(root, "public", p);
const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>
@font-face { font-family: F; src: url(${url("fonts/fraunces-denckh.woff2")}) format("woff2"); font-weight: 400 700; }
@font-face { font-family: M; src: url(${url("fonts/manrope-denckh.woff2")}) format("woff2"); font-weight: 200 800; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: #f7f4ee; color: #211f1d; font-family: M; display: grid; grid-template-columns: 1fr 330px; gap: 56px; padding: 64px 72px 0 80px; overflow: hidden; }
.name { font-family: F; font-size: 44px; font-weight: 600; letter-spacing: -0.03em; } .name b { color: #2f5d50; font-weight: 600; }
h1 { font-family: F; font-weight: 560; font-size: 74px; line-height: 0.98; letter-spacing: -0.045em; margin-top: 34px; }
p { font-size: 26px; color: #6b655e; margin-top: 30px; line-height: 1.35; }
.by { position: absolute; left: 80px; bottom: 54px; display: flex; align-items: center; gap: 12px; font-size: 20px; color: #6b655e; }
.by img { height: 40px; }
.phone { align-self: start; border-radius: 34px; background: #211f1d; padding: 10px; margin-top: 4px; }
.phone img { display: block; width: 100%; border-radius: 26px; }
.line { position: absolute; left: 80px; top: 470px; width: 520px; height: 4px; background: #c29258; border-radius: 2px; }
</style></head><body>
<div><div class="name">Ouderhulp<b>.</b></div><h1>Ouderhulp organiseren, met overzicht voor iedereen.</h1></div>
<div class="phone"><img src="${url("images/ouderhulp/ouder-activiteit.webp")}" alt=""></div>
<div class="by">Een product van <img src="${url("brand/denckh-logo-signature.svg")}" alt=""></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const dir = mkdtempSync(path.join(tmpdir(), "oh-og-")); const file = path.join(dir, "og.html"); writeFileSync(file, html);
await page.goto("file://" + file, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, "public/images/ouderhulp/og-ouderhulp.png") });
await browser.close(); rmSync(dir, { recursive: true, force: true });
console.log("public/images/ouderhulp/og-ouderhulp.png");
