'use client';

import { useI18n } from '@/lib/i18n/context';
import { useContactModal } from '@/lib/contact-modal/context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const TIMELINE = [
  { titleKey: 'feature5.t1', dateKey: 'feature5.t1d', done: true },
  { titleKey: 'feature5.t2', dateKey: 'feature5.t2d', done: true },
  { titleKey: 'feature5.t3', dateKey: 'feature5.t3d', done: true },
  { titleKey: 'feature5.t4', dateKey: 'feature5.t4d', done: true },
  { titleKey: 'feature5.t5', dateKey: 'feature5.t5d', done: false },
] as const;

export function FeatureHistory() {
  const { t } = useI18n();
  const { open } = useContactModal();
  const whatsappHref = buildWhatsAppUrl(t('whatsapp.consultText'));

  return (
    <section className="imob-feature imob-feature-history">
      <div className="imob-feature__text" data-fx="slide-left">
        <div className="imob-feature__icon" aria-hidden="true">
          <img src="/assets/imob/icon-shield.svg" alt="" />
        </div>
        <p className="imob-feature__title">{t('feature5.title')}</p>
        <p className="imob-feature__body">{t('feature5.body')}</p>
        <div className="imob-feature__actions">
          <button type="button" className="imob-btn imob-btn--primary imob-btn--sm" onClick={() => open('feature_history')}>
            {t('feature5.cta1')}
          </button>
          <a
            className="imob-btn imob-btn--secondary imob-btn--sm"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('feature5.cta2')}
          </a>
        </div>
      </div>

      <div className="imob-feature__visual imob-feature-history__visual" data-fx="zoom-in" data-parallax="0.1">
        {TIMELINE.map((item, i) => {
          // Figma 1:404: the connector running *into* a not-yet-done step is
          // drawn in neutral, not green — the trail stops where the AI does.
          const nextPending = TIMELINE[i + 1] ? !TIMELINE[i + 1].done : false;

          return (
            <div
              key={item.titleKey}
              className={[
                'imob-history-item',
                item.done ? '' : 'imob-history-item--pending',
                nextPending ? 'imob-history-item--trail-idle' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="imob-history-item__row">
                <span className="imob-history-item__dot" aria-hidden="true">
                  <img src={`/assets/imob/${item.done ? 'icon-check-mark' : 'icon-clock'}.svg`} alt="" />
                </span>
                <p className="imob-history-item__title">{t(item.titleKey)}</p>
              </div>
              <p className="imob-history-item__date">{t(item.dateKey)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
