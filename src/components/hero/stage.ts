/**
 * Shared runtime for the hero canvases: DPR-aware sizing, a single rAF loop that
 * pauses when the hero is offscreen or the tab is hidden, pointer tracking, and
 * prefers-reduced-motion (renders one still frame and re-renders only on resize).
 * Client only: every browser API is touched inside createStage, never at import time.
 */

/** Wazcher eye silhouette, measured from public/eyelogo.png. Units: eye half-width = 1. */
export const EYE = {
  /** Height of the full mark relative to its half-width (logo is 6980 x 4017). */
  aspect: 0.5755,
  /** Lid curve y(x) = -(e + a * (1 - x^2)^p), fitted to the logo edges within 0.5%. */
  outer: { e: 0.0353, a: 0.5404, p: 0.95 },
  inner: { e: 0.0365, a: 0.3397, p: 0.952 },
  irisOuter: 0.385,
  irisInner: 0.179,
  /** Play-mark pupil: vertical back edge at x0, half-height h, tip at x1. */
  tri: { x0: -0.088, x1: 0.168, h: 0.144 },
};

export function lid(x: number, c: { e: number; a: number; p: number }) {
  const k = Math.max(0, 1 - x * x);
  return c.e + c.a * Math.pow(k, c.p);
}

export type Frame = {
  ctx: CanvasRenderingContext2D;
  /** CSS pixel size of the canvas. */
  w: number;
  h: number;
  /** Eye centre and half-width in canvas CSS pixels. */
  cx: number;
  cy: number;
  r: number;
  /** Host box (the reserved hero column) in canvas CSS pixels. */
  hx: number;
  hy: number;
  hw: number;
  hh: number;
  /** True on viewports at or below the mobile breakpoint. */
  compact: boolean;
  /** Seconds since start (frozen when paused). */
  t: number;
  dt: number;
  /** Pointer relative to eye centre in half-widths, eased; 0,0 when idle. */
  px: number;
  py: number;
  /** True when the pointer has moved recently (desktop only). */
  pointerActive: boolean;
  reduced: boolean;
};

export type StageOptions = {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  /** Eye half-width from the host box size. */
  radius: (hostW: number, hostH: number, compact: boolean) => number;
  setup?: (f: Frame) => void;
  draw: (f: Frame) => void;
};

export function createStage(o: StageOptions) {
  const { canvas, host } = o;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return { dispose: () => {}, redraw: () => {} };

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Preview override: ?motion=1 plays the animation even when the OS asks for reduced motion,
  // so the concepts can be reviewed on a machine with that setting on.
  const force = new URLSearchParams(window.location.search).get('motion') === '1';
  const isReduced = () => mq.matches && !force;
  const f: Frame = {
    ctx, w: 0, h: 0, cx: 0, cy: 0, r: 1, hx: 0, hy: 0, hw: 0, hh: 0, compact: false,
    t: 0, dt: 0, px: 0, py: 0, pointerActive: false, reduced: isReduced(),
  };

  let raf = 0;
  let last = 0;
  let onScreen = true;
  let visible = document.visibilityState === 'visible';
  let tx = 0;
  let ty = 0;
  let lastMove = -1e9;

  const resize = () => {
    const cr = canvas.getBoundingClientRect();
    const hr = host.getBoundingClientRect();
    if (cr.width < 2 || cr.height < 2) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cr.width * dpr);
    canvas.height = Math.round(cr.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    f.w = cr.width;
    f.h = cr.height;
    f.compact = window.innerWidth <= 960;
    f.hx = hr.left - cr.left;
    f.hy = hr.top - cr.top;
    f.hw = hr.width;
    f.hh = hr.height;
    f.cx = f.hx + hr.width / 2;
    f.cy = hr.top - cr.top + hr.height / 2;
    f.r = o.radius(hr.width, hr.height, f.compact);
    o.setup?.(f);
    if (f.reduced) render();
  };

  const render = () => {
    ctx.clearRect(0, 0, f.w, f.h);
    o.draw(f);
  };

  const tick = (now: number) => {
    raf = 0;
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
    last = now;
    f.dt = dt;
    f.t += dt;
    f.pointerActive = now - lastMove < 4000;
    // Critically damped approach toward the pointer target, frame-rate independent.
    const k = 1 - Math.exp(-dt * 3.2);
    f.px += ((f.pointerActive ? tx : 0) - f.px) * k;
    f.py += ((f.pointerActive ? ty : 0) - f.py) * k;
    render();
    schedule();
  };

  const schedule = () => {
    if (f.reduced || raf || !onScreen || !visible) return;
    last = 0;
    raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !f.w) return;
    const cr = canvas.getBoundingClientRect();
    const x = (e.clientX - cr.left - f.cx) / f.r;
    const y = (e.clientY - cr.top - f.cy) / f.r;
    // Soft clamp: far-away pointers saturate instead of snapping.
    tx = Math.tanh(x * 0.6);
    ty = Math.tanh(y * 0.6);
    lastMove = performance.now();
  };

  const onVis = () => {
    visible = document.visibilityState === 'visible';
    if (visible) schedule();
    else stop();
  };

  const onMotion = () => {
    f.reduced = isReduced();
    if (f.reduced) {
      stop();
      resize();
    } else schedule();
  };

  const io = new IntersectionObserver(
    ([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) schedule();
      else stop();
    },
    { rootMargin: '80px' },
  );
  const ro = new ResizeObserver(() => resize());

  resize();
  ro.observe(canvas);
  io.observe(canvas);
  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('visibilitychange', onVis);
  mq.addEventListener('change', onMotion);
  if (f.reduced) {
    // Let the still frame settle once fonts are ready (canvas text in concept B).
    document.fonts?.ready.then(() => resize());
  }
  schedule();

  return {
    dispose: () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      mq.removeEventListener('change', onMotion);
    },
    /** Re-render the still frame (reduced motion) after late assets such as logos arrive. */
    redraw: () => {
      if (f.reduced && f.w) render();
    },
  };
}

/** Deterministic PRNG so the composition is identical on every load. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Load a monochrome currentColor SVG from /public/logos as a white bitmap source. */
export async function loadMark(id: string): Promise<HTMLImageElement | null> {
  try {
    const res = await fetch(`/logos/${id}.svg`);
    const svg = (await res.text()).replace(/currentColor/g, '#ffffff').replace(/width="1em"/, 'width="64"').replace(/height="1em"/, 'height="64"');
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } catch {
    return null;
  }
}
