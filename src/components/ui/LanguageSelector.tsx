'use client';

import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import type { LanguageCode } from '@/lib/i18n/translations';

const OPTIONS: { code: LanguageCode; label: string }[] = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export function LanguageSelector() {
  const { setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  return (
    <div className="lang" ref={ref}>
      <button
        className="btn btn--icon"
        id="langBtn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Idioma"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>
      <ul className={`lang__menu${open ? ' open' : ''}`} id="langMenu" role="listbox">
        {OPTIONS.map((opt) => (
          <li
            key={opt.code}
            data-lang={opt.code}
            role="option"
            aria-selected={false}
            onClick={() => {
              setLanguage(opt.code);
              setOpen(false);
            }}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
