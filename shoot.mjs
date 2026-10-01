import puppeteer from 'puppeteer';
const url = process.argv[2] || 'http://localhost:3100';
const out = process.argv[3] || '/Users/jj/wazcher-redesign/shots/cur';
const w = +(process.argv[4] || 1440), hgt = +(process.argv[5] || 900);
const locale = process.argv[6]; // optional: en | zh-TW | zh-CN
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: w, height: hgt });
if (locale) await page.evaluateOnNewDocument(l => localStorage.setItem('wlang', l), locale);
await page.goto(url, { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2500));
const H = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < H && i < 20; y += hgt) {
  await page.evaluate(yy => window.scrollTo(0, yy), y);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: `${out}-${String(i).padStart(2,'0')}.png` });
  i++;
}
console.log('height', H, 'shots', i);
await browser.close();
