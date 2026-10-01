'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CITORA_URL, EMAIL, LINKEDIN_URL, LOCALES, X_URL, type Dict, type Locale } from './i18n';
import { useLocale } from './useLocale';
import { AdStrategyCard, AskAICard, ChatGPTLogo, ENGINES, Mark, OpportunityMap } from './Visuals';

// Hero visual concepts load client side only: canvas code never runs during SSR, and `/` never ships it.
const EyeParticles = dynamic(() => import('./hero/EyeParticles'), { ssr: false });
const EyeScan = dynamic(() => import('./hero/EyeScan'), { ssr: false });

/** Which hero visual to render. Undefined keeps the original Ask AI card. */
export type HeroConcept = 'a' | 'b';

const pad = (n: number) => String(n).padStart(2, '0');

function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    // Only hide elements that start below the fold, so nothing already visible blinks.
    for (const el of els) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('rv-wait');
        io.observe(el);
      }
    }
    return () => io.disconnect();
  }, []);
}

function ArrowOut() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function LaunchButton({ label, className = '' }: { label: string; className?: string }) {
  return (
    <a className={`btn btn-primary ${className}`} href={CITORA_URL} target="_blank" rel="noopener noreferrer">
      {label}
      <ArrowOut />
    </a>
  );
}

function LangSwitch({ locale, setLocale, label }: { locale: Locale; setLocale: (l: Locale) => void; label: string }) {
  return (
    <div className="lang" role="group" aria-label={label}>
      {LOCALES.map((l) => (
        <button
          key={l.id}
          type="button"
          lang={l.id}
          className={locale === l.id ? 'on' : ''}
          aria-pressed={locale === l.id}
          title={l.name}
          onClick={() => setLocale(l.id)}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

function Nav({ t, locale, setLocale }: { t: Dict; locale: Locale; setLocale: (l: Locale) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const links: [string, string][] = [
    ['#citora', t.nav.citora],
    ['#ads', t.nav.ads],
    ['#token', t.nav.token],
    ['#roadmap', t.nav.roadmap],
    ['#faq', t.nav.faq],
  ];

  return (
    <header className={`nav${scrolled || open ? ' nav-solid' : ''}`}>
      <div className="wrap nav-in">
        <a href="#top" className="nav-logo" aria-label={t.nav.home}>
          <Image src="/logo.png" alt="Wazcher" width={4297} height={779} priority />
        </a>
        <nav aria-label="Primary" className="nav-links">
          {links.map(([h, l]) => (
            <a key={h} href={h} className={h === '#token' ? 'mono' : ''}>{l}</a>
          ))}
        </nav>
        <div className="nav-end">
          <LangSwitch locale={locale} setLocale={setLocale} label={t.nav.language} />
          <a className="btn btn-outline btn-sm" href={CITORA_URL} target="_blank" rel="noopener noreferrer">
            {t.nav.launch}
            <ArrowOut />
          </a>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="drawer"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? 'bars x' : 'bars'} aria-hidden="true" />
        </button>
      </div>
      <div id="drawer" className="drawer" hidden={!open}>
        <nav aria-label="Mobile" className="drawer-links">
          {links.map(([h, l], i) => (
            <a key={h} href={h} onClick={() => setOpen(false)}>
              <span className="idx">{pad(i + 1)}</span>
              <span className={h === '#token' ? 'mono' : ''}>{l}</span>
            </a>
          ))}
        </nav>
        <div className="drawer-foot">
          <LangSwitch locale={locale} setLocale={setLocale} label={t.nav.language} />
          <LaunchButton label={t.nav.launch} className="btn-block" />
        </div>
      </div>
    </header>
  );
}

function Hero({ t, concept }: { t: Dict; concept?: HeroConcept }) {
  const h = t.hero;
  return (
    <section className={concept ? `hero hero-concept hero-${concept}` : 'hero'} id="top" aria-labelledby="hero-title">
      {concept === 'a' && <EyeParticles />}
      {concept === 'b' && <EyeScan fragments={t.scan.fragments} hud={t.scan.hud} />}
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="display">{h.title}</h1>
          <p className="lede">{h.sub}</p>
          <div className="ctas">
            <LaunchButton label={h.cta1} />
            <a className="link-cta" href="#token">
              {h.cta2}
              <ArrowRight />
            </a>
          </div>
        </div>
        {concept ? (
          <div className="hero-visual hero-eye" data-eye-host aria-hidden="true" />
        ) : (
          <div className="hero-visual">
            <AskAICard t={t.ask} />
          </div>
        )}
      </div>
      <div className="wrap">
        <div className="works">
          <span className="mono-label">{h.works}</span>
          <ul className="engine-row">
            {ENGINES.map((e) => (
              <li key={e.id}>
                {e.id === 'chatgpt' ? (
                  <ChatGPTLogo className="wordmark" />
                ) : (
                  <Mark id={`${e.id}-text`} label={e.name} className="wordmark" />
                )}
              </li>
            ))}
          </ul>
        </div>
        <ul className="metrics" aria-label={h.metricsLabel}>
          {h.metrics.map((m) => (
            <li key={m.l} className="metric">
              <span className="metric-v">{m.v}</span> <span className="metric-l">{m.l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Shift({ t }: { t: Dict['shift'] }) {
  return (
    <section className="sec" aria-labelledby="shift-title">
      <div className="wrap">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <h2 id="shift-title" className="h2">{t.title}</h2>
        </header>
        <div className="stats rv">
          <p className="mono-label sub-label">{t.statsLabel}</p>
          <dl className="stat-row">
            {t.stats.map((st) => (
              <div key={st.v} className="stat">
                <dt className="stat-d">{st.d}</dt>
                <dd className="stat-v">{st.v}</dd>
                <dd className="src">{st.s}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ol className="manifesto">
          {t.items.map((it, i) => (
            <li key={it.t} className="rv">
              <span className="idx">{pad(i + 1)}</span>
              <div>
                <p className="mani-t">{it.t}</p>
                <p className="mani-d">{it.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CitoraSection({ t }: { t: Dict['citora'] }) {
  return (
    <section className="sec" id="citora" aria-labelledby="citora-title">
      <div className="wrap">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <h2 id="citora-title" className="h2">{t.title}</h2>
          <p className="intro">{t.intro}</p>
        </header>

        <div className="split">
          <ol className="pillars">
            {t.pillars.map((p, i) => (
              <li key={p.n} className="rv">
                <span className="idx">{pad(i + 1)}</span>
                <h3 className="pillar-n">{p.n}</h3>
                <dl className="ba">
                  <div>
                    <dt>{t.beforeLabel}</dt>
                    <dd>{p.before}</dd>
                  </div>
                  <div className="now">
                    <dt>{t.nowLabel}</dt>
                    <dd>{p.now}</dd>
                  </div>
                </dl>
                <ul className="keys">
                  {p.k.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="aside rv">
            <OpportunityMap t={t.map} />
          </div>
        </div>

        <div className="loop5 rv">
          <p className="mono-label sub-label">{t.loopLabel}</p>
          <h3 className="h3">{t.loopTitle}</h3>
          <p className="loop5-note">{t.loopNote}</p>
          <ol className="flow-nodes loop-nodes">
            {t.steps.map((s, i) => (
              <li key={s.n}>
                <span className="idx">{pad(i + 1)}</span>
                <span className="flow-t">{s.n}</span>
                <span className="loop-d">{s.d}</span>
              </li>
            ))}
          </ol>
          <div className="flow-back loop-back" aria-hidden="true">
            <span className="flow-back-line" />
            <span className="mono-label">{t.loopBack}</span>
          </div>
          <div className="research">
            <span className="stat-v">{t.research.v}</span>
            <div>
              <p>{t.research.d}</p>
              <p className="src">{t.research.s}</p>
            </div>
          </div>
        </div>

        <div className="modules rv">
          <p className="mono-label sub-label">{t.modulesLabel}</p>
          <dl className="mod-list">
            {t.modules.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="live">
            <span className="sq on" aria-hidden="true" />
            <span>{t.liveLabel}</span>
            <a href={CITORA_URL} target="_blank" rel="noopener noreferrer" className="inline-link mono">
              {t.liveLink}
              <ArrowOut />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function AdsSection({ t }: { t: Dict['ads'] }) {
  return (
    <section className="sec" id="ads" aria-labelledby="ads-title">
      <div className="wrap">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <p className="ads-kicker">
            <ChatGPTLogo className="ads-logo" />
            <span>{t.kicker}</span>
          </p>
          <h2 id="ads-title" className="h2">{t.title}</h2>
          <p className="intro">{t.intro}</p>
        </header>

        <div className="split">
          <div>
            <p className="mono-label sub-label rv">{t.tiersLabel}</p>
            <dl className="tiers rv">
              {t.tiers.map((x) => (
                <div key={x.n}>
                  <dt>{x.n}</dt>
                  <dd>{x.d}</dd>
                </div>
              ))}
            </dl>

            <p className="mono-label sub-label rv">{t.flowLabel}</p>
            <ol className="steps4 rv">
              {t.flow.map((s, i) => (
                <li key={s.n}>
                  <span className="idx">{pad(i + 1)}</span>
                  <h3>{s.n}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
            <p className="paid rv">
              <span className="ticker">$CIT</span>
              <span>{t.paid}</span>
            </p>
          </div>
          <div className="aside rv">
            <AdStrategyCard t={t.card} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TokenSection({ t }: { t: Dict['token'] }) {
  return (
    <section className="sec" id="token" aria-labelledby="token-title">
      <div className="wrap">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <h2 id="token-title" className="h2">{t.title}</h2>
          <p className="intro">{t.intro}</p>
        </header>

        <div className="split">
          <div className="rv">
            <p className="mono-label sub-label">{t.utilLabel}</p>
            <ol className="utils">
              {t.utils.map(([k, v], i) => (
                <li key={k}>
                  <span className="idx">{pad(i + 1)}</span>
                  <span className="util-k">{k}</span>
                  <span className="util-v">{v}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="aside rv" aria-label={t.statusLabel}>
            <div className="card status">
              <div className="card-head">
                <span className="card-title">{t.statusLabel}</span>
              </div>
              <dl className="spec">
                {t.status.map(([k, v], i) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd className={i === 0 ? 'ticker' : ''}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="status-note">{t.note}</p>
            </div>
          </aside>
        </div>

        <figure className="flow rv">
          <figcaption className="mono-label sub-label">{t.flowLabel}</figcaption>
          <ol className="flow-nodes">
            {t.flow.map((f, i) => (
              <li key={f}>
                <span className="idx">{pad(i + 1)}</span>
                <span className="flow-t">{f}</span>
              </li>
            ))}
          </ol>
          <div className="flow-back" aria-hidden="true">
            <span className="flow-back-line" />
            <span className="mono-label">{t.flowBack}</span>
          </div>
        </figure>
      </div>
    </section>
  );
}

function Roadmap({ t }: { t: Dict['roadmap'] }) {
  return (
    <section className="sec" id="roadmap" aria-labelledby="roadmap-title">
      <div className="wrap">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <h2 id="roadmap-title" className="h2">{t.title}</h2>
        </header>
        <ol className="phases">
          {t.phases.map((p, i) => (
            <li key={p.t} className={`rv${i === 0 ? ' is-live' : ''}`}>
              <div className="phase-top">
                <span className="mono-label">{t.phase} {pad(i + 1)}</span>
                <span className="phase-s">
                  {i === 0 && <span className="sq on" aria-hidden="true" />}
                  {p.s}
                </span>
              </div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
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
    <section className="sec" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <h2 id="faq-title" className="h2">{t.title}</h2>
        </header>
        <div className="faq-list rv">
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
                  <div className="geo-wrap">
                    <table className="geo">
                      <thead>
                        <tr>
                          {t.geo.cols.map((c, ci) => (
                            <th key={ci} scope="col">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {t.geo.rows.map((r) => (
                          <tr key={r[0]}>
                            <th scope="row">{r[0]}</th>
                            <td>{r[1]}</td>
                            <td>{r[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing({ t }: { t: Dict }) {
  return (
    <section className="close" aria-labelledby="close-title">
      <div className="wrap close-in rv">
        <Image src="/eyelogo.png" alt="" width={56} height={32} className="close-eye" />
        <h2 id="close-title" className="h2">{t.close.title}</h2>
        <p className="intro">{t.close.sub}</p>
        <div className="ctas">
          <LaunchButton label={t.hero.cta1} />
          <a className="link-cta" href="#token">
            {t.hero.cta2}
            <ArrowRight />
          </a>
        </div>
        <a className="mail mono" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </section>
  );
}

function Footer({ t }: { t: Dict }) {
  const f = t.footer;
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Image src="/logo.png" alt="Wazcher" width={4297} height={779} className="foot-logo" />
            <p>{f.desc}</p>
          </div>
          <nav className="foot-cols" aria-label="Footer">
            <div>
              <p className="mono-label">{f.product}</p>
              <ul>
                <li><a href={CITORA_URL} target="_blank" rel="noopener noreferrer">Citora</a></li>
                <li><a href="#ads">{t.nav.ads}</a></li>
                <li><a href="#token" className="mono">$CIT</a></li>
              </ul>
            </div>
            <div>
              <p className="mono-label">{f.company}</p>
              <ul>
                <li><a href={`mailto:${EMAIL}`}>{f.contact}</a></li>
              </ul>
            </div>
            <div>
              <p className="mono-label">{f.social}</p>
              <ul>
                <li><a href={X_URL} target="_blank" rel="noopener noreferrer">X</a></li>
                <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="foot-bottom">
          <p className="legal">{f.legal}</p>
          <p className="mono-label">{f.copy}</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage({ concept }: { concept?: HeroConcept } = {}) {
  const { locale, setLocale, t } = useLocale();
  useReveal();

  // Before paint, so CJK line-height and letter-spacing switch in the same frame as the text.
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <a href="#main" className="skip">{t.meta.skip}</a>
      <Nav t={t} locale={locale} setLocale={setLocale} />
      <main id="main">
        <Hero t={t} concept={concept} />
        <Shift t={t.shift} />
        <CitoraSection t={t.citora} />
        <AdsSection t={t.ads} />
        <TokenSection t={t.token} />
        <Roadmap t={t.roadmap} />
        <Faq t={t.faq} />
        <Closing t={t} />
      </main>
      <Footer t={t} />
      {concept && <div className="grain" aria-hidden="true" />}
    </>
  );
}
