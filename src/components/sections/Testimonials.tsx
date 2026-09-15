'use client';

import { Fragment } from 'react';
import { useI18n } from '@/lib/i18n/context';

const CARDS = [
  { avatar: 'testimonial-avatar-1', quoteKey: 'testimonials.quote1', nameKey: 'testimonials.author1', roleKey: 'testimonials.role1' },
  { avatar: 'testimonial-avatar-2', quoteKey: 'testimonials.quote2', nameKey: 'testimonials.author2', roleKey: 'testimonials.role2' },
  { avatar: 'avatar-4', quoteKey: 'testimonials.quote3', nameKey: 'testimonials.author3', roleKey: 'testimonials.role3' },
] as const;

/**
 * Figma 76:2159 highlights the middle testimonial: it is 450px tall against
 * the others' 400px, vertically centred so it overhangs top and bottom, and
 * carries the only drop shadow in the row.
 */
const FEATURED_INDEX = 1;

/** Renders the `**...**` spans translators use to mark a quote's punchline. */
function withHighlight(quote: string) {
  return quote.split(/\*\*(.+?)\*\*/g).map((part, i) => (
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>
  ));
}

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="imob-testimonials">
      <div className="imob-testimonials__header">
        <span className="imob-eyebrow" data-reveal>{t('testimonials.eyebrow')}</span>
        <h2 className="imob-testimonials__title" data-reveal data-reveal-delay="50">{t('testimonials.title')}</h2>
      </div>

      <div className="imob-testimonials__grid" data-fx-group="cards">
        {CARDS.map((card, i) => (
          <figure
            key={card.quoteKey}
            className={`imob-testimonial-card${i === FEATURED_INDEX ? ' imob-testimonial-card--featured' : ''}`}
            data-fx="card"
          >
            <blockquote className="imob-testimonial-card__quote">
              &ldquo;{withHighlight(t(card.quoteKey))}&rdquo;
            </blockquote>
            <figcaption className="imob-testimonial-card__author">
              <img src={`/assets/imob/${card.avatar}.webp`} alt="" width={48} height={48} loading="lazy" decoding="async" />
              <div>
                <p className="imob-testimonial-card__name">{t(card.nameKey)}</p>
                <p className="imob-testimonial-card__role">{t(card.roleKey)}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
