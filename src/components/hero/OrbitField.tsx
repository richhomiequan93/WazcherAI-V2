'use client';

import { useEffect, useRef } from 'react';

/**
 * Company hero background. A dot field laid on slow concentric orbits (the Citora ring, as light):
 * dots drift along their orbit, a few brighter "satellites" travel faster, two soft lights wander.
 * Under the cursor the field lifts: nearby dots brighten, swell and lean away, and a faint ring
 * follows the pointer with easing. Canvas 2D, paused off screen, still frame under reduced motion.
 */
type Dot = { r: number; a: number; s: number; size: number; base: number; sat: boolean };

export default function OrbitField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const host = cv.parentElement as HTMLElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let dots: Dot[] = [];
    const tilt = 0.42; // orbit ellipse squash, matching the drawn ring
    const rot = -0.2;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0, ton: 0 };

    const build = () => {
      const rect = host.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      const mobile = W < 820;
      cx = mobile ? W * 0.7 : W * 0.68;
      cy = mobile ? H * 0.3 : H * 0.46;
      const maxR = Math.hypot(W, H) * (mobile ? 0.9 : 0.75);
      dots = [];
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      const rings = mobile ? 18 : 30;
      for (let i = 0; i < rings; i++) {
        const r = 70 + (i / rings) ** 1.25 * maxR;
        const n = Math.floor((r * 2 * Math.PI) / (mobile ? 30 : 22));
        const s = (0.018 + rnd() * 0.02) * (i % 2 ? 1 : -1) * (120 / (r + 120));
        for (let k = 0; k < n; k++) {
          dots.push({ r, a: (k / n) * Math.PI * 2 + rnd() * 0.08, s, size: 0.7 + rnd() * 0.5, base: 0.1 + rnd() * 0.12, sat: false });
        }
      }
      for (let i = 0; i < 9; i++) {
        const r = 120 + rnd() * maxR * 0.8;
        dots.push({ r, a: rnd() * Math.PI * 2, s: (0.05 + rnd() * 0.05) * (i % 2 ? 1 : -1) * (160 / (r + 160)), size: 1.6 + rnd() * 1.2, base: 0.55, sat: true });
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.ton = 1;
    };
    const onLeave = () => {
      mouse.ton = 0;
    };

    const cosR = Math.cos(rot);
    const sinR = Math.sin(rot);
    let t = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) t += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.on += (mouse.ton - mouse.on) * 0.06;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // two wandering lights, very soft
      const lights = [
        { x: cx + Math.cos(t * 0.11) * W * 0.18, y: cy + Math.sin(t * 0.13) * H * 0.16, r: Math.max(W, H) * 0.42, a: 0.06 },
        { x: cx - W * 0.35 + Math.sin(t * 0.07) * W * 0.12, y: H * 0.85 + Math.cos(t * 0.09) * H * 0.08, r: Math.max(W, H) * 0.35, a: 0.035 },
      ];
      for (const l of lights) {
        const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
        g.addColorStop(0, `rgba(255,255,255,${l.a})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // cursor light
      if (mouse.on > 0.01) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
        g.addColorStop(0, `rgba(255,255,255,${0.07 * mouse.on})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      const R = 190;
      for (const d of dots) {
        const a = d.a + t * d.s;
        const ex = Math.cos(a) * d.r;
        const ey = Math.sin(a) * d.r * tilt;
        let x = cx + ex * cosR - ey * sinR;
        let y = cy + ex * sinR + ey * cosR;
        if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;
        let alpha = d.base;
        let size = d.size;
        if (mouse.on > 0.01) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < R) {
            const f = (1 - dist / R) ** 2 * mouse.on;
            x += (dx / (dist || 1)) * f * 18;
            y += (dy / (dist || 1)) * f * 18;
            alpha += f * 0.6;
            size += f * 1.1;
          }
        }
        if (d.sat) {
          // satellites: a short fading trail along the orbit
          const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
          glow.addColorStop(0, `rgba(255,255,255,${0.18})`);
          glow.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, size * 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, alpha)})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // the ring that follows the cursor
      if (mouse.on > 0.01) {
        ctx.strokeStyle = `rgba(255,255,255,${0.22 * mouse.on})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(mouse.x, mouse.y, 34, 34, 0, 0, Math.PI * 2);
        ctx.stroke();
        const sa = t * 1.4;
        ctx.fillStyle = `rgba(56,215,24,${0.9 * mouse.on})`;
        ctx.beginPath();
        ctx.arc(mouse.x + Math.cos(sa) * 34, mouse.y + Math.sin(sa) * 34, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    build();
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(performance.now());
    });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) {
        cancelAnimationFrame(raf);
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(cv);
    if (!reduce && window.matchMedia('(pointer: fine)').matches) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="co-field" aria-hidden="true" />;
}
