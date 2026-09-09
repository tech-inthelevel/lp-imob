'use client';

import { useI18n } from '@/lib/i18n/context';
import { buildSignUpUrl, trackSignUpClick } from '@/lib/analytics';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function Cta() {
  const { t, language } = useI18n();
  const whatsappHref = buildWhatsAppUrl(t('whatsapp.consultText'));

  return (
    <section className="imob-cta">
      <div className="imob-cta__card" data-fx="zoom-in">
        <span className="imob-cta__glow" data-fx="pulse" aria-hidden="true"></span>
        <h2 className="imob-cta__title">{t('cta.title')}</h2>
        <p className="imob-cta__body">{t('cta.body')}</p>
        <div className="imob-cta__actions">
          <a className="imob-btn imob-btn--primary imob-btn--lg" href={buildSignUpUrl('cta_final', language)} onClick={() => trackSignUpClick('cta_final')}>
            {t('cta.cta1')}
          </a>
          <a
            className="imob-btn imob-btn--secondary imob-btn--lg"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('cta.cta2')}
          </a>
        </div>
        <p className="imob-cta__note">{t('cta.note')}</p>
      </div>
    </section>
  );
}
