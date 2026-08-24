'use client';

import type { CSSProperties } from 'react';
import { useI18n } from '@/lib/i18n/context';

const ART = '/assets/imob/how';

/**
 * The elbow every channel connector is drawn from (identical `d` in
 * c1-curve-410/411/412/413). Reused as an `offset-path` so ScrollFx can run a
 * data packet along the *real* stroke instead of an approximation of it.
 *
 * Each curve box is placed so this path starts at the AI badge and ends at
 * the channel icon — offset-distance 0% is always the hub, 100% the node.
 */
const ELBOW =
  "path('M0.75 45.158H35.0299C41.9143 45.158 47.4953 39.577 47.4953 32.6926V13.2154C47.4953 6.33096 53.0762 0.75 59.9607 0.75H94.2405')";

function packetStyle(color: string): CSSProperties {
  return { offsetPath: ELBOW, color };
}

/**
 * Figma node 1:434 (section-how-it-works).
 *
 * The three step visuals are the designer's own exported assets — the
 * gradient "chip pin" strokes, the elbow connectors, the radar rings and
 * the street-grid lines all come out of Figma as SVG/PNG rather than being
 * approximated with CSS shapes, so the section matches the design exactly.
 *
 * Every art layer keeps its Figma coordinate inside a fixed 340x152 stage
 * (see `.imob-step-card__art` in globals.css), which is uniformly scaled
 * down when the card gets narrower than its 340px design width.
 */
export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="imob-how" id="como-funciona">
      <div className="imob-how__header">
        <span className="imob-eyebrow" data-reveal>{t('how.eyebrow')}</span>
        <h2 className="imob-how__title" data-reveal data-reveal-delay="50">{t('how.title')}</h2>
      </div>

      <div className="imob-how__grid" data-fx-group="cards">
        {/* Step 1 — Conecte seus Canais (node 1:439) */}
        <div className="imob-step-card" data-fx="card">
          <div className="imob-step-card__visual imob-step-card__visual--open">
            <div className="imob-step-card__art imob-how-connect" aria-hidden="true">
              {/* chip pins above / below the AI badge (nodes 1:441–1:446) */}
              <span className="imob-how-connect__pin imob-how-connect__pin--thin" style={{ left: 186.5, top: 20.45 }}>
                <img src={`${ART}/c1-tick-419.svg`} alt="" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 170.5, top: 20.45 }}>
                <img src={`${ART}/c1-tick-418.svg`} alt="" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 154.5, top: 20.45 }}>
                <img src={`${ART}/c1-tick-418.svg`} alt="" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 154.5, top: 107.45 }}>
                <img src={`${ART}/c1-tick-415.svg`} alt="" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 170.5, top: 107.45 }}>
                <img src={`${ART}/c1-tick-415.svg`} alt="" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 186.5, top: 107.45 }}>
                <img src={`${ART}/c1-tick-415.svg`} alt="" />
              </span>

              {/* elbow connectors + straight runs into the badge (1:449–1:464).
                  Four of them carry a packet that ScrollFx sends hub → icon. */}
              <span className="imob-how-connect__curve imob-how-connect__curve--flip-x" style={{ left: 43.87, top: 19.12 }}>
                <img src={`${ART}/c1-curve-411.svg`} alt="" />
                <span className="imob-how-connect__packet" data-packet="filter" style={packetStyle('#ff7575')}>
                  <span className="imob-how-connect__packet-dot" />
                </span>
              </span>
              <span className="imob-how-connect__curve imob-how-connect__curve--rot180" style={{ left: 43.87, top: 88.46 }}>
                <img src={`${ART}/c1-curve-413.svg`} alt="" />
                <span className="imob-how-connect__packet" data-packet="instagram" style={packetStyle('#976df7')}>
                  <span className="imob-how-connect__packet-dot" />
                </span>
              </span>
              <span className="imob-how-connect__curve imob-how-connect__curve--rot180" style={{ left: 43.87, top: 88.46 }}>
                <img src={`${ART}/c1-curve-414.svg`} alt="" />
              </span>
              <span className="imob-how-connect__curve" style={{ left: 199.69, top: 19.26 }}>
                <img src={`${ART}/c1-curve-410.svg`} alt="" />
                <span className="imob-how-connect__packet" data-packet="whatsapp" style={packetStyle('#059669')}>
                  <span className="imob-how-connect__packet-dot" />
                </span>
              </span>
              <span className="imob-how-connect__curve imob-how-connect__curve--flip-y" style={{ left: 199.69, top: 88.6 }}>
                <img src={`${ART}/c1-curve-412.svg`} alt="" />
                <span className="imob-how-connect__packet" data-packet="sms" style={packetStyle('#64a0d8')}>
                  <span className="imob-how-connect__packet-dot" />
                </span>
              </span>
              <span className="imob-how-connect__line" style={{ left: 6.47 }}>
                <img src={`${ART}/c1-line-416.svg`} alt="" />
              </span>
              <span className="imob-how-connect__line" style={{ left: 199.69 }}>
                <img src={`${ART}/c1-line-417.svg`} alt="" />
              </span>

              {/* channel nodes (1:450 / 1:456 / 1:460 / 1:465) */}
              <span className="imob-how-connect__node imob-how-connect__node--filter" style={{ left: 14.53, top: 0.49 }}>
                <img src={`${ART}/c1-icon-filter.svg`} alt="" />
              </span>
              <span className="imob-how-connect__node imob-how-connect__node--instagram" style={{ left: 14.53, top: 112.49 }}>
                <img src={`${ART}/c1-icon-instagram.svg`} alt="" />
              </span>
              <span className="imob-how-connect__node imob-how-connect__node--whatsapp" style={{ left: 286.53, top: -0.49 }}>
                <img src={`${ART}/c1-icon-whatsapp.svg`} alt="" />
              </span>
              <span className="imob-how-connect__node imob-how-connect__node--sms" style={{ left: 286.03, top: 110.93 }}>
                <img src={`${ART}/c1-icon-sms.svg`} alt="" />
              </span>

              {/* JSYNQ AI badge (1:467) */}
              <span className="imob-how-connect__hub">
                <img src={`${ART}/c1-jsynq-ai.svg`} alt="" />
              </span>
            </div>
          </div>
          <h3 className="imob-step-card__title">
            <span className="imob-step-card__num">1.</span> {t('how.step1Title')}
          </h3>
          <p className="imob-step-card__body">{t('how.step1Body')}</p>
        </div>

        {/* Step 2 — AI Qualifica os Leads (node 1:476) */}
        <div className="imob-step-card" data-fx="card">
          <div className="imob-step-card__visual">
            <div className="imob-step-card__art imob-how-radar" aria-hidden="true">
              <span className="imob-how-radar__disc">
                <img src={`${ART}/c2-ellipse-22005.svg`} alt="" />
              </span>
              <span className="imob-how-radar__disc">
                <img src={`${ART}/c2-ellipse-22004.png`} alt="" width={300} height={150} />
              </span>
              <span className="imob-how-radar__rings">
                <img src={`${ART}/c2-strokes.svg`} alt="" />
              </span>
              <span className="imob-how-radar__sweep">
                <img src={`${ART}/c2-vector-426.svg`} alt="" />
              </span>
              <span className="imob-how-radar__baseline">
                <img src={`${ART}/c2-vector-429.svg`} alt="" />
              </span>

              <span className="imob-how-radar__dot" style={{ left: 42.5, top: 98.45 }}>
                <img src={`${ART}/c2-icon-check.svg`} alt="" />
              </span>
              <span className="imob-how-radar__dot" style={{ left: 116.5, top: 97.45 }}>
                <img src={`${ART}/c2-icon-check.svg`} alt="" />
              </span>
              <span className="imob-how-radar__dot" style={{ left: 192.5, top: 58.45 }}>
                <img src={`${ART}/c2-icon-check.svg`} alt="" />
              </span>
              <span className="imob-how-radar__dot imob-how-radar__dot--bad" style={{ left: 128.5, top: 28.45 }}>
                <img src={`${ART}/c2-icon-close.svg`} alt="" />
              </span>

              <img className="imob-how-radar__avatar" style={{ left: 268.5, top: 82.45 }} src={`${ART}/c2-avatar-a.png`} alt="" width={24} height={24} />
              <img className="imob-how-radar__avatar" style={{ left: 212.5, top: 132.45 }} src={`${ART}/c2-avatar-b.png`} alt="" width={24} height={24} />
            </div>
          </div>
          <h3 className="imob-step-card__title">
            <span className="imob-step-card__num">2.</span> {t('how.step2Title')}
          </h3>
          <p className="imob-step-card__body">{t('how.step2Body')}</p>
        </div>

        {/* Step 3 — Você Fecha os Negócios (node 1:502) */}
        <div className="imob-step-card" data-fx="card">
          <div className="imob-step-card__visual imob-step-card__visual--panel">
            <div className="imob-step-card__art imob-how-agenda" aria-hidden="true">
              <span className="imob-how-agenda__map">
                <img src={`${ART}/c3-map-lines.svg`} alt="" />
              </span>

              <span className="imob-how-agenda__num" style={{ left: -10.5, top: 49.45, width: 18.896, height: 19.691 }}><b>01</b></span>
              <span className="imob-how-agenda__num" style={{ left: 112.5, top: 25.45, width: 20.861, height: 20.065 }}><b>02</b></span>
              <span className="imob-how-agenda__num" style={{ left: 134.5, top: 133.45, width: 20.861, height: 20.065 }}><b>09</b></span>
              <span className="imob-how-agenda__num" style={{ left: 219.5, top: 4.45, width: 20.861, height: 20.065 }}><b>03</b></span>
              <span className="imob-how-agenda__num" style={{ left: 241.5, top: 112.82, width: 18.896, height: 19.691 }}><b>10</b></span>

              {/* The outer span holds the Figma placement + tilt; the face is
                  what ScrollFx flies in, so the two never fight over transform. */}
              <span className="imob-how-agenda__card imob-how-agenda__card--back1">
                <span className="imob-how-agenda__card-face" />
              </span>
              <span className="imob-how-agenda__card imob-how-agenda__card--back2">
                <span className="imob-how-agenda__card-face" />
              </span>
              <span className="imob-how-agenda__card imob-how-agenda__card--front">
                <span className="imob-how-agenda__card-face">
                  <em className="imob-how-agenda__date">02 de Ago, às 14:00</em>
                  <em className="imob-how-agenda__label">Visita agendada com o cliente John Doe</em>
                </span>
              </span>
            </div>
          </div>
          <h3 className="imob-step-card__title">
            <span className="imob-step-card__num">3.</span> {t('how.step3Title')}
          </h3>
          <p className="imob-step-card__body">{t('how.step3Body')}</p>
        </div>
      </div>
    </section>
  );
}
