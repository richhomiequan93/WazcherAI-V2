'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts a stat up from zero the first time it scrolls into view. Keeps any prefix such as "+"
 * and the final text exactly as written, so copy and locales stay the source of truth.
 */
export function CountUp({ value, ms = 1400 }: { value: string; ms?: number }) {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const [, pre, num, post] = m;
    const target = Number(num);
    let raf = 0;
    let done = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done) return;
        done = true;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / ms);
          const v = Math.round(target * (1 - Math.pow(1 - p, 4)));
          setShown(`${pre}${v}${post}`);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        setShown(`${pre}0${post}`);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ms]);

  return (
    <span ref={ref} className="countup">
      {shown}
    </span>
  );
}
