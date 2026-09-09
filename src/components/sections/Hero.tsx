'use client';

import type { ReactNode } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { buildSignUpUrl, trackSignUpClick } from '@/lib/analytics';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const STARS = [0, 1, 2, 3, 4];

interface HeroProps {
  // Rendered by the server (see HeroCasa.tsx) and passed down rather than
  // imported directly: Hero is a client component, and inlining the house's
  // ~800KB of markup into a client module would ship it as JS on top of the
  // HTML it's already in. Passed as a prerendered element instead of a raw
  // HTML string so this file never needs dangerouslySetInnerHTML.
  casa: ReactNode;
}

export function Hero({ casa }: HeroProps) {
  const { t, language } = useI18n();
  const whatsappHref = buildWhatsAppUrl(t('whatsapp.consultText'));

  return (
    <section className="imob-hero" id="solucoes">
      <div className="imob-container imob-hero__inner">
        <div className="imob-hero__content">
          <span className="imob-hero__badge" data-reveal data-reveal-blur="off">
            <span className="imob-hero__badge__dot" aria-hidden="true"></span>
            <span className="imob-hero__badge__text">{t('hero.badge')}</span>
          </span>

          {/* No blur, no [data-reveal]: each line rises into view on its own,
              masked by an overflow-hidden wrapper (SplitText's `mask: 'lines'`)
              rather than faded — see setupLineReveal in ScrollFx.tsx. */}
          {/* `key` forces a full remount on language change: SplitText (see
              TextReveal) detaches this element's children from React's
              tracking, so a translation change would otherwise silently
              update an orphaned copy instead of what's on screen. */}
          <h1 key={language} className="imob-hero__title" data-fx="line-reveal">
            <span className="imob-hero__title__accent">{t('hero.titleA')}</span>
            {t('hero.titleB')}
          </h1>

          <p className="imob-hero__sub" data-reveal data-reveal-blur="off" data-reveal-delay="100">
            {t('hero.sub')}
          </p>

          <div className="imob-hero__cta" data-reveal data-reveal-blur="off" data-reveal-delay="150">
            <a
              className="imob-btn imob-btn--primary imob-btn--lg"
              href={buildSignUpUrl('hero', language)}
              onClick={() => trackSignUpClick('hero')}
            >
              {t('hero.cta1')}
            </a>
            <a
              className="imob-btn imob-btn--secondary imob-btn--lg"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('hero.cta2')}
            </a>
          </div>

          <div className="imob-hero__proof" data-reveal data-reveal-blur="off" data-reveal-delay="200">
            <span className="imob-hero__stars" aria-hidden="true">
              {STARS.map((i) => (
                <img key={i} src="/assets/imob/hero-star.svg" alt="" width={16} height={16} decoding="async" />
              ))}
            </span>
            <span className="imob-hero__proof__text">{t('hero.proof')}</span>
          </div>
        </div>

        {/* Deliberately not a `[data-reveal]` target: the house draws itself on,
            pencil-sketch style, from a <style> block baked into `casa`'s inlined
            SVG (see HeroCasa.tsx / scripts/animate-casa.mjs) — that drawing *is*
            the entrance, and it starts the moment the browser paints rather than
            waiting on hydration. The two figures then walk in once the line work
            is done (`imob-casa-figure` in globals.css). */}
        <div className="imob-hero__illustration" aria-hidden="true">
          <div className="imob-hero__illustration-inner">
            {casa}
            <img className="imob-hero__homi" src="/assets/imob/hero-homi.svg" alt="" decoding="async" fetchPriority="high" />
            <img className="imob-hero__homi2" src="/assets/imob/hero-homi2.svg" alt="" decoding="async" fetchPriority="high" />
          </div>
        </div>
      </div>
    </section>
  );
}
