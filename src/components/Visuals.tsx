import type { CSSProperties } from 'react';
import type { Dict } from './i18n';

export type EngineId = 'openai' | 'claude' | 'gemini' | 'perplexity';

export const ENGINES: { id: EngineId; name: string }[] = [
  { id: 'openai', name: 'ChatGPT' },
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

function CardHead({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="card-head">
      <span className="card-title">{title}</span>
      <span className="tag">{tag}</span>
    </div>
  );
}

/* Example values only: every card is labelled "Example" in the UI. */
const CITATIONS: { id: EngineId; cited: boolean; pos: string; sent: 'positive' | 'neutral' | null }[] = [
  { id: 'openai', cited: true, pos: '#2', sent: 'positive' },
  { id: 'claude', cited: true, pos: '#1', sent: 'positive' },
  { id: 'gemini', cited: false, pos: '', sent: null },
  { id: 'perplexity', cited: true, pos: '#3', sent: 'neutral' },
];

export function CitationTable({ t }: { t: Dict['test'] }) {
  return (
    <figure className="card cite" aria-label={`${t.tag}: ${t.title}`}>
      <CardHead tag={t.tag} title={t.title} />
      <dl className="cite-meta">
        <div>
          <dt>{t.queryLabel}</dt>
          <dd>{t.query}</dd>
        </div>
        <div>
          <dt>{t.brandLabel}</dt>
          <dd>{t.brand}</dd>
        </div>
      </dl>
      <table className="cite-table">
        <thead>
          <tr>
            {t.cols.map((c) => (
              <th key={c} scope="col">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CITATIONS.map((r) => {
            const name = ENGINES.find((e) => e.id === r.id)!.name;
            return (
              <tr key={r.id}>
                <th scope="row">
                  <Mark id={r.id} />
                  <span>{name}</span>
                </th>
                <td>
                  <span className={r.cited ? 'yes' : 'no'}>
                    <i aria-hidden="true" className={r.cited ? 'sq on' : 'sq'} />
                    {r.cited ? t.yes : t.no}
                  </span>
                </td>
                <td className="num">{r.cited ? r.pos : t.na}</td>
                <td>{r.sent === 'positive' ? t.positive : r.sent === 'neutral' ? t.neutral : t.na}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="cite-foot">
        <span>{t.rateLabel}</span>
        <span className="meter" aria-hidden="true"><span style={{ width: '75%' }} /></span>
        <span className="num">75%</span>
        <span className="muted">{t.rate}</span>
      </div>
    </figure>
  );
}

export function ExperimentCard({ t }: { t: Dict['citora']['exp'] }) {
  const variants = [
    { k: 'A', label: t.a, rate: 38 },
    { k: 'B', label: t.b, rate: 54 },
  ];
  return (
    <figure className="card exp" aria-label={`${t.tag}: ${t.title}`}>
      <CardHead tag={t.tag} title={t.title} />
      <div className="exp-vars">
        {variants.map((v) => (
          <div key={v.k} className={`exp-var${v.k === 'B' ? ' win' : ''}`}>
            <div className="exp-var-top">
              <span className="mono-label">{t.variant} {v.k}</span>
              <span className="num exp-rate">{v.rate}%</span>
            </div>
            <p>{v.label}</p>
            <span className="meter" aria-hidden="true"><span style={{ width: `${v.rate}%` }} /></span>
            <span className="sr-only">{t.rate}</span>
          </div>
        ))}
      </div>
      <dl className="spec">
        {t.rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
        <div className="spec-result">
          <dt>{t.result}</dt>
          <dd className="delta">{t.resultV}</dd>
        </div>
      </dl>
    </figure>
  );
}

export function AdStrategyCard({ t }: { t: Dict['ads']['card'] }) {
  return (
    <figure className="card ad" aria-label={`${t.tag}: ${t.title}`}>
      <div className="card-head">
        <span className="card-title">
          <Mark id="openai" />
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
