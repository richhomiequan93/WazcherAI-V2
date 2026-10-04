'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CitoraWordmark } from './CitoraWordmark';
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

function LangItem({ id, name, locale, pick }: { id: Locale; name: string; locale: Locale; pick: (l: Locale) => void }) {
  return (
    <li>
      <button type="button" lang={id} aria-current={id === locale ? 'true' : undefined} onClick={() => pick(id)}>
        {name}
        {id === locale && (
          <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
            <path d="M2 6.4l2.6 2.6L10 3.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        )}
      </button>
    </li>
  );
}

/**
 * Tools for Humanity style: a small "globe + EN" trigger in the nav opens a centred sheet
 * listing the languages. Esc, the close button or a click on the dimmed page closes it.
 */
function LangModal({
  locale,
  setLocale,
  t,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict['nav'];
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const current = LOCALES.find((l) => l.id === locale) ?? LOCALES[0];
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  const pick = (id: Locale) => {
    setLocale(id);
    close();
  };

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="lang-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${t.language}: ${current.name}`}
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
          <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1.6 8h12.8M8 1.6c1.9 1.9 2.7 4 2.7 6.4S9.9 12.5 8 14.4M8 1.6C6.1 3.5 5.3 5.6 5.3 8s.8 4.5 2.7 6.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span>{current.id === 'en' ? 'EN' : current.short}</span>
      </button>
      {open && (
        <div className="lang-scrim" onPointerDown={(e) => e.target === e.currentTarget && close()}>
          <div className="lang-sheet" role="dialog" aria-modal="true" aria-labelledby="lang-title">
            <div className="lang-sheet-head">
              <h2 id="lang-title">{t.selectLanguage}</h2>
              <button ref={closeBtn} type="button" className="lang-x" aria-label={t.close} onClick={close}>
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
            <ul className="lang-list">
              <LangItem id="en" name="English" locale={locale} pick={pick} />
            </ul>
            <p className="lang-group">{t.asia}</p>
            <ul className="lang-list lang-cols">
              <LangItem id="zh-TW" name="繁體中文" locale={locale} pick={pick} />
              <LangItem id="zh-CN" name="简体中文" locale={locale} pick={pick} />
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * `home` keeps in-page anchors; on other routes the same links point back to /citora.
 * `company` is the wazcher.com home page: one link to Citora, no Citora section anchors.
 */
export function Nav({
  t,
  locale,
  setLocale,
  home,
  company = false,
}: {
  t: Dict;
  locale: Locale;
  setLocale: (l: Locale) => void;
  home: boolean;
  company?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const morph = home && !company;
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /*
   * Citora landing: the header starts with no logo. The big hero wordmark is the logo, and as
   * the page scrolls it travels up and shrinks until it lands in the header slot. The moving
   * piece is the header's own wordmark (fixed, above the bar), dressed up to sit exactly over
   * the hero one, so nothing gets clipped by the bar or the hero.
   */
  useEffect(() => {
    if (!morph) return;
    const brand = brandRef.current;
    const logo = brand?.querySelector<HTMLElement>('.nav-cit-logo');
    const hero = document.querySelector<SVGElement>('.hero-wm .citora-wm');
    const root = document.documentElement;
    if (!brand || !logo || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('cit-morph-off');
      return () => root.classList.remove('cit-morph-off');
    }

    let N = { x: 0, y: 0, w: 1 };
    let H = { x: 0, y: 0, w: 1 };
    let K = 1; // hero size / header size
    let raf = 0;
    /*
     * Sharpness: mobile Safari rasterises a transformed layer at its layout size, so scaling the
     * 21px header logo up to hero size looks blurry on phones. While in flight, the SVG is laid
     * out at hero size (K times bigger, overflowing a box kept at header size) and scaled DOWN.
     */
    const measure = () => {
      logo.classList.remove('cit-big');
      logo.style.transform = 'none';
      const n = logo.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      N = { x: n.left, y: n.top, w: n.width || 1 };
      H = { x: h.left, y: h.top + window.scrollY, w: h.width || 1 };
      K = Math.max(1, H.w / N.w);
      logo.style.setProperty('--cit-nw', `${n.width}px`);
      logo.style.setProperty('--cit-nh', `${n.height}px`);
      logo.style.setProperty('--cit-k', String(K));
    };
    const ease = (p: number) => p * p * (3 - 2 * p); // smoothstep: shrinks evenly, settles softly
    const paint = () => {
      raf = 0;
      const dist = Math.max(1, H.y - N.y);
      const p = Math.min(1, Math.max(0, window.scrollY / dist));
      // Vertical follows the page exactly (the logo rides the scroll); size and x ease in.
      const top = H.y - Math.min(window.scrollY, dist);
      const e = ease(p);
      const scale = H.w / N.w + (1 - H.w / N.w) * e;
      const left = H.x + (N.x - H.x) * e;
      logo.classList.toggle('cit-big', p < 1);
      logo.style.transform =
        p >= 1 ? 'none' : `translate3d(${left - N.x}px, ${top - N.y}px, 0) scale(${scale / K})`;
      brand.style.setProperty('--cit-p', String(p));
      brand.classList.toggle('cit-landed', p >= 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      paint();
    };
    measure();
    paint();
    root.classList.add('cit-morph');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(hero);
    document.fonts?.ready.then(onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      root.classList.remove('cit-morph');
      logo.classList.remove('cit-big');
      logo.style.transform = '';
    };
  }, [morph]);

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

  const links: [string, string, string?][] = company
    ? [
        ['#products', t.nav.products],
        ['/citora', t.nav.citora, 'fade'],
      ]
    : []; // Citora pages: logo, language and Launch only

  return (
    <header className={`nav${scrolled || open ? ' nav-solid' : ''}${morph ? ' nav-morph' : ''}`} style={{ viewTransitionName: 'site-header' }}>
      <div className="wrap nav-in">
        {company ? (
          <div className="nav-brand">
            <Link href="#top" className="nav-logo" aria-label={t.nav.home}>
              <Image src="/logo.png" alt="Wazcher" width={4297} height={779} loading="eager" />
            </Link>
          </div>
        ) : (
          /* Citora pages: Citora is the brand; the line under it is the way back to Wazcher. */
          <div className={`nav-brand nav-brand-cit${morph ? ' nav-brand-morph' : ''}`} ref={brandRef}>
            <Link href={home ? '#top' : '/citora'} className="nav-cit-logo" aria-label="Citora">
              <CitoraWordmark />
            </Link>
            <Link href="/" transitionTypes={['page-fade']} className="nav-parent">
              <span className="nav-parent-back" aria-hidden="true">
                <svg viewBox="0 0 12 12" width="10" height="10">
                  <path d="M7.5 2.5L4 6l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </span>
              {t.nav.productOf}
            </Link>
          </div>
        )}
        {links.length > 0 && (
          <nav aria-label="Primary" className="nav-links">
            {links.map(([h, l, fx]) => (
              <Link key={h} href={h} transitionTypes={fx ? ['page-fade'] : undefined} className={h.endsWith('#token') ? 'mono' : ''}>
                {l}
              </Link>
            ))}
          </nav>
        )}
        <div className="nav-end nav-end-co">
          <LangModal locale={locale} setLocale={setLocale} t={t.nav} />
        </div>
        {links.length > 0 && (
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
        )}
      </div>
      <div id="drawer" className="drawer" hidden={!open}>
        {links.length > 0 && (
          <nav aria-label="Mobile" className="drawer-links">
            {links.map(([h, l, fx], i) => (
              <Link key={h} href={h} transitionTypes={fx ? ['page-fade'] : undefined} onClick={() => setOpen(false)}>
                <span className="idx">{pad(i + 1)}</span>
                <span className={h.endsWith('#token') ? 'mono' : ''}>{l}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export function Footer({ t, home, company = false }: { t: Dict; home: boolean; company?: boolean }) {
  const f = t.footer;
  const base = home ? '' : '/citora';
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Image src="/logo.png" alt="Wazcher" width={4297} height={779} className="foot-logo" />
            <p>{company ? f.descCompany : f.desc}</p>
          </div>
          <nav className="foot-cols" aria-label="Footer">
            <div>
              <p className="mono-label">{f.product}</p>
              <ul>
                <li>
                  <Link href="/citora" transitionTypes={['page-fade']}>Citora</Link>
                </li>
                {!company && (
                  <li>
                    <Link href={`${base}#ads`}>{t.nav.ads}</Link>
                  </li>
                )}
                {!company && (
                  <li>
                    <Link href={`${base}#token`} className="mono">$CIT</Link>
                  </li>
                )}
                <li>
                  <a href={CITORA_URL} target="_blank" rel="noopener noreferrer">citora.ai</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mono-label">{f.company}</p>
              <ul>
                <li>
                  <Link href="/citora/roadmap">{t.nav.roadmap}</Link>
                </li>
                <li>
                  <Link href="/citora/faq">{t.nav.faq}</Link>
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
