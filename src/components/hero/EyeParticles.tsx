'use client';

import { useEffect, useRef } from 'react';
import { EYE, createStage, lid, loadMark, rng, type Frame } from './stage';

/**
 * Concept A: the Wazcher eye as a field of fine particles.
 * Lids in white and silver, iris ring and play-mark pupil in brand green.
 * Particles assemble on load, drift on a slow pseudo-noise field, the iris eases
 * toward the cursor, lids close in a slow blink every ~10 s, and the four engine
 * marks orbit on a hairline ellipse.
 */

const GREEN = '56,215,24';
const LEVELS = 14;

// Particle kinds
const LID_U = 0;
const LID_L = 1;
const IRIS = 2;
const PUPIL = 3;
const SCLERA = 4;
const DUST = 5;

type Particles = {
  n: number;
  kind: Uint8Array;
  x: Float32Array; // home position, eye units
  y: Float32Array;
  z: Float32Array; // depth 0..1
  a: Float32Array; // base alpha
  sx: Float32Array; // scattered start, eye units
  sy: Float32Array;
  delay: Float32Array;
  ph: Float32Array; // noise phases
  fq: Float32Array;
};

function build(compact: boolean): Particles {
  const R = rng(20261002);
  const D = compact ? 3000 : 6400; // particle budget for the mark itself
  const pts: { k: number; x: number; y: number; a: number }[] = [];
  const gauss = () => (R() + R() + R() - 1.5) / 1.5; // cheap bell curve in -1..1

  // Lids.
  // 40% of particles hug the two edges (crisp silhouette), the rest fill with a soft falloff.
  const lidCount = Math.round(D * 0.29);
  for (const [k, sign] of [
    [LID_U, -1],
    [LID_L, 1],
  ] as const) {
    for (let i = 0; i < lidCount; i++) {
      // Uniform in x: per unit area this is densest at the thin corners, which keeps the points sharp.
      const cx = (R() * 2 - 1) * 0.995;
      const o = lid(cx, EYE.outer);
      const n = lid(cx, EYE.inner);
      const th = o - n;
      let u: number;
      let a: number;
      const roll = R();
      if (roll < 0.24) {
        u = 1 - Math.abs(gauss()) * 0.05;
        a = 0.72 + 0.28 * R();
      } else if (roll < 0.4) {
        u = Math.abs(gauss()) * 0.05;
        a = 0.6 + 0.3 * R();
      } else {
        u = R();
        a = 0.22 + 0.34 * R() + 0.2 * Math.pow(Math.abs(u - 0.5) * 2, 2);
      }
      pts.push({ k, x: cx, y: sign * (n + th * u), a });
    }
  }

  // Iris ring, edges crisp, body filled.
  const irisCount = Math.round(D * 0.3);
  for (let i = 0; i < irisCount; i++) {
    const ang = R() * Math.PI * 2;
    const roll = R();
    let u: number;
    let a: number;
    if (roll < 0.26) {
      u = 1 - Math.abs(gauss()) * 0.04;
      a = 0.75 + 0.25 * R();
    } else if (roll < 0.44) {
      u = Math.abs(gauss()) * 0.04;
      a = 0.7 + 0.3 * R();
    } else {
      u = R();
      a = 0.25 + 0.35 * R();
    }
    const rr = EYE.irisInner + (EYE.irisOuter - EYE.irisInner) * u;
    pts.push({ k: IRIS, x: Math.cos(ang) * rr, y: Math.sin(ang) * rr, a });
  }

  // Play-mark pupil: outline plus fill, brightest of all.
  const { x0, x1, h } = EYE.tri;
  const pupilCount = Math.round(D * 0.07);
  const edges: [number, number, number, number][] = [
    [x0, -h, x1, 0],
    [x1, 0, x0, h],
    [x0, h, x0, -h],
  ];
  for (let i = 0; i < pupilCount; i++) {
    if (R() < 0.45) {
      const [ax, ay, bx, by] = edges[Math.floor(R() * 3)];
      const v = R();
      pts.push({ k: PUPIL, x: ax + (bx - ax) * v, y: ay + (by - ay) * v, a: 0.85 + 0.15 * R() });
    } else {
      let guard = 50;
      while (guard--) {
        const x = x0 + (x1 - x0) * R();
        const y = (R() * 2 - 1) * h;
        if (Math.abs(y) > (h * (x1 - x)) / (x1 - x0)) continue;
        pts.push({ k: PUPIL, x, y, a: 0.45 + 0.35 * R() });
        break;
      }
    }
  }

  // Sclera: a faint hairline of motes tracing the aperture, so the white of the eye has a form.
  const scleraCount = Math.round(D * 0.04);
  for (let i = 0; i < scleraCount; i++) {
    const x = (R() * 2 - 1) * 0.97;
    const ap = lid(x, EYE.inner) * (0.55 + 0.4 * R());
    const y = (R() < 0.5 ? -1 : 1) * ap;
    if (Math.hypot(x, y) < EYE.irisOuter * 1.08) continue;
    pts.push({ k: SCLERA, x, y, a: 0.06 + 0.1 * R() });
  }

  // Ambient dust in a wide soft ellipse around the mark.
  const dust = compact ? 140 : 320;
  for (let i = 0; i < dust; i++) {
    const ang = R() * Math.PI * 2;
    const e = 0.62 + Math.pow(R(), 0.7) * 0.5;
    const x = Math.cos(ang) * e * 1.7;
    const y = Math.sin(ang) * e * 0.95;
    if (Math.abs(y) < lid(x, EYE.outer) + 0.05 && Math.abs(x) < 1.04) continue;
    pts.push({ k: DUST, x, y, a: (0.06 + 0.2 * R()) * Math.max(0, 1.12 - e) * 1.8 });
  }

  const n = pts.length;
  const p: Particles = {
    n,
    kind: new Uint8Array(n),
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
    a: new Float32Array(n),
    sx: new Float32Array(n),
    sy: new Float32Array(n),
    delay: new Float32Array(n),
    ph: new Float32Array(n * 2),
    fq: new Float32Array(n * 2),
  };
  for (let i = 0; i < n; i++) {
    const q = pts[i];
    p.kind[i] = q.k;
    p.x[i] = q.x;
    p.y[i] = q.y;
    p.z[i] = R();
    p.a[i] = Math.min(1, q.a);
    // Scattered start: a wide, flattened cloud; assembly runs in polar space so it spirals in.
    const ang = Math.atan2(q.y, q.x) - 0.9 - R() * 0.8;
    const rad = 1.1 + R() * 1.6;
    p.sx[i] = Math.cos(ang) * rad;
    p.sy[i] = Math.sin(ang) * rad * 0.62;
    p.delay[i] = R() * 0.42 + (q.k === DUST ? 0.2 : 0);
    p.ph[i * 2] = R() * Math.PI * 2;
    p.ph[i * 2 + 1] = R() * Math.PI * 2;
    p.fq[i * 2] = 0.25 + R() * 0.45;
    p.fq[i * 2 + 1] = 0.2 + R() * 0.4;
  }
  return p;
}

const easeOut = (u: number) => 1 - Math.pow(1 - u, 3.4);
const smooth = (u: number) => u * u * (3 - 2 * u);

/** Blink curve: 0 open, 1 closed. Closes in 0.22 s, opens in 0.46 s. */
function blinkAt(t: number) {
  const period = 10.5;
  const start = 5.2; // first blink well after assembly
  if (t < start) return 0;
  const u = (t - start) % period;
  if (u < 0.22) return smooth(u / 0.22);
  if (u < 0.3) return 1;
  if (u < 0.76) return 1 - smooth((u - 0.3) / 0.46);
  return 0;
}

export default function EyeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.querySelector<HTMLElement>('[data-eye-host]');
    if (!canvas || !host) return;

    let P: Particles | null = null;
    let builtFor: boolean | null = null;
    const marks: (HTMLImageElement | null)[] = [null, null, null, null];
    let alive = true;

    // Per-bucket coordinate buffers, reused every frame.
    let bx = new Float32Array(0);
    let counts = new Int32Array(LEVELS * 2);
    let cap = 0;

    const drawOrbit = (f: Frame, front: boolean) => {
      const { ctx, cx, cy, r, t, compact } = f;
      const rx = r * (compact ? 1.08 : 1.15);
      const ry = r * (compact ? 0.3 : 0.32);
      const tilt = -0.1;
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      // Hairline orbit, split so the front half passes over the eye and the back half under it.
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${front ? 0.12 : 0.06})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();
      ctx.restore();

      const base = f.reduced ? 0.55 : t * ((Math.PI * 2) / 96) + 0.55;
      for (let i = 0; i < 4; i++) {
        const img = marks[i];
        if (!img) continue;
        const th = base + (i * Math.PI) / 2;
        const depth = Math.sin(th); // +1 nearest the viewer
        if (front !== depth >= 0) continue;
        const ex = Math.cos(th) * rx;
        const ey = Math.sin(th) * ry;
        const x = cx + ex * ct - ey * st;
        const y = cy + ex * st + ey * ct;
        const s = (compact ? 13 : 16) * (1 + depth * 0.18);
        ctx.globalAlpha = 0.32 + 0.32 * (depth * 0.5 + 0.5);
        ctx.drawImage(img, x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const setup = (f: Frame) => {
      if (builtFor !== f.compact || !P) {
        P = build(f.compact);
        builtFor = f.compact;
        cap = P.n;
        bx = new Float32Array(LEVELS * 2 * cap * 3);
        counts = new Int32Array(LEVELS * 2);
      }
    };

    const draw = (f: Frame) => {
      if (!P) return;
      const { ctx, cx, cy, r, t, reduced } = f;
      const p = P;
      counts.fill(0);

      const blink = reduced ? 0 : blinkAt(t);
      const irisX = f.px * 0.085;
      const irisY = f.py * 0.05;
      const parX = f.px * 7;
      const parY = f.py * 4;
      // Silver sheen sweeping across the lids every 9 s.
      const sheenPos = reduced ? 0.35 : ((t * 0.34) % 3) - 1.5;
      const drift = reduced ? 0 : 1;
      const pxSize = 1 / r; // one CSS pixel in eye units

      drawOrbit(f, false);

      for (let i = 0; i < p.n; i++) {
        const k = p.kind[i];
        let hx = p.x[i];
        let hy = p.y[i];
        const z = p.z[i];
        let alpha = p.a[i] * (0.45 + 0.55 * z);

        if (k === IRIS || k === PUPIL) {
          hx += irisX;
          hy += irisY;
        }

        // Blink: lids slide to the centre line, iris and sclera are covered by them.
        if (blink > 0) {
          const ap = lid(hx, EYE.inner);
          if (k === LID_U || k === LID_L) {
            // The outer rim stays put and the inner edge stretches to the centre line, like a real lid.
            const o = lid(hx, EYE.outer);
            const d = Math.abs(hy);
            const nd = o - ((o - d) * (o - ap * (1 - blink))) / Math.max(o - ap, 1e-3);
            hy = Math.sign(hy) * nd;
          } else if (k !== DUST) {
            const open = ap * (1 - blink);
            if (Math.abs(hy) > open) alpha = 0;
          }
        }

        // Noise drift, a few pixels.
        const amp = (k === DUST ? 6 : 1.4) * pxSize * drift;
        hx += Math.sin(t * p.fq[i * 2] + p.ph[i * 2]) * amp;
        hy += Math.cos(t * p.fq[i * 2 + 1] + p.ph[i * 2 + 1]) * amp;

        // Assembly in polar space around the eye centre.
        let u = 1;
        if (!reduced) {
          const local = (t - p.delay[i]) / 1.35;
          u = local <= 0 ? 0 : local >= 1 ? 1 : easeOut(local);
        }
        let X = hx;
        let Y = hy;
        if (u < 1) {
          const r0 = Math.hypot(p.sx[i], p.sy[i] / 0.62);
          const a0 = Math.atan2(p.sy[i] / 0.62, p.sx[i]);
          const r1 = Math.hypot(hx, hy);
          let a1 = Math.atan2(hy, hx);
          while (a1 < a0) a1 += Math.PI * 2;
          if (a1 - a0 > Math.PI * 1.6) a1 -= Math.PI * 2;
          const rr = r0 + (r1 - r0) * u;
          const aa = a0 + (a1 - a0) * u;
          const flat = 0.62 + 0.38 * u;
          X = Math.cos(aa) * rr;
          Y = Math.sin(aa) * rr * (r1 > 1e-4 ? flat : 1);
          alpha *= Math.min(1, u * 1.6);
        }

        if ((k === LID_U || k === LID_L) && !reduced) {
          const d = X - sheenPos - Y * 0.6;
          alpha *= 1 + 0.9 * Math.exp(-d * d * 18);
        }
        if (alpha <= 0.01) continue;

        const green = k === IRIS || k === PUPIL ? 1 : 0;
        const lvl = Math.min(LEVELS - 1, Math.floor(Math.min(alpha, 1) * LEVELS));
        const b = green * LEVELS + lvl;
        const o = (b * cap + counts[b]++) * 3;
        bx[o] = cx + X * r + parX * (z - 0.5);
        bx[o + 1] = cy + Y * r + parY * (z - 0.5);
        bx[o + 2] = k === DUST ? 0.6 + z * 0.7 : k === PUPIL ? 1.1 + z * 0.5 : 0.6 + z * 0.8;
      }

      for (let b = 0; b < LEVELS * 2; b++) {
        const c = counts[b];
        if (!c) continue;
        const a = ((b % LEVELS) + 0.5) / LEVELS;
        ctx.fillStyle = b >= LEVELS ? `rgba(${GREEN},${a})` : `rgba(236,238,240,${a})`;
        ctx.beginPath();
        const base = b * cap * 3;
        for (let j = 0; j < c; j++) {
          const o = base + j * 3;
          const s = bx[o + 2];
          ctx.rect(bx[o] - s / 2, bx[o + 1] - s / 2, s, s);
        }
        ctx.fill();
      }

      drawOrbit(f, true);
    };

    const stage = createStage({
      canvas,
      host,
      radius: (w, h, compact) => (compact ? Math.min(w * 0.44, 180) : Math.min(w * 0.56, h * 0.6, 310)),
      setup,
      draw,
    });
    Promise.all(['openai', 'claude', 'gemini', 'perplexity'].map(loadMark)).then((imgs) => {
      if (!alive) return;
      imgs.forEach((img, i) => (marks[i] = img));
      stage.redraw();
    });
    return () => {
      alive = false;
      stage.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
