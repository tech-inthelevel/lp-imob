'use client';

import { useI18n } from '@/lib/i18n/context';

export function FeatureReports() {
  const { t } = useI18n();

  return (
    <section className="imob-feature">
      <div className="imob-feature__visual imob-feature-reports__visual" data-parallax="0.12">
        <div className="imob-feature-reports__stage" data-fx="reports">
          <div className="imob-feature-reports__frame">
            <img src="/assets/imob/reports-dashboard.png" alt="" loading="lazy" decoding="async" />
            <span className="imob-feature-reports__glare" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <div className="imob-feature__text" data-fx="slide-right">
        <div className="imob-feature__icon" aria-hidden="true">
          <img src="/assets/imob/icon-trending-up.svg" alt="" loading="lazy" decoding="async" />
        </div>
        <p className="imob-feature__title">{t('feature4.title')}</p>
        <p className="imob-feature__body">{t('feature4.body')}</p>
      </div>
    </section>
  );
}
