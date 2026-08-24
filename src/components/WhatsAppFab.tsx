'use client';

import { useI18n } from '@/lib/i18n/context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

/**
 * Floating WhatsApp contact button.
 *
 * Shown when the visitor is NOT an English-speaking US user — i.e. when
 * `language !== 'en'` OR `countryCode !== 'US'` (per product requirement).
 * `countryCode` comes from the server (middleware geo); null on localhost,
 * which counts as "not US" so the button shows in dev.
 */
export function WhatsAppFab({ countryCode }: { countryCode: string | null }) {
  const { t, language } = useI18n();

  const isUS = (countryCode || '').toUpperCase() === 'US';
  const show = language !== 'en' || !isUS;
  if (!show) return null;

  const href = buildWhatsAppUrl(t('whatsapp.text'));
  const label = t('whatsapp.label');

  return (
    <a
      className="wa-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <svg className="wa-fab__icon" viewBox="0 0 24 24" aria-hidden="true">
        <use href="#i-whatsapp" />
      </svg>
      <span className="wa-fab__label">{label}</span>
    </a>
  );
}
