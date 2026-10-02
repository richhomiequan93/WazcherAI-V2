// Extra checks: click-to-step in concept B, reduced-motion statics, A scale values.
import puppeteer from 'puppeteer';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
await page.evaluateOnNewDocument(() => localStorage.setItem('wlang', 'en'));
await page.goto('http://localhost:3100/concept-b', { waitUntil: 'networkidle2' });
const top = await page.evaluate(() => document.querySelector('.cb').getBoundingClientRect().top + scrollY);
await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), top + 10);
await sleep(600);
for (const i of [2, 1, 0]) {
  await page.evaluate((k) => document.querySelectorAll('.cb-word')[k].click(), i);
  await sleep(1800);
  const on = await page.evaluate(() => [...document.querySelectorAll('.cb-step')].findIndex((e) => e.classList.contains('on')));
  console.log('clicked', i, 'active', on);
}
await page.close();

const p2 = await browser.newPage();
await p2.setViewport({ width: 1440, height: 900 });
await p2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
await p2.goto('http://localhost:3100/concept-a', { waitUntil: 'networkidle2' });
const t2 = await p2.evaluate(() => document.querySelector('.ca-stack').getBoundingClientRect().top + scrollY);
for (let y = t2 - 900; y < t2 + 1000; y += 100) {
  await p2.evaluate((yy) => scrollTo({ top: yy, behavior: 'instant' }), y);
  await sleep(30);
}
await sleep(300);
console.log('A transforms', await p2.evaluate(() => [...document.querySelectorAll('.ca-card')].map((c) => c.style.transform + ' shade=' + c.querySelector('.ca-shade').style.opacity)));
await p2.close();

for (const c of ['a', 'b']) {
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.goto(`http://localhost:3100/concept-${c}`, { waitUntil: 'networkidle2' });
  await p.addStyleTag({ content: '.nav,.skip{display:none!important}' });
  const info = await p.evaluate(() => {
    const s = document.querySelector('#citora');
    const st = [...s.querySelectorAll('.ca-card,.cb-stage')].map((e) => getComputedStyle(e).position);
    const hidden = [...s.querySelectorAll('.cb-slot,.ask-val,.lane-rows > li')].filter((e) => getComputedStyle(e).opacity === '0' || getComputedStyle(e).visibility === 'hidden').length;
    return { h: s.offsetHeight, st, hidden };
  });
  console.log('reduced', c, JSON.stringify(info));
  const el = await p.$('#citora');
  await el.screenshot({ path: `/tmp/rm-${c}.png` });
  await p.close();
}
await browser.close();
