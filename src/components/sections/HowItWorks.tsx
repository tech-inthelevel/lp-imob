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
 * The radar's lit trail — Figma's half-disc filled with an *angular*
 * gradient: transparent at the tail, opaque dark green at the head. Spin
 * that gradient and the dark head rides under the pointer while the tail
 * fades out behind it, which is the sweep effect itself — no masking or
 * per-frame angle maths needed.
 *
 * Note what spins: the `.imob-how-radar__trail-spin` group *inside* the
 * clip, not the SVG as a whole. Rotating the whole thing turns the
 * half-disc's silhouette too, so its flat edge tilts away from the dish's
 * own horizontal baseline and the shape visibly detaches from the grey
 * dish under it. Keeping the clip path still and spinning only the fill
 * leaves the silhouette exactly where Figma put it.
 *
 * Inlined rather than referenced with `<img src>` on purpose: Figma renders
 * angular gradients via `<foreignObject>` wrapping an HTML div with a CSS
 * conic-gradient, and an SVG loaded as an image is parsed in secure static
 * mode, where that HTML subtree simply isn't rendered. Inline in the
 * document it paints normally (verified: the div's computed
 * background-image resolves to the conic-gradient).
 */
const RADAR_TRAIL_SVG = `<svg width="300" height="150" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#radar-trail-clip)"><g class="imob-how-radar__trail-spin"><g transform="matrix(0.099 -0.1145 0.1145 0.099 150 150)"><foreignObject x="-1403.19" y="-1403.19" width="2806.38" height="2806.38"><div xmlns="http://www.w3.org/1999/xhtml" style="background:conic-gradient(from 90deg,rgba(122, 185, 164, 0) 0deg,rgba(94, 185, 155, 0.4) 291.697deg,rgba(48, 185, 139, 0.8) 337.174deg,rgba(16, 185, 129, 0.9) 346.075deg,rgba(6, 99, 70, 1) 360deg);height:100%;width:100%"></div></foreignObject></g></g></g>
<defs><clipPath id="radar-trail-clip"><path d="M300 150C300 130.302 296.12 110.796 288.582 92.5975C281.044 74.3986 269.995 57.8628 256.066 43.934C242.137 30.0052 225.601 18.9563 207.403 11.4181C189.204 3.87986 169.698 -8.61039e-07 150 0C130.302 8.61039e-07 110.796 3.87987 92.5975 11.4181C74.3986 18.9563 57.8628 30.0052 43.934 43.934C30.0052 57.8628 18.9563 74.3987 11.4181 92.5975C3.87986 110.796 -1.72208e-06 130.302 0 150L150 150H300Z"/></clipPath></defs>
</svg>`;

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
                <img src={`${ART}/c1-tick-419.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 170.5, top: 20.45 }}>
                <img src={`${ART}/c1-tick-418.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 154.5, top: 20.45 }}>
                <img src={`${ART}/c1-tick-418.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 154.5, top: 107.45 }}>
                <img src={`${ART}/c1-tick-415.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 170.5, top: 107.45 }}>
                <img src={`${ART}/c1-tick-415.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__pin imob-how-connect__pin--thick" style={{ left: 186.5, top: 107.45 }}>
                <img src={`${ART}/c1-tick-415.svg`} alt="" loading="lazy" decoding="async" />
              </span>

              {/* elbow connectors + straight runs into the badge (1:449–1:464).
                  Four of them carry a packet that ScrollFx sends hub → icon. */}
              <span className="imob-how-connect__curve imob-how-connect__curve--flip-x" style={{ left: 43.87, top: 19.12 }}>
                <img src={`${ART}/c1-curve-411.svg`} alt="" loading="lazy" decoding="async" />
                <span className="imob-how-connect__packet" data-packet="filter" style={packetStyle('#ff7575')}>
                  <span className="imob-how-connect__packet-dot" />
                </span>
              </span>
              <span className="imob-how-connect__curve imob-how-connect__curve--rot180" style={{ left: 43.87, top: 88.46 }}>
                <img src={`${ART}/c1-curve-413.svg`} alt="" loading="lazy" decoding="async" />
                <span className="imob-how-connect__packet" data-packet="instagram" style={packetStyle('#976df7')}>
                  <span className="imob-how-connect__packet-dot" />
                </span>
              </span>
              <span className="imob-how-connect__curve imob-how-connect__curve--rot180" style={{ left: 43.87, top: 88.46 }}>
                <img src={`${ART}/c1-curve-414.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__curve" style={{ left: 199.69, top: 19.26 }}>
                <img src={`${ART}/c1-curve-410.svg`} alt="" loading="lazy" decoding="async" />
                <span className="imob-how-connect__packet" data-packet="whatsapp" style={packetStyle('#059669')}>
                  <span className="imob-how-connect__packet-dot" />
                </span>
              </span>
              <span className="imob-how-connect__curve imob-how-connect__curve--flip-y" style={{ left: 199.69, top: 88.6 }}>
                <img src={`${ART}/c1-curve-412.svg`} alt="" loading="lazy" decoding="async" />
                <span className="imob-how-connect__packet" data-packet="sms" style={packetStyle('#64a0d8')}>
                  <span className="imob-how-connect__packet-dot" />
                </span>
              </span>
              <span className="imob-how-connect__line" style={{ left: 6.47 }}>
                <img src={`${ART}/c1-line-416.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__line" style={{ left: 199.69 }}>
                <img src={`${ART}/c1-line-417.svg`} alt="" loading="lazy" decoding="async" />
              </span>

              {/* channel nodes (1:450 / 1:456 / 1:460 / 1:465) */}
              <span className="imob-how-connect__node imob-how-connect__node--filter" style={{ left: 14.53, top: 0.49 }}>
                <img src={`${ART}/c1-icon-filter.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__node imob-how-connect__node--instagram" style={{ left: 14.53, top: 112.49 }}>
                <img src={`${ART}/c1-icon-instagram.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__node imob-how-connect__node--whatsapp" style={{ left: 286.53, top: -0.49 }}>
                <img src={`${ART}/c1-icon-whatsapp.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-connect__node imob-how-connect__node--sms" style={{ left: 286.03, top: 110.93 }}>
                <img src={`${ART}/c1-icon-sms.svg`} alt="" loading="lazy" decoding="async" />
              </span>

              {/* JSYNQ AI badge (1:467) */}
              <span className="imob-how-connect__hub">
                <img src={`${ART}/c1-jsynq-ai.svg`} alt="" loading="lazy" decoding="async" />
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
              {/* Unswept ground. */}
              <span className="imob-how-radar__disc">
                <img src={`${ART}/c2-ellipse-22005.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              {/* Lit trail: silhouette fixed, gradient spun — see RADAR_TRAIL_SVG. */}
              <span
                className="imob-how-radar__trail"
                dangerouslySetInnerHTML={{ __html: RADAR_TRAIL_SVG }}
              />
              {/* Concentric range rings stay put; the beam group below turns. */}
              <span className="imob-how-radar__rings">
                <img src={`${ART}/c2-rings.svg`} alt="" loading="lazy" decoding="async" />
              </span>

              {/* Beam = the filled wedge plus the two spoke lines that read as
                  its pointer. They were baked into the same export as the
                  rings, which is why the pointer used to stay behind while the
                  fill swept away from it. Split out so they share one rotation
                  about the dish centre and keep their Figma angles relative to
                  each other. */}
              <span className="imob-how-radar__beam">
                <span className="imob-how-radar__spokes">
                  <img src={`${ART}/c2-spokes.svg`} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="imob-how-radar__sweep">
                  <img src={`${ART}/c2-vector-426.svg`} alt="" loading="lazy" decoding="async" />
                </span>
              </span>
              <span className="imob-how-radar__baseline">
                <img src={`${ART}/c2-vector-429.svg`} alt="" loading="lazy" decoding="async" />
              </span>

              <span className="imob-how-radar__dot" style={{ left: 42.5, top: 98.45 }}>
                <img src={`${ART}/c2-icon-check.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-radar__dot" style={{ left: 116.5, top: 97.45 }}>
                <img src={`${ART}/c2-icon-check.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-radar__dot" style={{ left: 192.5, top: 58.45 }}>
                <img src={`${ART}/c2-icon-check.svg`} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="imob-how-radar__dot imob-how-radar__dot--bad" style={{ left: 128.5, top: 28.45 }}>
                <img src={`${ART}/c2-icon-close.svg`} alt="" loading="lazy" decoding="async" />
              </span>

              <img className="imob-how-radar__avatar" style={{ left: 268.5, top: 82.45 }} src={`${ART}/c2-avatar-a.png`} alt="" width={24} height={24} loading="lazy" decoding="async" />
              <img className="imob-how-radar__avatar" style={{ left: 212.5, top: 132.45 }} src={`${ART}/c2-avatar-b.png`} alt="" width={24} height={24} loading="lazy" decoding="async" />
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
                <img src={`${ART}/c3-map-lines.svg`} alt="" loading="lazy" decoding="async" />
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
