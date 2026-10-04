'use client';

import Link from 'next/link';
import type { Dict } from './i18n';
import { useLocale } from './useLocale';
import { ArrowRight, Footer, Nav, useHtmlLang, useReveal } from './Shell';
import { CitoraWordmark } from './CitoraWordmark';

/** wazcher.com: the company home. A thesis, then one product card that leads to /citora. */
function CompanyHero({ t }: { t: Dict['company'] }) {
  return (
    <section className="co-hero tone tone-ink" id="top" aria-labelledby="co-title">
      <div className="wrap co-hero-in">
        <h1 id="co-title" className="co-title">{t.title}</h1>
        <p className="lede co-lede">{t.sub}</p>
        <div className="ctas">
          <Link className="btn btn-primary" href="/citora">
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
        <h2 id="products-title" className="eyebrow co-products-label">{t.productsLabel}</h2>
        <Link href="/citora" className="co-card rv" aria-label={`Citora. ${t.open}`}>
          <div className="co-card-top">
            <span className="mono-label">{t.productNo}</span>
            <span className="co-status">
              <span className="co-dot" aria-hidden="true" />
              {t.status}
            </span>
          </div>
          <div className="co-card-mid">
            <CitoraWordmark className="co-card-wm" />
            <p className="co-card-desc">{t.desc}</p>
          </div>
          <dl className="co-facts">
            {t.facts.map((f) => (
              <div key={f.k}>
                <dt className="mono-label">{f.k}</dt>
                <dd className={f.v.startsWith('$CIT') ? 'mono' : ''}>{f.v}</dd>
              </div>
            ))}
          </dl>
          <span className="co-open">
            {t.open}
            <ArrowRight />
          </span>
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
      <main id="main">
        <CompanyHero t={t.company} />
        <Products t={t.company} />
      </main>
      <Footer t={t} home={false} company />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
