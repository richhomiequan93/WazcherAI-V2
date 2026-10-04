'use client';

import { useEffect, useRef } from 'react';

/*
 * The Citora night sky for the end of the page (closing section + footer). The canvas fills its
 * parent, stars twinkle softly and every so often a single shooting star crosses. It only animates
 * while on screen. Reduced motion draws one still frame.
 */

type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; layer: number; blue: boolean };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };


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
    let running = false;

    // deterministic-ish spread so a resize does not reshuffle the sky too much
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const build = () => {
      const box = cv.parentElement?.getBoundingClientRect();
      W = Math.max(1, Math.round(box?.width ?? window.innerWidth));
      H = Math.max(1, Math.round(box?.height ?? window.innerHeight));
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 7;
      const n = Math.round(Math.min(700, (W * H) / 3000));
      stars = Array.from({ length: n }, () => {
        const layer = rnd() < 0.6 ? 0 : rnd() < 0.7 ? 1 : 2;
        return {
          x: rnd() * W,
          y: Math.pow(rnd(), 1.25) * H, // a little denser near the top of the sky
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
      for (const s of stars) {
        const y = s.y;
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
    let visible = false;
    const sync = () => {
      running = visible && !document.hidden;
      if (running && !still && !raf) raf = requestAnimationFrame(loop);
    };
    const onVis = () => sync();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(cv);
    const ro = new ResizeObserver(() => onResize());
    if (cv.parentElement) ro.observe(cv.parentElement);

    build();
    draw(0);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="night-stars" aria-hidden="true" />;
}
