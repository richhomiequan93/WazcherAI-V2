// Beats concept shots: node beats-shots.mjs  (run from the repo)
import puppeteer from 'puppeteer';
const BASE = 'http://localhost:3100';
const OUT = '/Users/jj/wazcher-redesign/shots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const only = process.argv[2]; // optional: a | b | console

const browser = await puppeteer.launch({ headless: true });

async function open(path, locale, w, h, motion = 'no-preference') {
  const page = await browser.newPage();
  const msgs = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warn' || m.type() === 'warning') msgs.push(`${m.type()}: ${m.text()}`);
  });
  page.on('pageerror', (e) => msgs.push(`pageerror: ${e.message}`));
  await page.setViewport({ width: w, height: h });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: motion }]);
  await page.evaluateOnNewDocument((l) => localStorage.setItem('wlang', l), locale);
  await page.goto(BASE + path, { waitUntil: 'networkidle2' });
  await sleep(1200);
  return { page, msgs };
}

async function walkTo(page, y) {
  let cur = await page.evaluate(() => window.scrollY);
  while (Math.abs(cur - y) > 1) {
    cur = cur < y ? Math.min(y, cur + 120) : Math.max(y, cur - 120);
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), cur);
    await sleep(40);
  }
}

async function frames(c, locale, count, prefix) {
  const { page, msgs } = await open(`/concept-${c}`, locale, 1440, 900);
  const sel = c === 'a' ? '.ca-stack' : '.cb';
  const r = await page.evaluate((s) => {
    const el = document.querySelector(s);
    const b = el.getBoundingClientRect();
    return { top: b.top + window.scrollY, h: b.height, vh: window.innerHeight };
  }, sel);
  // A: stack entering, card 2 half over card 1, card 2 settled, card 3 half over, end of stack.
  // B: stage entering (not yet pinned), then the middle of each beat, then the stage releasing.
  const z = r.top + r.h - r.vh;
  const ys =
    count === 1
      ? [r.top + (z - r.top) * 0.5]
      : c === 'a'
        ? [r.top - r.vh * 0.35, r.top + r.vh * 0.45, r.top + r.vh * 0.95, r.top + r.vh * 1.4, z]
        : [r.top - r.vh * 0.3, r.top + (z - r.top) * 0.15, r.top + (z - r.top) * 0.5, r.top + (z - r.top) * 0.85, z + r.vh * 0.3];
  for (let i = 0; i < ys.length; i++) {
    await walkTo(page, Math.round(ys[i]));
    await sleep(1600);
    await page.screenshot({ path: `${OUT}/${prefix}${count === 1 ? '' : '-' + (i + 1)}.png` });
  }
  await page.close();
  return msgs;
}

async function mobile(c) {
  const { page } = await open(`/concept-${c}`, 'en', 390, 844);
  const top = await page.evaluate(() => document.querySelector('#citora').getBoundingClientRect().top + window.scrollY);
  const h = await page.evaluate(() => document.querySelector('#citora').offsetHeight);
  // walk through the section so the reveals fire, then capture the whole section
  await page.addStyleTag({ content: '.nav,.skip{display:none!important}' });
  for (let y = top - 400; y < top + h; y += 300) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
    await sleep(120);
  }
  await sleep(900);
  const el = await page.$('#citora');
  await el.screenshot({ path: `${OUT}/c${c}-m.png` });
  await page.close();
}

if (only === 'console' || !only) {
  for (const c of ['a', 'b']) {
    for (const l of ['en', 'zh-TW', 'zh-CN']) {
      for (const motion of ['no-preference', 'reduce']) {
        const { page, msgs } = await open(`/concept-${c}`, l, 1440, 900, motion);
        const H = await page.evaluate(() => document.body.scrollHeight);
        for (let y = 0; y < H; y += 450) {
          await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
          await sleep(30);
        }
        await sleep(500);
        const lang = await page.evaluate(() => document.documentElement.lang);
        console.log(`concept-${c} ${l} ${motion}: lang=${lang} issues=${msgs.length}`);
        for (const m of msgs) console.log('   ', m.slice(0, 300));
        await page.close();
      }
    }
  }
}
for (const c of ['a', 'b']) {
  if (only && only !== c) continue;
  const m = await frames(c, 'en', 5, `c${c}`);
  if (m.length) console.log(c, m);
  await frames(c, 'zh-TW', 1, `c${c}-zhtw`);
  await mobile(c);
  console.log('shots', c);
}
await browser.close();
