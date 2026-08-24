'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { PRIVACY_POLICY_PATH } from '@/constants';

const STORAGE_KEY = 'jsynq.cookie-consent';
type Choice = 'accepted' | 'rejected';

/**
 * Cookie consent banner (LGPD/GDPR). Shows once until the visitor chooses;
 * the choice is persisted in localStorage + a 1-year cookie so analytics /
 * tooling can read it. Renders nothing on the server / before a decision is
 * known to avoid a hydration flash.
 */
export function CookieConsent() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked */
    }
    if (stored !== 'accepted' && stored !== 'rejected') setVisible(true);
  }, []);

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    document.cookie = `${STORAGE_KEY}=${choice}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie" role="dialog" aria-label={t('cookie.aria')} aria-live="polite">
      <p className="cookie__text">
        {t('cookie.text')}{' '}
        <a className="cookie__link" href={PRIVACY_POLICY_PATH}>
          {t('cookie.privacy')}
        </a>
        .
      </p>
      <div className="cookie__actions">
        <button type="button" className="btn btn--ghost" onClick={() => decide('rejected')}>
          {t('cookie.reject')}
        </button>
        <button type="button" className="btn btn--primary" onClick={() => decide('accepted')}>
          {t('cookie.accept')}
        </button>
      </div>
    </div>
  );
}
