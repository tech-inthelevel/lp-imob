'use client';

import { useI18n } from '@/lib/i18n/context';

export function FeaturesIntro() {
  const { t } = useI18n();

  return (
    <section className="imob-features-intro" id="funcionalidades">
      <span className="imob-eyebrow" data-reveal>{t('featuresIntro.eyebrow')}</span>
      <h2 className="imob-section-title" data-fx="mask-title">
        {t('featuresIntro.title')}
      </h2>
    </section>
  );
}
