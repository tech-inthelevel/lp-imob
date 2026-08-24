'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  translations,
  HTML_LANG,
  DEFAULT_LANG,
  type LanguageCode,
} from './translations';

const STORAGE_KEY = 'jsynq.lang';
const COOKIE_KEY = 'language';

function isLang(value: string | null | undefined): value is LanguageCode {
  return value === 'pt' || value === 'en' || value === 'es';
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

/**
 * Detection priority (aligned with LPJSYNQ):
 * 1. URL query (?lang | ?language | ?l)
 * 2. `language` cookie (set by middleware.ts from Accept-Language)
 * 3. localStorage preference
 * 4. navigator.language
 * 5. default ('pt')
 */
function detectLanguage(): LanguageCode {
  if (typeof window === 'undefined') return DEFAULT_LANG;

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('lang') || params.get('language') || params.get('l');
  if (isLang(fromQuery)) return fromQuery;

  const fromCookie = readCookie(COOKIE_KEY);
  if (isLang(fromCookie)) return fromCookie;

  const fromStorage = localStorage.getItem(STORAGE_KEY);
  if (isLang(fromStorage)) return fromStorage;

  const nav = (navigator.language || '').toLowerCase();
  if (nav.startsWith('en')) return 'en';
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('pt')) return 'pt';

  return DEFAULT_LANG;
}

interface I18nContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Render the server default first so SSR markup matches the first client
  // render, then resolve the real language after mount (no hydration mismatch).
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANG);

  useEffect(() => {
    const detected = detectLanguage();
    setLanguageState(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language] || HTML_LANG[DEFAULT_LANG];
  }, [language]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    // Persist for the middleware so it stays consistent on the next request.
    document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language]?.[key] ?? translations[DEFAULT_LANG][key] ?? key;
    },
    [language],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
