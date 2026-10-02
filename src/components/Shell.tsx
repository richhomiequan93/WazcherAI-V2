'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CITORA_URL, EMAIL, LINKEDIN_URL, LOCALES, X_URL, type Dict, type Locale } from './i18n';

export const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The only motion on the site: marked elements below the fold fade and rise 12px once when they
 * enter the viewport. One observer, never re-triggered. Reduced motion shows everything at once.
 */
export function useReveal() {
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

/** Before paint, so CJK line-height and letter-spacing switch in the same frame as the text. */
export function useHtmlLang(locale: Locale) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
}

export function ArrowOut() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowRight() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function LaunchButton({ label, className = '' }: { label: string; className?: string }) {
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

/** `home` keeps in-page anchors; on other routes the same links point back to the home page. */
export function Nav({ t, locale, setLocale, home }: { t: Dict; locale: Locale; setLocale: (l: Locale) => void; home: boolean }) {
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

  const base = home ? '' : '/';
  const links: [string, string][] = [
    [`${base}#citora`, t.nav.citora],
    [`${base}#ads`, t.nav.ads],
    [`${base}#token`, t.nav.token],
  ];

  return (
    <header className={`nav${scrolled || open ? ' nav-solid' : ''}`}>
      <div className="wrap nav-in">
        <Link href={home ? '#top' : '/'} className="nav-logo" aria-label={t.nav.home}>
          <Image src="/logo.png" alt="Wazcher" width={4297} height={779} loading="eager" />
        </Link>
        <nav aria-label="Primary" className="nav-links">
          {links.map(([h, l]) => (
            <Link key={h} href={h} className={h.endsWith('#token') ? 'mono' : ''}>
              {l}
            </Link>
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
            <Link key={h} href={h} onClick={() => setOpen(false)}>
              <span className="idx">{pad(i + 1)}</span>
              <span className={h.endsWith('#token') ? 'mono' : ''}>{l}</span>
            </Link>
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

export function Footer({ t, home }: { t: Dict; home: boolean }) {
  const f = t.footer;
  const base = home ? '' : '/';
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
                <li>
                  <a href={CITORA_URL} target="_blank" rel="noopener noreferrer">Citora</a>
                </li>
                <li>
                  <Link href={`${base}#ads`}>{t.nav.ads}</Link>
                </li>
                <li>
                  <Link href={`${base}#token`} className="mono">$CIT</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mono-label">{f.company}</p>
              <ul>
                <li>
                  <Link href="/roadmap">{t.nav.roadmap}</Link>
                </li>
                <li>
                  <Link href="/faq">{t.nav.faq}</Link>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`}>{f.contact}</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mono-label">{f.social}</p>
              <ul>
                <li>
                  <a href={X_URL} target="_blank" rel="noopener noreferrer">X</a>
                </li>
                <li>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
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
