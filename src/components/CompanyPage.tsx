'use client';

import { ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { Dict } from './i18n';
import { useLocale } from './useLocale';
import { ArrowRight, Footer, Nav, useHtmlLang, useReveal } from './Shell';
import { CitoraWordmark } from './CitoraWordmark';

// Canvas only, mounted after hydration; the hero reserves its own box so nothing shifts.
const OrbitField = dynamic(() => import('./hero/OrbitField'), { ssr: false });

/** Fades the whole page out and the next one in when moving between Wazcher and Citora. */
export function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'page-fade': 'page-in', default: 'none' }}
      exit={{ 'page-fade': 'page-out', default: 'none' }}
      default="none"
    >
      <div>{children}</div>
    </ViewTransition>
  );
}

/** wazcher.com: the company home. A thesis, then the flagship product that leads to /citora. */
function CompanyHero({ t }: { t: Dict['company'] }) {
  return (
    <section className="co-hero" id="top" aria-labelledby="co-title">
      <div className="co-hero-art" aria-hidden="true">
        <Image src="/art/hero-rings.webp" alt="" fill priority sizes="100vw" className="co-hero-img" />
      </div>
      <OrbitField />
      <div className="wrap co-hero-in">
        <h1 id="co-title" className="co-title">{t.title}</h1>
        <p className="lede co-lede">{t.sub}</p>
        <div className="ctas">
          <Link className="btn btn-primary" href="/citora" transitionTypes={['page-fade']}>
            {t.cta}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Products({ t }: { t: Dict['company'] }) {
  return (
    <section className="co-products tone tone-paper" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <header className="co-products-head rv">
          <p className="eyebrow">{t.productsLabel}</p>
          <h2 id="products-title" className="h2">{t.flagTitle}</h2>
        </header>
        <Link href="/citora" transitionTypes={['page-fade']} className="co-flag rv" aria-label={`Citora. ${t.open}`}>
          <div className="co-flag-art" aria-hidden="true">
            <Image src="/art/citora-rings.webp" alt="" fill sizes="(max-width: 819px) 100vw, 70vw" loading="eager" className="co-flag-img" />
          </div>
          <div className="co-flag-copy">
            <p className="mono-label">{t.flagLabel}</p>
            <div className="co-flag-wm">
              <CitoraWordmark />
            </div>
            <p className="co-flag-tag">{t.flagTag}</p>
            <p className="co-flag-desc">{t.desc}</p>
            <span className="co-open">
              {t.open}
              <ArrowRight />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default function CompanyPage() {
  const { locale, setLocale, t } = useLocale();
  useReveal();
  useHtmlLang(locale);

  return (
    <>
      <a href="#main" className="skip">{t.meta.skip}</a>
      <Nav t={t} locale={locale} setLocale={setLocale} home={false} company />
      <PageFade>
        <main id="main">
          <CompanyHero t={t.company} />
          <Products t={t.company} />
        </main>
        <Footer t={t} home={false} company />
      </PageFade>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
