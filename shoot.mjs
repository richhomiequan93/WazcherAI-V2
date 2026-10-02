import puppeteer from 'puppeteer';
const url = process.argv[2] || 'http://localhost:3100';
const out = process.argv[3] || '/Users/jj/wazcher-redesign/shots/cur';
const w = +(process.argv[4] || 1440), hgt = +(process.argv[5] || 900);
const locale = process.argv[6]; // optional: en | zh-TW | zh-CN
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: w, height: hgt });
// Motion on, so the one-time reveal fades are exercised; scrolling below is slow enough for them to finish.
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
if (locale) await page.evaluateOnNewDocument(l => localStorage.setItem('wlang', l), locale);
await page.goto(url, { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2500));
const H = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
let cur = 0;
for (let y = 0; y < H && i < 24; y += hgt) {
  // walk to the next stop in small steps, like a reader scrolling
  while (cur < y) {
    cur = Math.min(y, cur + 150);
    await page.evaluate(yy => window.scrollTo(0, yy), cur);
    await new Promise(r => setTimeout(r, 60));
  }
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: `${out}-${String(i).padStart(2,'0')}.png` });
  i++;
}
console.log('height', H, 'shots', i);
await browser.close();
