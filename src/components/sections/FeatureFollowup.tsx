'use client';

import { useI18n } from '@/lib/i18n/context';

/**
 * Bezier connectors between the cascading cards, anchored to their actual
 * rendered edges (measured from `.imob-followup-flow`'s 502x255.5 box):
 * exit the bottom of the upstream card, enter the left edge of the
 * downstream one. Built as real stroked paths — not the decorative Figma
 * export (a filled dash shape) — so ScrollFx can measure their true length
 * and animate stroke-dashoffset for a genuine "drawing in" / flowing look.
 */
const LINE_1 = { d: 'M108 83.59 C108 115.59 119 116 151 116', from: [108, 83.59] as const, to: [151, 116] as const };
const LINE_2 = { d: 'M259 170.5 C259 202.5 270 205.5 302 205.5', from: [259, 170.5] as const, to: [302, 205.5] as const };

export function FeatureFollowup() {
  const { t } = useI18n();

  return (
    <section className="imob-feature imob-feature--tight-bottom">
      <div className="imob-feature__text" data-fx="slide-left">
        <div className="imob-feature__icon" aria-hidden="true">
          <img src="/assets/imob/icon-activity.svg" alt="" loading="lazy" decoding="async" />
        </div>
        <p className="imob-feature__title">{t('feature3.title')}</p>
        <p className="imob-feature__body">{t('feature3.body')}</p>
      </div>

      <div className="imob-feature__visual imob-feature-followup__visual" data-parallax="0.1" aria-hidden="true">
        <div className="imob-followup-flow">
          <svg className="imob-followup-lines" viewBox="0 0 502 255.5">
            {[LINE_1, LINE_2].map((line, i) => (
              <g key={i}>
                <path className="imob-followup-line__reveal" d={line.d} />
                <path className="imob-followup-line__flow" d={line.d} />
                <circle className="imob-followup-line__port" cx={line.from[0]} cy={line.from[1]} r={3.5} />
                <circle className="imob-followup-line__port" cx={line.to[0]} cy={line.to[1]} r={3.5} />
              </g>
            ))}
          </svg>

          <div className="imob-followup-card imob-followup-card--trigger" data-fx="followup-card">
            <div className="imob-followup-card__head">
              TRIGGER · When
              <img src="/assets/imob/icon-filter-mini.svg" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="imob-followup-card__body">
              <span className="imob-followup-card__icon">
                <img src="/assets/imob/icon-message-text.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span>
                <span className="imob-followup-card__label">Message text contains</span>
                <span className="imob-followup-card__value">Hello, hi</span>
              </span>
            </div>
          </div>

          <div className="imob-followup-card imob-followup-card--condition" data-fx="followup-card">
            <div className="imob-followup-card__head">
              CONDITION
              <img src="/assets/imob/icon-mind-map.svg" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="imob-followup-card__body">
              <span className="imob-followup-card__icon">
                <img src="/assets/imob/icon-clock.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-followup-card__value">During business hours</span>
            </div>
          </div>

          <div className="imob-followup-card imob-followup-card--action" data-fx="followup-card">
            <div className="imob-followup-card__head">
              ACTION · Step
              <img src="/assets/imob/icon-flash.svg" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="imob-followup-card__body">
              <span className="imob-followup-card__icon">
                <img className="imob-followup-avatar" src="/assets/imob/followup-avatar.png" alt="" loading="lazy" decoding="async" />
              </span>
              <span>
                <span className="imob-followup-card__label">Run Workspace Agent</span>
                <span className="imob-followup-card__value">Patricia</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
