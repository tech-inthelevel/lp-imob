'use client';

import { useI18n } from '@/lib/i18n/context';

export function FeaturesIntro() {
  const { t, language } = useI18n();

  return (
    <section className="imob-features-intro" id="funcionalidades">
      <span className="imob-eyebrow" data-reveal>{t('featuresIntro.eyebrow')}</span>
      {/* `key` forces a full remount on language change — see the comment on
          the hero's <h1> in Hero.tsx for why SplitText (TextReveal) needs it. */}
      <h2 key={language} className="imob-section-title" data-fx="mask-title">
        {t('featuresIntro.title')}
      </h2>
    </section>
  );
}
