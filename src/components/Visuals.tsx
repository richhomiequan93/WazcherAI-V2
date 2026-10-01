import type { CSSProperties } from 'react';
import type { Dict } from './i18n';

export type EngineId = 'chatgpt' | 'claude' | 'gemini' | 'perplexity';

export const ENGINES: { id: EngineId; name: string }[] = [
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'claude', name: 'Claude' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'perplexity', name: 'Perplexity' },
];

/** Monochrome logo rendered through a CSS mask so it inherits currentColor. */
export function Mark({ id, label, className = '' }: { id: string; label?: string; className?: string }) {
  const url = `url(/logos/${id}.svg)`;
  const style: CSSProperties = { WebkitMaskImage: url, maskImage: url };
  return (
    <span
      className={`mark m-${id} ${className}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}

/**
 * Engine lockup used wherever engines appear: the engine's symbol in a fixed square box plus its name
 * set in our own type. Every engine gets the identical treatment; brand wordmarks are never used.
 */
export function EngineLogo({ id, className = '' }: { id: EngineId; className?: string }) {
  const name = ENGINES.find((e) => e.id === id)!.name;
  return (
    <span className={`engine ${className}`}>
      <Mark id={id} className="engine-mark" />
      <span className="engine-name">{name}</span>
    </span>
  );
}

function CardHead({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="card-head">
      <span className="card-title">{title}</span>
      <span className="tag">{tag}</span>
    </div>
  );
}

/* Example values only, mirroring the illustration on citora.ai. Every card is labelled "Example" in the UI. */
const MENTIONS: { id: EngineId; n: number }[] = [
  { id: 'chatgpt', n: 3 },
  { id: 'claude', n: 2 },
  { id: 'gemini', n: 0 },
  { id: 'perplexity', n: 1 },
];

const CITED: { d: string | null; n: number }[] = [
  { d: 'semrush.com', n: 4 },
  { d: 'g2.com', n: 2 },
  { d: 'reddit.com', n: 2 },
  { d: null, n: 0 },
];

export function AskAICard({ t }: { t: Dict['ask'] }) {
  const max = Math.max(...CITED.map((c) => c.n));
  return (
    <figure className="card ask" aria-label={`${t.tag}: ${t.title}`}>
      <CardHead tag={t.tag} title={t.title} />
      <dl className="cite-meta">
        <div>
          <dt>{t.qLabel}</dt>
          <dd>{t.q}</dd>
        </div>
        <div>
          <dt>{t.brandLabel}</dt>
          <dd>{t.brand}</dd>
        </div>
      </dl>

      <div className="ask-block">
        <div className="ask-sub">
          <span>{t.answersTitle}</span>
          <span>{t.today}</span>
        </div>
        <ul className="ask-rows">
          {MENTIONS.map((r) => {
            const on = r.n > 0;
            return (
              <li key={r.id}>
                <EngineLogo id={r.id} className="ask-engine" />
                <span className={on ? 'ask-m on' : 'ask-m'}>
                  <i aria-hidden="true" className={on ? 'sq on' : 'sq'} />
                  {on ? (
                    <>
                      {t.mentioned} <span className="num">×{r.n}</span>
                    </>
                  ) : (
                    t.notMentioned
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="ask-block">
        <div className="ask-sub">
          <span>{t.citedTitle}</span>
          <span>{t.period}</span>
        </div>
        <ul className="ask-rows ask-cited">
          {CITED.map((c) => (
            <li key={c.d ?? 'you'} className={c.d ? '' : 'you'}>
              <span className={c.d ? 'mono' : ''}>{c.d ?? t.yourSite}</span>
              <span className="meter" aria-hidden="true">
                <span style={{ width: `${(c.n / max) * 100}%` }} />
              </span>
              <span className="num">×{c.n}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

export function OpportunityMap({ t }: { t: Dict['citora']['map'] }) {
  return (
    <figure className="card omap" aria-label={`${t.tag}: ${t.title}`}>
      <CardHead tag={t.tag} title={t.title} />
      {t.lanes.map((lane, i) => (
        <div key={lane.n} className={`omap-lane${i === 0 ? ' blue' : ''}`}>
          <div className="omap-top">
            <span className="omap-n">
              <i aria-hidden="true" className={i === 0 ? 'sq on' : 'sq'} />
              {lane.n}
            </span>
            <span className="omap-d">{lane.d}</span>
          </div>
          <ul>
            {lane.rows.map(([q, v]) => (
              <li key={q}>
                <span className="omap-q">{q}</span>
                <span className="omap-v">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="omap-foot">{t.foot}</p>
    </figure>
  );
}

export function AdStrategyCard({ t }: { t: Dict['ads']['card'] }) {
  return (
    <figure className="card ad" aria-label={`${t.tag}: ${t.title}`}>
      <div className="card-head">
        <span className="card-title">
          <Mark id="chatgpt" />
          {t.title}
        </span>
        <span className="tag">{t.tag}</span>
      </div>
      <dl className="spec">
        {t.rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
        <div className="spec-result">
          <dt>{t.paidLabel}</dt>
          <dd className="ticker">$CIT</dd>
        </div>
      </dl>
    </figure>
  );
}
