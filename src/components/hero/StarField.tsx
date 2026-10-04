'use client';

import { useEffect, useRef } from 'react';

/*
 * The Citora night sky, carried down the page under every section after the hero video.
 * Three depth layers drift with scroll at different speeds (parallax), stars twinkle softly,
 * and every so often a single shooting star crosses. Reduced motion draws one still frame.
 */

type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; layer: number; blue: boolean };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

const LAYERS = [0.06, 0.14, 0.26]; // scroll parallax per layer (fraction of scroll)

export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + 4000 + Math.random() * 5000;
    let raf = 0;
    let running = true;

    // deterministic-ish spread so a resize does not reshuffle the sky too much
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const build = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 7;
      const n = Math.round(Math.min(620, (W * H) / 2600));
      // the sky is taller than the viewport so parallax never runs out of stars
      const tall = H * 2.2;
      stars = Array.from({ length: n }, () => {
        const layer = rnd() < 0.6 ? 0 : rnd() < 0.7 ? 1 : 2;
        return {
          x: rnd() * W,
          y: rnd() * tall,
          r: [0.6, 0.95, 1.35][layer] * (0.7 + rnd() * 0.6),
          a: [0.5, 0.75, 0.95][layer] * (0.6 + rnd() * 0.4),
          tw: 0.4 + rnd() * 1.4,
          ph: rnd() * Math.PI * 2,
          layer,
          blue: rnd() < 0.18,
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const sy = window.scrollY;
      const tall = H * 2.2;
      for (const s of stars) {
        let y = (s.y - sy * LAYERS[s.layer]) % tall;
        if (y < 0) y += tall;
        if (y > H + 4) continue;
        const k = still ? 1 : 0.72 + 0.28 * Math.sin(t * 0.001 * s.tw + s.ph);
        ctx.globalAlpha = s.a * k;
        ctx.fillStyle = s.blue ? '#9fbcff' : '#f2f2f0';
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (meteor) {
        const m = meteor;
        const p = m.life / m.max;
        const fade = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8;
        const len = 90;
        const sp = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / sp) * len;
        const ty = m.y - (m.vy / sp) * len;
        const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, `rgba(230, 238, 255, ${0.85 * fade})`);
        g.addColorStop(1, 'rgba(230, 238, 255, 0)');
        ctx.globalAlpha = 1;
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      raf = 0;
      if (!running) return;
      if (!meteor && t > nextMeteor) {
        const fromLeft = Math.random() < 0.5;
        const speed = 9 + Math.random() * 4;
        meteor = {
          x: fromLeft ? W * (0.1 + Math.random() * 0.4) : W * (0.5 + Math.random() * 0.4),
          y: H * (0.05 + Math.random() * 0.35),
          vx: (fromLeft ? 1 : -1) * speed,
          vy: speed * 0.42,
          life: 0,
          max: 46,
        };
      }
      if (meteor) {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life += 1;
        if (meteor.life >= meteor.max) {
          meteor = null;
          nextMeteor = t + 7000 + Math.random() * 7000;
        }
      }
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      build();
      draw(performance.now());
    };
    const onScroll = () => {
      if (still) draw(0);
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !still && !raf) raf = requestAnimationFrame(loop);
    };

    build();
    if (still) draw(0);
    else raf = requestAnimationFrame(loop);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
