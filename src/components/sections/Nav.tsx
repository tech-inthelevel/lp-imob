'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { buildSignUpUrl, trackSignUpClick } from '@/lib/analytics';

const NAV_LINKS: { href: string; key: string }[] = [
  { href: '#solucoes', key: 'nav.solucoes' },
  { href: '#funcionalidades', key: 'nav.funcionalidades' },
  { href: '#como-funciona', key: 'nav.comoFunciona' },
];

export function Nav() {
  const { t, language } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="imob-header" id="nav">
      <div className="imob-header__inner">
        <a className="imob-header__logo" href="#top" aria-label="JSYNQ Imob">
          <svg viewBox="0 0 331 40" aria-hidden="true">
            <use href="#logo-lockup" />
          </svg>
        </a>

        <nav className="imob-nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="imob-header__actions">
          <LanguageSelector />
          <a
            className="imob-btn imob-btn--primary imob-btn--header"
            href={buildSignUpUrl('nav', language)}
            onClick={() => trackSignUpClick('nav')}
          >
            {t('nav.cta')}
          </a>
          <button
            type="button"
            className="imob-nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="navMobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`imob-nav-mobile${open ? ' is-open' : ''}`} id="navMobile">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {t(l.key)}
          </a>
        ))}
        <div className="imob-nav-mobile__actions">
          <a
            className="imob-btn imob-btn--primary imob-btn--block imob-btn--sm"
            href={buildSignUpUrl('nav_mobile', language)}
            onClick={() => {
              setOpen(false);
              trackSignUpClick('nav_mobile');
            }}
          >
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </header>
  );
}
