'use client';

import { useEffect, useRef } from 'react';
import { EYE, createStage, lid, rng, type Frame } from './stage';

/**
 * Concept B: the Wazcher eye as a hairline instrument.
 * Engraved lid contours, a lens bezel with ticks, concentric iris rings and the
 * play-mark pupil, all in fine strokes. A slow green sweep circles the iris.
 * Fragments of AI answers and cited domains drift in from the edges and fade as
 * they reach the iris, each one leaving a short green mark on the ring.
 * Ring layers shift with the pointer at different depths.
 */

type Props = { fragments: string[]; hud: string };

type Frag = {
  text: string;
  ang: number;
  born: number;
  life: number;
  r0: number;
  w: number;
};

type Blip = { ang: number; born: number };

const G = '56,215,24';
const W = '236,238,242';
const SWEEP_PERIOD = 7.5;

function lidPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, c: { e: number; a: number; p: number }, sign: number) {
  const steps = 96;
  for (let i = 0; i <= steps; i++) {
    const x = -1 + (2 * i) / steps;
    const y = -lid(x, c) * sign;
    if (i === 0) ctx.moveTo(cx + x * r, cy + y * r);
    else ctx.lineTo(cx + x * r, cy + y * r);
  }
}

function aperturePath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const steps = 96;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = -1 + (2 * i) / steps;
    const y = -lid(x, EYE.inner);
    if (i === 0) ctx.moveTo(cx + x * r, cy + y * r);
    else ctx.lineTo(cx + x * r, cy + y * r);
  }
  for (let i = steps; i >= 0; i--) {
    const x = -1 + (2 * i) / steps;
    ctx.lineTo(cx + x * r, cy + lid(x, EYE.inner) * r);
  }
  ctx.closePath();
}

export default function EyeScan({ fragments, hud }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef({ fragments, hud });

  useEffect(() => {
    textRef.current = { fragments, hud };
  }, [fragments, hud]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.querySelector<HTMLElement>('[data-eye-host]');
    if (!canvas || !host) return;

    const R = rng(7);
    let frags: Frag[] = [];
    let blips: Blip[] = [];
    let nextSpawn = 1.6;
    let seeded = false;
    let cursor = 0;
    let lastLocale = '';
    let monoFamily = 'ui-monospace, monospace';

    const fontFor = (f: Frame) => `400 ${f.compact ? 10 : 11}px ${monoFamily}`;

    /** Pick an approach angle whose start position keeps the label inside the visual column and clear of others. */
    const pickAngle = (f: Frame, w: number, r0: number) => {
      const lead = 24;
      for (let tries = 0; tries < 24; tries++) {
        const a = R() * Math.PI * 2;
        const ca = Math.cos(a);
        const sa = Math.sin(a);
        if (Math.abs(sa) < 0.14) continue; // corners belong to the lids
        const ax = f.cx + ca * r0 * f.r;
        const ay = f.cy + sa * r0 * f.r * 0.78;
        const x0 = ca >= 0 ? ax : ax - lead - w;
        const x1 = ca >= 0 ? ax + lead + w : ax;
        const minX = f.compact ? 8 : f.hx - 8;
        if (x0 < minX || x1 > f.w - 8) continue;
        if (ay < 64 || ay > f.h - 16) continue;
        // Keep clear of the caption line under the eye.
        const capY = f.cy + (EYE.outer.e + EYE.outer.a) * f.r + (f.compact ? 26 : 34);
        if (ay > capY - 22 && x1 > f.cx - 150 && x0 < f.cx + 150) continue;
        if (ay > capY + 8) continue;
        if (frags.every((q) => Math.abs(Math.atan2(Math.sin(q.ang - a), Math.cos(q.ang - a))) > 0.6)) return a;
      }
      return null;
    };

    const spawn = (f: Frame, born: number) => {
      const { fragments: list } = textRef.current;
      if (!list.length) return;
      const text = list[cursor++ % list.length];
      f.ctx.font = fontFor(f);
      const w = f.ctx.measureText(text).width;
      const r0 = 1.12 + R() * 0.3;
      const ang = pickAngle(f, w, r0);
      if (ang === null) return;
      frags.push({ text, ang, born, life: 9 + R() * 4, r0, w });
    };

    const setup = (f: Frame) => {
      const v = getComputedStyle(document.body).getPropertyValue('--font-mono').trim();
      if (v) monoFamily = `${v}, ui-monospace, monospace`;
      const loc = document.documentElement.lang;
      if (loc !== lastLocale) {
        lastLocale = loc;
        frags = [];
        blips = [];
        cursor = 0;
        seeded = false;
      }
      if (f.reduced) {
        // A composed still: four fragments mid-flight and two marks on the ring.
        const list = textRef.current.fragments;
        f.ctx.font = fontFor(f);
        const angs = f.compact ? [-2.3, 0.75, 2.4, -0.75] : [-1.05, 0.7, 2.2, -2.15];
        const us = [0.3, 0.5, 0.4, 0.62];
        frags = angs.map((ang, i) => {
          const text = list[i % Math.max(1, list.length)] ?? '';
          return { text, ang, born: -us[i] * 10, life: 10, r0: 1.25, w: f.ctx.measureText(text).width };
        });
        blips = [
          { ang: -1.6, born: -0.6 },
          { ang: 0.4, born: -1.4 },
        ];
      }
    };

    const draw = (f: Frame) => {
      const { ctx, cx, cy, r, t, compact, reduced } = f;
      const now = reduced ? 0 : t;
      const sh = (d: number): [number, number] => [cx + f.px * d * 9, cy + f.py * d * 6];

      const sweepAng = reduced ? -0.7 : (now / SWEEP_PERIOD) * Math.PI * 2 - Math.PI / 2;

      // Rotate locale-specific fragments when the language changes at runtime.
      if (document.documentElement.lang !== lastLocale) setup(f);

      // ---------- layer 1: engraved lids (deepest) ----------
      {
        const [x, y] = sh(0.35);
        ctx.lineWidth = 1;
        for (const sign of [1, -1]) {
          // Contours between inner and outer lid curves, brightest at the outer rim.
          const n = compact ? 5 : 7;
          for (let i = 0; i <= n; i++) {
            const u = i / n;
            const c = {
              e: EYE.inner.e + (EYE.outer.e - EYE.inner.e) * u,
              a: EYE.inner.a + (EYE.outer.a - EYE.inner.a) * u,
              p: 0.95,
            };
            const edge = i === 0 || i === n;
            ctx.strokeStyle = `rgba(${W},${edge ? (i === n ? 0.62 : 0.4) : 0.07 + 0.05 * u})`;
            ctx.lineWidth = edge ? 1 : 0.75;
            ctx.beginPath();
            lidPath(ctx, x, y, r, c, sign);
            ctx.stroke();
          }
        }
        // Corner hairlines, like registration marks on a drawing.
        ctx.strokeStyle = `rgba(${W},0.16)`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        for (const s of [-1, 1]) {
          ctx.moveTo(x + s * r * 1.04, y);
          ctx.lineTo(x + s * r * 1.16, y);
        }
        ctx.stroke();
      }

      // ---------- layer 2: lens bezel inside the aperture ----------
      {
        const [x, y] = sh(0.7);
        ctx.save();
        aperturePath(ctx, x, y, r);
        ctx.clip();
        // Faint guide rings in the sclera.
        ctx.lineWidth = 0.75;
        for (const [rr, a] of [
          [0.56, 0.07],
          [0.72, 0.05],
          [0.88, 0.04],
        ] as const) {
          ctx.strokeStyle = `rgba(${W},${a})`;
          ctx.beginPath();
          ctx.arc(x, y, rr * r, 0, Math.PI * 2);
          ctx.stroke();
        }
        // Crosshair hairline through the centre.
        ctx.strokeStyle = `rgba(${W},0.07)`;
        ctx.beginPath();
        ctx.moveTo(x - r, y);
        ctx.lineTo(x - EYE.irisOuter * r * 1.12, y);
        ctx.moveTo(x + EYE.irisOuter * r * 1.12, y);
        ctx.lineTo(x + r, y);
        ctx.stroke();

        // Rotating tick bezel just outside the iris.
        const rot = now * 0.035;
        const ticks = 144;
        const r1 = EYE.irisOuter * 1.06 * r;
        ctx.beginPath();
        for (let i = 0; i < ticks; i++) {
          const a = rot + (i / ticks) * Math.PI * 2;
          const long = i % 12 === 0;
          const r2 = r1 + (long ? 0.05 : 0.022) * r;
          const ca = Math.cos(a);
          const sa = Math.sin(a);
          ctx.moveTo(x + ca * r1, y + sa * r1);
          ctx.lineTo(x + ca * r2, y + sa * r2);
        }
        ctx.strokeStyle = `rgba(${W},0.22)`;
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Green sweep across the iris and sclera, clipped to the aperture.
        const sweep = sweepAng;
        const [ix, iy] = sh(1);
        const tail = 1.05;
        const ctxAny = ctx as CanvasRenderingContext2D & {
          createConicGradient?: (a: number, x: number, y: number) => CanvasGradient;
        };
        if (ctxAny.createConicGradient) {
          const g = ctxAny.createConicGradient(sweep - tail, ix, iy);
          const k = tail / (Math.PI * 2);
          g.addColorStop(0, `rgba(${G},0)`);
          g.addColorStop(k * 0.7, `rgba(${G},0.035)`);
          g.addColorStop(k, `rgba(${G},0.11)`);
          g.addColorStop(Math.min(1, k + 0.0005), `rgba(${G},0)`);
          g.addColorStop(1, `rgba(${G},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(ix, iy, r * 1.05, 0, Math.PI * 2);
          ctx.arc(ix, iy, EYE.irisInner * r, 0, Math.PI * 2, true);
          ctx.fill('evenodd');
        }
        // Leading edge.
        const ca = Math.cos(sweep);
        const sa = Math.sin(sweep);
        const lg = ctx.createLinearGradient(ix + ca * EYE.irisInner * r, iy + sa * EYE.irisInner * r, ix + ca * r, iy + sa * r);
        lg.addColorStop(0, `rgba(${G},0.75)`);
        lg.addColorStop(0.45, `rgba(${G},0.35)`);
        lg.addColorStop(1, `rgba(${G},0)`);
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ix + ca * EYE.irisInner * r, iy + sa * EYE.irisInner * r);
        ctx.lineTo(ix + ca * r, iy + sa * r);
        ctx.stroke();
        ctx.restore();

        // ---------- layer 3: iris rings ----------
        ctx.lineWidth = 1;
        const rings: [number, number, number[] | null][] = [
          [EYE.irisOuter, 0.7, null],
          [EYE.irisOuter * 0.955, 0.18, null],
          [0.33, 0.14, [1.5, 3.5]],
          [0.285, 0.1, null],
          [0.235, 0.16, [0.75, 2.25]],
          [EYE.irisInner * 1.07, 0.12, null],
          [EYE.irisInner, 0.6, null],
        ];
        for (const [rr, a, dash] of rings) {
          ctx.strokeStyle = `rgba(${W},${a})`;
          ctx.setLineDash(dash ?? []);
          ctx.beginPath();
          ctx.arc(ix, iy, rr * r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.setLineDash([]);

        // Counter-rotating short arcs between the rings.
        const arcs: [number, number, number, number][] = [
          [0.31, 0.25, 0.9, 0.3],
          [0.31, 2.4, 0.5, 0.3],
          [0.31, 4.1, 1.2, 0.3],
          [0.26, 1.1, 0.7, 0.22],
          [0.26, 3.6, 1.4, 0.22],
        ];
        arcs.forEach(([rr, a0, len, a], i) => {
          const spin = now * (i < 3 ? 0.06 : -0.045);
          ctx.strokeStyle = `rgba(${W},${a})`;
          ctx.beginPath();
          ctx.arc(ix, iy, rr * r, a0 + spin, a0 + spin + len);
          ctx.stroke();
        });

        // Blips: where a fragment entered the iris, a short green arc that fades over 2.4 s.
        blips = blips.filter((b) => now - b.born < 2.4);
        ctx.lineWidth = 1.5;
        for (const b of blips) {
          const k = 1 - (now - b.born) / 2.4;
          ctx.strokeStyle = `rgba(${G},${0.85 * k * k})`;
          ctx.beginPath();
          ctx.arc(ix, iy, EYE.irisOuter * r, b.ang - 0.07, b.ang + 0.07);
          ctx.stroke();
        }
        ctx.lineWidth = 1;

        // ---------- layer 4: play-mark pupil (nearest) ----------
        const [px, py] = sh(1.25);
        const { x0, x1, h } = EYE.tri;
        ctx.beginPath();
        ctx.moveTo(px + x0 * r, py - h * r);
        ctx.lineTo(px + x1 * r, py);
        ctx.lineTo(px + x0 * r, py + h * r);
        ctx.closePath();
        ctx.fillStyle = `rgba(${G},0.08)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${G},0.9)`;
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // ---------- fragments ----------
      if (!reduced && !seeded) {
        // Start with a few already in flight so the first view is not empty.
        seeded = true;
        for (const age of compact ? [3.5, 6.5] : [2.5, 5, 7.5]) spawn(f, now - age);
      }
      if (!reduced) {
        const max = compact ? 3 : 5;
        if (now >= nextSpawn) {
          if (frags.length < max) spawn(f, now);
          nextSpawn = now + (compact ? 3.2 : 2.1) + R() * 1.2;
        }
      }
      ctx.font = fontFor(f);
      ctx.textBaseline = 'middle';
      const [ix, iy] = sh(1);
      const keep: Frag[] = [];
      for (const q of frags) {
        const u = Math.min(1, Math.max(0, (now - q.born) / q.life));
        // Ease in: slow drift at the edge, drawn in faster near the eye.
        const e = u * u * (1.6 - 0.6 * u);
        const ca = Math.cos(q.ang);
        const sa = Math.sin(q.ang);
        // Radius in eye units, on a flattened path so fragments hug the lens shape.
        const flat = 0.78;
        const rr = q.r0 + (EYE.irisOuter - q.r0) * e;
        const ax = ix + ca * rr * r;
        const ay = iy + sa * rr * r * flat;
        if (u >= 1) {
          blips.push({ ang: Math.atan2(sa * flat, ca), born: now });
          continue;
        }
        keep.push(q);
        const fadeIn = Math.min(1, (now - q.born) / 1.2);
        // Fades between the lid line and the iris ring.
        const fadeOut = Math.min(1, Math.max(0, (rr - EYE.irisOuter) / 0.42));
        const a = fadeIn * fadeOut;
        if (a <= 0.01) continue;
        // Leader hairline toward the iris, text sits on the far side.
        const right = ca >= 0;
        const lead = 18;
        ctx.strokeStyle = `rgba(${W},${0.28 * a})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + (right ? lead : -lead), ay);
        ctx.stroke();
        // When the sweep passes a fragment it is "read": the label lifts for a moment.
        const fa = Math.atan2(sa * flat, ca);
        const since = (((sweepAng - fa) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const lit = reduced ? 0 : Math.exp(-since * 2.2);
        ctx.fillStyle = `rgba(${G},${(0.55 + 0.45 * lit) * a})`;
        ctx.fillRect(ax - 1.5, ay - 1.5, 3, 3);
        ctx.fillStyle = `rgba(${W},${(0.6 + 0.35 * lit) * a})`;
        ctx.textAlign = right ? 'left' : 'right';
        ctx.fillText(q.text, ax + (right ? lead + 6 : -lead - 6), ay + 0.5);
      }
      frags = keep;

      // ---------- HUD caption under the eye ----------
      {
        const [x, y] = sh(0.35);
        const label = textRef.current.hud;
        const yy = y + (EYE.outer.e + EYE.outer.a) * r + (compact ? 26 : 34);
        ctx.font = `400 ${compact ? 9.5 : 10.5}px ${monoFamily}`;
        ctx.textAlign = 'center';
        const deg = reduced ? 312 : Math.floor((((now / SWEEP_PERIOD) * 360) % 360 + 360) % 360);
        const txt = `${label.toUpperCase()}   ${String(deg).padStart(3, '0')}°`;
        ctx.fillStyle = `rgba(${W},0.38)`;
        ctx.fillText(txt, x, yy);
        const tw = ctx.measureText(txt).width;
        ctx.fillStyle = `rgba(${G},0.9)`;
        ctx.fillRect(x - tw / 2 - 12, yy - 2, 4, 4);
      }
    };

    const stage = createStage({
      canvas,
      host,
      radius: (w, h, compact) => (compact ? Math.min(w * 0.42, 170) : Math.min(w * 0.5, h * 0.56, 290)),
      setup,
      draw,
    });
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) stage.redraw();
    });
    return () => {
      alive = false;
      stage.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
