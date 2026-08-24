'use client';

import { useI18n } from '@/lib/i18n/context';

export function FeatureFollowup() {
  const { t } = useI18n();

  return (
    <section className="imob-feature imob-feature--tight-bottom">
      <div className="imob-feature__text" data-fx="slide-left">
        <div className="imob-feature__icon" aria-hidden="true">
          <img src="/assets/imob/icon-activity.svg" alt="" />
        </div>
        <p className="imob-feature__title">{t('feature3.title')}</p>
        <p className="imob-feature__body">{t('feature3.body')}</p>
      </div>

      <div className="imob-feature__visual imob-feature-followup__visual" data-fx="zoom-in" data-parallax="0.1" aria-hidden="true">
        <div className="imob-followup-flow">
          <img className="imob-followup-arrow imob-followup-arrow--1" src="/assets/imob/followup-arrow.svg" alt="" />
          <img className="imob-followup-arrow imob-followup-arrow--2" src="/assets/imob/followup-arrow.svg" alt="" />

          <div className="imob-followup-card imob-followup-card--trigger">
            <div className="imob-followup-card__head">
              TRIGGER · When
              <img src="/assets/imob/icon-filter-mini.svg" alt="" />
            </div>
            <div className="imob-followup-card__body">
              <span className="imob-followup-card__icon">
                <img src="/assets/imob/icon-message-text.svg" alt="" />
              </span>
              <span>
                <span className="imob-followup-card__label">Message text contains</span>
                <span className="imob-followup-card__value">Hello, hi</span>
              </span>
            </div>
          </div>

          <div className="imob-followup-card imob-followup-card--condition">
            <div className="imob-followup-card__head">
              CONDITION
              <img src="/assets/imob/icon-mind-map.svg" alt="" />
            </div>
            <div className="imob-followup-card__body">
              <span className="imob-followup-card__icon">
                <img src="/assets/imob/icon-clock.svg" alt="" />
              </span>
              <span className="imob-followup-card__value">During business hours</span>
            </div>
          </div>

          <div className="imob-followup-card imob-followup-card--action">
            <div className="imob-followup-card__head">
              ACTION · Step
              <img src="/assets/imob/icon-flash.svg" alt="" />
            </div>
            <div className="imob-followup-card__body">
              <span className="imob-followup-card__icon">
                <img className="imob-followup-avatar" src="/assets/imob/followup-avatar.png" alt="" />
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
