// Hero concept screenshots: node shoot-hero.mjs <url> <out.png> <w> <h> [locale] [delayMs] [secondOut] [gapMs] [reduced]
import puppeteer from 'puppeteer';
const [url, out, w = '1440', h = '900', locale = '', delay = '2600', out2 = '', gap = '1500', reduced = ''] = process.argv.slice(2);
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 2 });
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }]);
if (locale) await page.evaluateOnNewDocument((l) => localStorage.setItem('wlang', l), locale);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await page.goto(url, { waitUntil: 'networkidle2' });
await page.mouse.move(+w * 0.92, +h * 0.25);
await new Promise((r) => setTimeout(r, +delay));
await page.screenshot({ path: out });
if (out2) {
  await new Promise((r) => setTimeout(r, +gap));
  await page.screenshot({ path: out2 });
}
// Frame time sample over 2 s.
const fps = await page.evaluate(
  () =>
    new Promise((res) => {
      let n = 0;
      const t0 = performance.now();
      const f = () => {
        n++;
        if (performance.now() - t0 < 2000) requestAnimationFrame(f);
        else res(n / ((performance.now() - t0) / 1000));
      };
      requestAnimationFrame(f);
    }),
);
console.log(out, 'fps~', Math.round(fps), errors.length ? 'ERRORS: ' + errors.join(' | ') : 'no errors');
await browser.close();
