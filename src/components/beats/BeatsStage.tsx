'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dict } from '../i18n';
import { BeatVisual } from './BeatVisuals';

/*
 * Concept B: pinned stage. The track is ~3.8 viewports tall and the stage inside it is sticky,
 * so the section holds still for about three viewport heights while the active beat advances.
 * Layout (pinned vs stacked) is decided in CSS by a media query, so nothing shifts on hydration.
 * Script work per frame: one rect read, one transform write on the progress line, and a React
 * state change only when the active beat changes. Listening starts only while the track is near
 * the viewport (IntersectionObserver). Each visual plays its small inner animation once (`go`).
 */

const PIN = '(min-width: 820px) and (prefers-reduced-motion: no-preference)';

export function BeatsStage({ t, note }: { t: Dict['citora']; note: string }) {
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [played, setPlayed] = useState<number[]>([]);
  const [js, setJs] = useState(false);
  const n = t.beats.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mq = window.matchMedia(PIN);
    let raf = 0;
    let live = false;
    let last = -1;

    const frame = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p.toFixed(4)})`;
      const i = Math.min(n - 1, Math.floor(p * n));
      // the first beat plays once the stage is mostly on screen, not while it is still entering
      const shown = r.top < window.innerHeight * 0.35;
      if (i !== last && (shown || i > 0)) {
        last = i;
        setActive(i);
        setPlayed((s) => (s.includes(i) ? s : [...s, i]));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (live || !mq.matches) return;
      live = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      onScroll();
    };
    const stop = () => {
      if (!live) return;
      live = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: '10% 0px 10% 0px' });
    io.observe(el);
    const onMq = () => {
      if (!mq.matches) stop();
      else if (el.getBoundingClientRect().top < window.innerHeight) start();
    };
    mq.addEventListener('change', onMq);
    // Marks the hidden pre-animation states as safe to use; no layout change.
    const id = requestAnimationFrame(() => setJs(true));
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      mq.removeEventListener('change', onMq);
      stop();
    };
  }, [n]);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    if (!window.matchMedia(PIN).matches) {
      document.getElementById(`cb-step-${i}`)?.scrollIntoView({ block: 'start' });
      return;
    }
    const range = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + range * ((i + 0.08) / n), behavior: 'smooth' });
  };

  return (
    <div className={`cb${js ? ' cb-js' : ''}`} ref={track}>
      <div className="cb-stage">
        <div className="cb-words">
          <p className="eyebrow cb-label">{t.label}</p>
          <span className="cb-rail" aria-hidden="true">
            <span className="cb-fill" ref={fill} />
          </span>
          {t.beats.map((b, i) => (
            <div
              key={b.n}
              id={`cb-step-${i}`}
              className={`cb-step${i === active ? ' on' : ''}${i > active ? ' after' : ''}`}
              style={{ order: i * 2 }}
            >
              <div className="rv">
                <h3 className="cb-h">
                  <button type="button" className="cb-word" aria-current={i === active ? 'step' : undefined} onClick={() => go(i)}>
                    {b.n}
                    <span className="cb-idx num" aria-hidden="true">
                      {i + 1}/{n}
                    </span>
                  </button>
                </h3>
                <div className="cb-more">
                  <p className="cb-d">{b.d}</p>
                  <ul className="cb-feats">
                    {b.f.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cb-vis">
          {t.beats.map((b, i) => (
            <div key={b.n} className={`cb-slot${i === active ? ' on' : ''}`} style={{ order: i * 2 + 1 }}>
              <div className="rv">
                <BeatVisual i={i} t={t} note={note} className={played.includes(i) ? 'go' : ''} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
