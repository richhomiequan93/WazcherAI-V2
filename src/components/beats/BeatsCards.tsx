'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import type { Dict } from '../i18n';
import { BeatVisual } from './BeatVisuals';

/*
 * Concept A: stacking cards. Each card is position: sticky; the next one slides up over it.
 * The only script is a small scroll-linked transform on the covered card (scale to 0.94 and a
 * dimming shade), written in one rAF per frame, reads first then transform/opacity writes.
 * Listening starts only while the stack is near the viewport (IntersectionObserver).
 * Below 820px or with reduced motion, CSS drops the sticky and the script never attaches.
 */

const SCALE = 0.06;
const SHADE = 0.5;

export function BeatsCards({ t, note }: { t: Dict['citora']; note: string }) {
  const stack = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = stack.current;
    if (!root) return;
    const mq = window.matchMedia('(min-width: 820px) and (prefers-reduced-motion: no-preference)');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.ca-card'));
    const shades = cards.map((c) => c.querySelector<HTMLElement>('.ca-shade'));
    let tops: number[] = [];
    let raf = 0;
    let live = false;

    const measure = () => {
      tops = cards.map((c) => parseFloat(getComputedStyle(c).top) || 0);
    };
    const reset = () => {
      cards.forEach((c, i) => {
        c.style.transform = '';
        const s = shades[i];
        if (s) s.style.opacity = '';
      });
    };
    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      // reads
      const nextTop = cards.map((c, i) => (i + 1 < cards.length ? cards[i + 1].getBoundingClientRect().top : Infinity));
      // writes
      cards.forEach((c, i) => {
        if (i === cards.length - 1) return;
        const span = vh - tops[i + 1];
        const p = Math.min(1, Math.max(0, (vh - nextTop[i]) / span));
        c.style.transform = p > 0 ? `scale(${(1 - SCALE * p).toFixed(4)})` : '';
        const s = shades[i];
        if (s) s.style.opacity = (SHADE * p).toFixed(3);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    const start = () => {
      if (live || !mq.matches) return;
      live = true;
      measure();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
      onScroll();
    };
    const stop = () => {
      if (!live) return;
      live = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) start();
        else stop();
      },
      { rootMargin: '25% 0px 25% 0px' },
    );
    io.observe(root);
    const onMq = () => {
      if (mq.matches) {
        const r = root.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) start();
      } else {
        stop();
        reset();
      }
    };
    mq.addEventListener('change', onMq);

    return () => {
      io.disconnect();
      mq.removeEventListener('change', onMq);
      stop();
    };
  }, []);

  const total = t.beats.length;
  return (
    <ol className="ca-stack" ref={stack}>
      {t.beats.map((b, i) => (
        <li key={b.n} className={`ca-card ca-t${i + 1}`} style={{ '--i': i } as CSSProperties}>
          <div className="ca-body rv">
            <div className="ca-copy">
              <p className="ca-idx num">
                {i + 1}
                <span>/{total}</span>
              </p>
              <h3 className="ca-word">{b.n}</h3>
              <p className="ca-d">{b.d}</p>
              <ul className="ca-feats">
                {b.f.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="ca-vis">
              <BeatVisual i={i} t={t} note={note} />
            </div>
          </div>
          <span className="ca-shade" aria-hidden="true" />
        </li>
      ))}
    </ol>
  );
}
