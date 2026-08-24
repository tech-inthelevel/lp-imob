'use client';

import { useI18n } from '@/lib/i18n/context';
import { useContactModal } from '@/lib/contact-modal/context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function Cta() {
  const { t } = useI18n();
  const { open } = useContactModal();
  const whatsappHref = buildWhatsAppUrl(t('whatsapp.consultText'));

  return (
    <section className="imob-cta">
      <div className="imob-cta__card" data-fx="zoom-in">
        <span className="imob-cta__glow" data-fx="pulse" aria-hidden="true"></span>
        <h2 className="imob-cta__title">{t('cta.title')}</h2>
        <p className="imob-cta__body">{t('cta.body')}</p>
        <div className="imob-cta__actions">
          <button type="button" className="imob-btn imob-btn--primary imob-btn--lg" onClick={() => open('cta_final')}>
            {t('cta.cta1')}
          </button>
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
