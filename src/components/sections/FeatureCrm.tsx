'use client';

import { useI18n } from '@/lib/i18n/context';
import { useContactModal } from '@/lib/contact-modal/context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function FeatureCrm() {
  const { t } = useI18n();
  const { open } = useContactModal();
  const whatsappHref = buildWhatsAppUrl(t('whatsapp.consultText'));

  return (
    <section className="imob-feature imob-feature--tight-top">
      <div className="imob-feature__visual imob-feature-crm__visual" data-fx="zoom-in" data-parallax="0.12">
        {/* Base layer: the complete photo in color, filling the whole mask
            (matches Figma's mask asset, node 1:341/Ellipse 21992, at the
            same absolute alignment nodes 1:343+1:344 share — see the dots
            piece below) so the man is fully visible before any scan has
            run. The dots piece (Figma node 1:343's exact box/mask/crop)
            sits on top of it, hidden until the scan sweeps over it, so the
            black-and-white pixelated look only appears in sync with the
            green tint — never before it, never permanently missing. */}
        <div className="imob-feature-crm__photoframe">
          <img className="imob-feature-crm__photo-full" src="/assets/imob/crm-photo-master.png" alt="" />
          <img className="imob-feature-crm__photo-dots" src="/assets/imob/crm-photo-dots.png" alt="" />
        </div>
        {/* Green panel and scanline are siblings of the photo, not children:
            in Figma (nodes 1:345 / 1:346) they span from the card's own left
            edge, wider than the photo box. */}
        <span className="imob-feature-crm__scanoverlay" aria-hidden="true"></span>
        <span className="imob-feature-crm__scanline" aria-hidden="true"></span>
        <div className="imob-feature-crm__labels" aria-hidden="true">
          <span className="imob-feature-crm__label">
            <span className="imob-feature-crm__label__tag">{t('feature2.tag1')}</span>
          </span>
          <span className="imob-feature-crm__label">
            <span className="imob-feature-crm__label__tag">{t('feature2.tag2')}</span>
          </span>
          <span className="imob-feature-crm__label">
            <span className="imob-feature-crm__label__tag">{t('feature2.tag3')}</span>
          </span>
          <span className="imob-feature-crm__label">
            <span className="imob-feature-crm__label__tag">
              <img src="/assets/imob/icon-loading.svg" alt="" />
              {t('feature2.tag4')}
            </span>
          </span>
        </div>
      </div>

      <div className="imob-feature__text" data-fx="slide-right">
        <div className="imob-feature__icon" aria-hidden="true">
          <img src="/assets/imob/icon-filter.svg" alt="" />
        </div>
        <p className="imob-feature__title">{t('feature2.title')}</p>
        <p className="imob-feature__body">{t('feature2.body')}</p>
        <div className="imob-feature__actions">
          <button type="button" className="imob-btn imob-btn--primary imob-btn--sm" onClick={() => open('feature_crm')}>
            {t('feature2.cta1')}
          </button>
          <a
            className="imob-btn imob-btn--secondary imob-btn--sm"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('feature2.cta2')}
          </a>
        </div>
      </div>
    </section>
  );
}
