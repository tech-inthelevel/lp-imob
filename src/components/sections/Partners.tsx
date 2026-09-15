'use client';

import { useI18n } from '@/lib/i18n/context';

// Sizes match the Figma spec (node 1:280) — each logo keeps its own
// natural aspect ratio instead of being forced to a uniform height.
const LOGOS = [
  { slug: 'partner-calendar-v2', alt: 'Calendar', width: 88, height: 20 },
  { slug: 'partner-trello-v2', alt: 'Trello', width: 66, height: 14 },
  { slug: 'partner-salesforce-v2', alt: 'Salesforce', width: 46, height: 32 },
  { slug: 'partner-clickup-v2', alt: 'ClickUp', width: 82, height: 20 },
  { slug: 'partner-jira-v2', alt: 'Jira', width: 48, height: 20 },
];

export function Partners() {
  const { t } = useI18n();

  return (
    <section className="imob-partners" aria-label={t('partners.label')}>
      <p className="imob-partners__label">{t('partners.label')}</p>
      <div className="imob-partners__logos">
        {LOGOS.map((logo, i) => (
          <img
            key={logo.slug}
            src={`/assets/imob/${logo.slug}.webp`}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            loading="lazy"
            data-reveal
            data-reveal-delay={String(i * 40)}
          />
        ))}
      </div>
    </section>
  );
}
