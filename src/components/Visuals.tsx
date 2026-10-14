import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { Dict } from './i18n';

export type EngineId = 'chatgpt' | 'claude' | 'gemini' | 'perplexity';

export const ENGINES: { id: EngineId; name: string }[] = [
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'claude', name: 'Claude' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'perplexity', name: 'Perplexity' },
];

/** Engine name set in our own type. Text only: no AI brand logos anywhere on the site. */
export function EngineLogo({ id, className = '' }: { id: EngineId; className?: string }) {
  const name = ENGINES.find((e) => e.id === id)!.name;
  return (
    <span className={`engine ${className}`}>
      <span className="engine-name">{name}</span>
    </span>
  );
}

/* ---------- opportunity map ---------- */

export type Site = 'you' | 'g2' | 'semrush' | 'reddit' | 'wikipedia' | 'ahrefs' | 'capterra' | 'hubspot' | 'forbes' | 'youtube' | 'techradar';

export const DOMAIN: Record<Exclude<Site, 'you'>, string> = {
  g2: 'g2.com',
  semrush: 'semrush.com',
  reddit: 'reddit.com',
  wikipedia: 'wikipedia.org',
  ahrefs: 'ahrefs.com',
  capterra: 'capterra.com',
  hubspot: 'hubspot.com',
  forbes: 'forbes.com',
  youtube: 'youtube.com',
  techradar: 'techradar.com',
};

/* Illustrative values only (labelled under the map). Questions come from i18n, row for row. */
const LANES: { tone: 'blue' | 'amber' | 'red'; count: number; rows: { cited: Site[]; n: number }[] }[] = [
  {
    tone: 'blue',
    count: 7,
    rows: [
      { cited: ['wikipedia', 'reddit', 'youtube'], n: 3 },
      { cited: ['reddit', 'youtube'], n: 2 },
      { cited: ['reddit'], n: 1 },
      { cited: ['techradar'], n: 1 },
    ],
  },
  {
    tone: 'amber',
    count: 5,
    rows: [
      { cited: ['you', 'g2', 'capterra'], n: 6 },
      { cited: ['g2', 'you', 'reddit'], n: 5 },
      { cited: ['you', 'hubspot', 'forbes'], n: 4 },
      { cited: ['capterra', 'you'], n: 3 },
    ],
  },
  {
    tone: 'red',
    count: 4,
    rows: [
      { cited: ['semrush', 'ahrefs', 'g2'], n: 9 },
      { cited: ['semrush', 'ahrefs'], n: 8 },
      { cited: ['ahrefs', 'semrush', 'hubspot'], n: 7 },
      { cited: ['ahrefs', 'semrush'], n: 6 },
    ],
  },
];

export function Favicon({ site, you }: { site: Site; you: string }) {
  if (site === 'you') {
    return (
      <span className="fav fav-you" role="img" aria-label={you} title={you}>
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M2 8h12M8 2c2 2 2.6 4 2.6 6S10 12 8 14M8 2C6 4 5.4 6 5.4 8S6 12 8 14" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </span>
    );
  }
  return (
    <Image className="fav" src={`/favicons/${site}.png`} alt={DOMAIN[site]} title={DOMAIN[site]} width={18} height={18} unoptimized />
  );
}

/** `rows` caps the questions shown per lane (the home page shows three, keeping its copy short). */
export function OpportunityMap({ t, note, rows = 4 }: { t: Dict['citora']['map']; note: string; rows?: number }) {
  return (
    <figure className="omap" aria-label={t.title}>
      <div className="omap-head">
        <p className="omap-title">{t.title}</p>
        <p className="omap-total">
          <span className="omap-total-v">{t.total}</span>
          <span className="omap-total-l">{t.totalLabel}</span>
        </p>
      </div>
      <div className="omap-lanes">
        {LANES.map((lane, li) => {
          const copy = t.lanes[li];
          const shown = lane.rows.slice(0, rows);
          const max = Math.max(...shown.map((r) => r.n));
          return (
            <section key={lane.tone} className={`lane lane-${lane.tone}`} aria-label={copy.n}>
              <header className="lane-head">
                <span className="chip">{copy.n}</span>
                <span className="lane-count num" aria-label={`${lane.count} ${t.questions}`}>
                  {lane.count}
                </span>
              </header>
              <p className="lane-d">{copy.d}</p>
              <ul className="lane-rows">
                {shown.map((r, ri) => {
                  const mine = r.cited.includes('you');
                  const style = { '--w': `${Math.round((r.n / max) * 100)}%` } as CSSProperties;
                  return (
                    <li key={ri} style={style} className={ri === shown.length - 1 ? 'tail' : undefined}>
                      <span className="lane-bar" aria-hidden="true" />
                      <p className="lane-q">{copy.rows[ri]}</p>
                      <div className="lane-meta">
                        <span className={`favs${mine ? ' mine' : ''}`}>
                          {r.cited.map((s) => (
                            <Favicon key={s} site={s} you={t.yourSite} />
                          ))}
                        </span>
                        <span className="num lane-n" aria-label={`${r.n} ${t.citations}`}>
                          {r.n}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
      {note ? <figcaption className="demo-note">{note}</figcaption> : null}
    </figure>
  );
}

