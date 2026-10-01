'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { DICT, type Locale } from './i18n';

const KEY = 'wlang';
const EVENT = 'wlang-change';

function normalize(v: string | null): Locale {
  if (v === 'zh-TW' || v === 'zh') return 'zh-TW'; // 'zh' was the previous site's value
  if (v === 'zh-CN') return 'zh-CN';
  return 'en';
}

let memory: Locale | null = null;

function read(): Locale {
  if (memory) return memory;
  try {
    return normalize(window.localStorage.getItem(KEY));
  } catch {
    return 'en';
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, read, () => 'en' as Locale);
  const setLocale = useCallback((l: Locale) => {
    memory = l;
    // Set <html lang> synchronously so the CJK typography rules (html:lang(...)) apply in the same frame.
    document.documentElement.lang = l;
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* storage unavailable: still switch for this page view */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return { locale, setLocale, t: DICT[locale] };
}
