import type { CSSProperties } from 'react';
import type { Dict } from '../i18n';
import { DOMAIN, EngineLogo, Favicon, Mark, OpportunityMap, ENGINES, type EngineId, type Site } from '../Visuals';

/*
 * Product shots for the three Citora beats, built in code. Each has its own form:
 *   See it   an Ask AI read-out (question field, four engine columns, a cited list)
 *   Find it  the opportunity map, compact
 *   Hit it   two AI Profile versions as sheets, the rule AI followed, the mention rate it moved
 * Values are illustrative and mirror the example on citora.ai. `className` lets the stage add
 * state classes (e.g. `go`, which plays the one-time inner animation).
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* See it: matches the citora.ai home example, row for row. */
const ASK: { id: EngineId; n: number }[] = [
  { id: 'chatgpt', n: 3 },
  { id: 'claude', n: 2 },
  { id: 'gemini', n: 0 },
  { id: 'perplexity', n: 1 },
];
const CITED: { site: Exclude<Site, 'you'>; n: number }[] = [
  { site: 'semrush', n: 4 },
  { site: 'g2', n: 2 },
  { site: 'reddit', n: 2 },
];
const CITED_MAX = 4;

export function AskView({ t, note, className = '' }: { t: Dict['citora']['ask']; note: string; className?: string }) {
  return (
    <figure className={`bv bv-ask ${className}`} aria-label={t.label}>
      <div className="ask-q">
        <p className="ask-tag">
          <span>{t.label}</span>
          <span className="ask-when">{t.when}</span>
        </p>
        <p className="ask-text">{t.q}</p>
      </div>

      <ul className="ask-engines" aria-label={t.answers}>
        {ASK.map((r, i) => (
          <li key={r.id} className={r.n ? 'hit' : 'miss'} style={{ '--i': i } as Vars}>
            <EngineLogo id={r.id} className="ask-engine" />
            {r.n ? (
              <p className="ask-val">
                <span className="ask-n num">×{r.n}</span>
                <span className="ask-l">{t.mentioned}</span>
              </p>
            ) : (
              <p className="ask-val">
                <span className="ask-n ask-none" aria-hidden="true" />
                <span className="ask-l">{t.not}</span>
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="ask-cited">
        <p className="ask-h">
          <span>{t.cited}</span>
          <span>{t.period}</span>
        </p>
        <ul>
          {CITED.map((c) => (
            <li key={c.site}>
              <Favicon site={c.site} you={t.yourSite} />
              <span className="ask-dom num">{DOMAIN[c.site]}</span>
              <span className="ask-bar" aria-hidden="true">
                <i style={{ transform: `scaleX(${c.n / CITED_MAX})` }} />
              </span>
              <span className="ask-c num">×{c.n}</span>
            </li>
          ))}
          <li className="you">
            <Favicon site="you" you={t.yourSite} />
            <span className="ask-dom">{t.yourSite}</span>
            <span className="ask-bar" aria-hidden="true" />
            <span className="ask-c num">×0</span>
          </li>
        </ul>
      </div>
      <figcaption className="bv-note">{note}</figcaption>
    </figure>
  );
}

export function MapView({ t, note, className = '' }: { t: Dict['citora']['map']; note: string; className?: string }) {
  return (
    <div className={`bv bv-map ${className}`}>
      <OpportunityMap t={t} note="" rows={3} />
      <p className="bv-note">{note}</p>
    </div>
  );
}

/* Hit it: redacted line widths for the two sheets (the visible first line is real copy). */
const BARS_A = [94, 81, 88, 46];
const BARS_B = [90, 97, 84, 92, 58];
const RATE_A = 24;
const RATE_B = 41;

export function ProfileAB({ t, note, className = '' }: { t: Dict['citora']['profile']; note: string; className?: string }) {
  return (
    <figure className={`bv bv-pf ${className}`} aria-label={`${t.title}, ${t.exp}`}>
      <p className="pf-head">
        <span className="pf-title">{t.title}</span>
        <span className="pf-exp">{t.exp}</span>
      </p>
      <div className="pf-grid">
        <div className="pf-sheet pf-a">
          <p className="pf-v">
            <span className="pf-k">{t.a}</span>
            <span>{t.aWhen}</span>
          </p>
          <p className="pf-name">{t.brand}</p>
          <p className="pf-line">{t.aLine}</p>
          <span className="pf-bars" aria-hidden="true">
            {BARS_A.map((w, i) => (
              <i key={i} style={{ width: `${w}%` }} />
            ))}
          </span>
        </div>
        <div className="pf-sheet pf-b">
          <p className="pf-v">
            <span className="pf-k">{t.b}</span>
            <span>{t.bWhen}</span>
          </p>
          <p className="pf-name">{t.brand}</p>
          <p className="pf-line">{t.bLine}</p>
          <span className="pf-bars" aria-hidden="true">
            {BARS_B.map((w, i) => (
              <i key={i} style={{ width: `${w}%` }} />
            ))}
          </span>
        </div>

        <div className="pf-read">
          <span className="pf-engines" aria-hidden="true">
            {ENGINES.map((e) => (
              <Mark key={e.id} id={e.id} />
            ))}
          </span>
          <span className="pf-rule" aria-hidden="true">
            <i className="pf-line-h" />
            <i className="pf-tick" />
            <i className="pf-dot" />
          </span>
          <span className="pf-said">{t.read}</span>
        </div>

        <p className="pf-rate pf-rate-a">
          <span className="pf-rl">{t.rate}</span>
          <span className="pf-rv num">
            {RATE_A}
            <span className="u">%</span>
          </span>
        </p>
        <p className="pf-rate pf-rate-b">
          <span className="pf-rl">{t.rate}</span>
          <span className="pf-rv num">
            {RATE_B}
            <span className="u">%</span>
          </span>
          <span className="pf-delta num">+{RATE_B - RATE_A} pp</span>
        </p>
      </div>
      <figcaption className="bv-note">{note}</figcaption>
    </figure>
  );
}

/** The visual for beat `i`, so the stage and mobile stack stay in step. */
export function BeatVisual({ i, t, note, className }: { i: number; t: Dict['citora']; note: string; className?: string }) {
  if (i === 0) return <AskView t={t.ask} note={note} className={className} />;
  if (i === 1) return <MapView t={t.map} note={note} className={className} />;
  return <ProfileAB t={t.profile} note={note} className={className} />;
}
