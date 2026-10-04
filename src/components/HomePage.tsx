'use client';

import dynamic from 'next/dynamic';
import { EMAIL, type Dict } from './i18n';
import { useLocale } from './useLocale';
import { ArrowRight, Footer, LaunchButton, Nav, useHtmlLang, useReveal } from './Shell';
import { AdStrategyCard, ENGINES, EngineLogo } from './Visuals';
import { CitoraWordmark } from './CitoraWordmark';
import { CountUp } from './CountUp';
import { BeatsStage } from './beats/BeatsStage';
import { PageFade } from './CompanyPage';

// The scanning eye is canvas only: it loads in its own client chunk after hydration and never
// runs during SSR. The .hero-eye box below reserves its space, so the late mount causes no shift.
const EyeScan = dynamic(() => import('./hero/EyeScan'), { ssr: false });
// The night sky that carries on under every section after the hero video.
const StarField = dynamic(() => import('./hero/StarField'), { ssr: false });

/**
 * Hero visual switch. 'video' plays HERO_VIDEO full-bleed behind the copy (muted, looping, autoplay);
 * 'eye' brings back the scanning eye on the right. The eye code is kept on purpose.
 */
const HERO_VISUAL: 'video' | 'eye' = 'video';
const HERO_VIDEO = { src: '/video/hero.mp4', poster: '/video/hero-poster.jpg' };

function HeroVideo() {
  return (
    <div className="hero-video" aria-hidden="true">
      <video autoPlay muted loop playsInline preload="auto" poster={HERO_VIDEO.poster}>
        <source src={HERO_VIDEO.src} type="video/mp4" />
      </video>
    </div>
  );
}

function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  return (
    <section className={`hero hero-stage tone tone-ink${HERO_VISUAL === 'video' ? ' hero-has-video' : ''}`} id="top" aria-labelledby="hero-title">
      {HERO_VISUAL === 'video' ? <HeroVideo /> : <EyeScan fragments={t.scan.fragments} hud={t.scan.hud} />}
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-wm">
            <CitoraWordmark />
            <span className="sr-only">Citora</span>
          </h1>
          <p className="hero-tag">{h.title}</p>
          <p className="lede">{h.sub}</p>
          <div className="ctas">
            <LaunchButton label={h.cta1} />
            <a className="link-cta" href="#token">
              {h.cta2}
              <ArrowRight />
            </a>
          </div>
        </div>
        {HERO_VISUAL === 'eye' && <div className="hero-visual hero-eye" data-eye-host aria-hidden="true" />}
      </div>
      <div className="wrap">
        <div className="works">
          <span className="mono-label">{h.works}</span>
          <ul className="engine-row">
            {ENGINES.map((e) => (
              <li key={e.id}>
                <EngineLogo id={e.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Shift({ t }: { t: Dict['shift'] }) {
  return (
    <section className="sec tone tone-night sec-shift" aria-labelledby="shift-title">
      <div className="wrap sec-in">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <h2 id="shift-title" className="h2">{t.title}</h2>
          <p className="body">{t.sub}</p>
        </header>
        <dl className="stat-row rv">
          {t.stats.map((st) => (
            <div key={st.n} className="stat">
              <dt className="stat-d">{st.d}</dt>
              <dd className="stat-v">
                <CountUp value={st.n} />
                <span className="u">{st.u}</span>
              </dd>
              <dd className="stat-src">{st.s}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CitoraSection({ t, note }: { t: Dict['citora']; note: string }) {
  return (
    <section className="sec tone tone-ink2 sec-beats sec-beats-b" id="citora" aria-labelledby="citora-title">
      <div className="wrap sec-in">
        {/* the stage's three stacked words read as the title, so the heading is for screen readers */}
        <h2 id="citora-title" className="sr-only">{t.title}</h2>
        <BeatsStage t={t} note={note} />
      </div>
    </section>
  );
}

function AdsSection({ t, note }: { t: Dict['ads']; note: string }) {
  return (
    <section className="sec tone tone-warm" id="ads" aria-labelledby="ads-title">
      <div className="wrap sec-in">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <h2 id="ads-title" className="h2">{t.title}</h2>
          <p className="body">{t.sub}</p>
        </header>
        <div className="rv">
          <AdStrategyCard t={t.card} note={note} />
        </div>
      </div>
    </section>
  );
}

function TokenSection({ t }: { t: Dict['token'] }) {
  return (
    <section className="sec tone tone-green sec-token" id="token" aria-labelledby="token-title">
      <div className="token-orbit" aria-hidden="true">
        <span className="orbit-ring" />
        <span className="orbit-ring orbit-ring-2" />
        <span className="orbit-sat" />
      </div>
      <div className="wrap sec-in token-in">
        <header className="sec-head rv">
          <p className="eyebrow">{t.label}</p>
          <h2 id="token-title" className="h2">{t.title}</h2>
          <p className="body">{t.sub}</p>
        </header>
        <div className="token-foot rv">
          <p className="mono-label">{t.utilLabel}</p>
          <ul className="utils">
            {t.utils.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <p className="fine">{t.note}</p>
        </div>
      </div>
    </section>
  );
}

function Closing({ t }: { t: Dict }) {
  return (
    <section className="sec close tone tone-green2 sec-close" aria-labelledby="close-title">
      <div className="close-horizon" aria-hidden="true" />
      <div className="wrap close-in rv">
        <h2 id="close-title" className="h2">{t.close.title}</h2>
        <p className="body">{t.close.note}</p>
        <div className="ctas">
          <LaunchButton label={t.hero.cta1} />
          <a className="mail mono" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { locale, setLocale, t } = useLocale();
  useReveal();
  useHtmlLang(locale);

  return (
    <>
      <a href="#main" className="skip">{t.meta.skip}</a>
      <Nav t={t} locale={locale} setLocale={setLocale} home />
      <PageFade>
      <StarField />
      <main id="main" className="cit-night">
        <Hero t={t} />
        <Shift t={t.shift} />
        <CitoraSection t={t.citora} note={t.demoNote} />
        <AdsSection t={t.ads} note={t.demoNote} />
        <TokenSection t={t.token} />
        <Closing t={t} />
      </main>
      <Footer t={t} home />
      </PageFade>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
