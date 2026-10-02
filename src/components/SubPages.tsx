'use client';

import type { ReactNode } from 'react';
import { EMAIL, type Dict } from './i18n';
import { useLocale } from './useLocale';
import { Footer, Nav, pad, useHtmlLang } from './Shell';

/** Plain reading page for the routes moved off the home page: same header, footer and locale. */
function SubPage({ children }: { children: (t: Dict) => ReactNode }) {
  const { locale, setLocale, t } = useLocale();
  useHtmlLang(locale);
  return (
    <>
      <a href="#main" className="skip">{t.meta.skip}</a>
      <Nav t={t} locale={locale} setLocale={setLocale} home={false} />
      <main id="main" className="page tone tone-ink">
        <div className="wrap">{children(t)}</div>
      </main>
      <Footer t={t} home={false} />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

function withEmail(text: string) {
  if (!text.includes(EMAIL)) return text;
  const [a, b] = text.split(EMAIL);
  return (
    <>
      {a}
      <a className="inline-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      {b}
    </>
  );
}

function Faq({ t }: { t: Dict['faq'] }) {
  return (
    <section aria-labelledby="faq-title">
      <header className="page-head">
        <p className="eyebrow">{t.label}</p>
        <h1 id="faq-title" className="h2">{t.title}</h1>
      </header>
      <div className="faq-list">
        {t.items.map((it, i) => (
          <details key={it.q}>
            <summary>
              <span className="idx">{pad(i + 1)}</span>
              <span className="q">{it.q}</span>
              <span className="plus" aria-hidden="true" />
            </summary>
            <div className="a">
              <p>{withEmail(it.a)}</p>
              {'table' in it && it.table ? (
                <table className="geo">
                  <thead>
                    <tr>
                      {t.geo.cols.map((c, ci) =>
                        ci === 0 ? (
                          <td key={ci} />
                        ) : (
                          <th key={ci} scope="col" className={ci === 2 ? 'g' : undefined}>
                            {c}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {t.geo.rows.map((r) => (
                      <tr key={r[0]}>
                        <th scope="row">{r[0]}</th>
                        <td>{r[1]}</td>
                        <td className="g">{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Index of the phase in progress: earlier phases render as done, later ones as upcoming. */
const CURRENT_PHASE = 1;

function Roadmap({ t }: { t: Dict['roadmap'] }) {
  return (
    <section aria-labelledby="roadmap-title">
      <header className="page-head">
        <p className="eyebrow">{t.label}</p>
        <h1 id="roadmap-title" className="h2">{t.title}</h1>
      </header>
      <ol className="timeline">
        {t.phases.map((p, i) => {
          const state = i < CURRENT_PHASE ? 'done' : i === CURRENT_PHASE ? 'now' : 'next';
          return (
            <li key={p.t} className={`tl-${state}`} aria-current={state === 'now' ? 'step' : undefined}>
              <span className="tl-phase num">
                {t.phase} {pad(i + 1)}
                <span className="sr-only">, {p.s}</span>
              </span>
              <span className="tl-node" aria-hidden="true" />
              <h2>{p.t}</h2>
              <p>{p.d}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function FaqPage() {
  return <SubPage>{(t) => <Faq t={t.faq} />}</SubPage>;
}

export function RoadmapPage() {
  return <SubPage>{(t) => <Roadmap t={t.roadmap} />}</SubPage>;
}
