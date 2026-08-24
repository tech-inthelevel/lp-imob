'use client';

import { useI18n } from '@/lib/i18n/context';
import { useContactModal } from '@/lib/contact-modal/context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const STARS = [0, 1, 2, 3, 4];

export function Hero() {
  const { t } = useI18n();
  const { open } = useContactModal();
  const whatsappHref = buildWhatsAppUrl(t('whatsapp.consultText'));

  return (
    <section className="imob-hero" id="solucoes">
      <div className="imob-container imob-hero__inner">
        <div className="imob-hero__content">
          <span className="imob-hero__badge" data-reveal>
            <span className="imob-hero__badge__dot" aria-hidden="true"></span>
            <span className="imob-hero__badge__text">{t('hero.badge')}</span>
          </span>

          <h1 className="imob-hero__title" data-reveal data-reveal-delay="50">
            <span className="imob-hero__title__accent">{t('hero.titleA')}</span>
            {t('hero.titleB')}
          </h1>

          <p className="imob-hero__sub" data-reveal data-reveal-delay="100">
            {t('hero.sub')}
          </p>

          <div className="imob-hero__cta" data-reveal data-reveal-delay="150">
            <button
              type="button"
              className="imob-btn imob-btn--primary imob-btn--lg"
              onClick={() => open('hero')}
            >
              {t('hero.cta1')}
            </button>
            <a
              className="imob-btn imob-btn--secondary imob-btn--lg"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('hero.cta2')}
            </a>
          </div>

          <div className="imob-hero__proof" data-reveal data-reveal-delay="200">
            <span className="imob-hero__stars" aria-hidden="true">
              {STARS.map((i) => (
                <img key={i} src="/assets/imob/hero-star.svg" alt="" width={16} height={16} />
              ))}
            </span>
            <span className="imob-hero__proof__text">{t('hero.proof')}</span>
          </div>
        </div>

        <div className="imob-hero__illustration" data-reveal data-reveal-delay="250" aria-hidden="true">
          <div className="imob-hero__illustration-inner">
            <img className="imob-hero__casa" src="/assets/imob/hero-casa.svg" alt="" />
            <img className="imob-hero__homi" src="/assets/imob/hero-homi.svg" alt="" />
            <img className="imob-hero__homi2" src="/assets/imob/hero-homi2.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
