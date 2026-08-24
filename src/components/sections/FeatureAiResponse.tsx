'use client';

import { useI18n } from '@/lib/i18n/context';

export function FeatureAiResponse() {
  const { t } = useI18n();

  return (
    <section className="imob-feature-ai">
      <div className="imob-feature-ai__card" data-fx="zoom-in">
        <img className="imob-feature-ai__line" style={{ left: '55.174%', top: '-5.729%', width: '33.403%', height: '55.208%' }} src="/assets/imob/ai-line-top.svg" alt="" aria-hidden="true" />
        <img className="imob-feature-ai__line imob-feature-ai__line--flip" style={{ left: '55.174%', top: '51.042%', width: '33.403%', height: '55.208%' }} src="/assets/imob/ai-line-bottom.svg" alt="" aria-hidden="true" />
        <img className="imob-feature-ai__line imob-feature-ai__line--flip" style={{ left: '33.785%', top: '51.323%', width: '76.181%', height: '50%' }} src="/assets/imob/ai-line-mid-flip.svg" alt="" aria-hidden="true" />
        <img className="imob-feature-ai__line" style={{ left: '33.785%', top: '0.021%', width: '76.181%', height: '50.26%' }} src="/assets/imob/ai-line-mid.svg" alt="" aria-hidden="true" />

        <div className="imob-feature-ai__core" aria-hidden="true">
          <img src="/assets/imob/jsynq-ai-icon.svg" alt="" />
        </div>

        <img className="imob-feature-ai__avatar" style={{ left: '82.465%', top: '15.625%' }} src="/assets/imob/avatar-1.png" alt="" aria-hidden="true" />
        <img className="imob-feature-ai__avatar" style={{ left: '52.813%', top: '57.813%' }} src="/assets/imob/avatar-2.png" alt="" aria-hidden="true" />
        <img className="imob-feature-ai__avatar" style={{ left: '86.563%', top: '57.031%' }} src="/assets/imob/avatar-3.png" alt="" aria-hidden="true" />
        <img className="imob-feature-ai__avatar" style={{ left: '58.576%', top: '39.063%' }} src="/assets/imob/avatar-4.png" alt="" aria-hidden="true" />

        <span className="imob-feature-ai__pill imob-feature-ai__pill--whatsapp" style={{ left: '43.85%', top: '10.5%' }}>
          <img src="/assets/imob/icon-whatsapp.svg" alt="" aria-hidden="true" />
          WhatsApp
        </span>
        <span className="imob-feature-ai__pill imob-feature-ai__pill--instagram" style={{ left: '78.65%', top: '72.4%' }}>
          <img src="/assets/imob/icon-instagram.svg" alt="" aria-hidden="true" />
          Instagram
        </span>
        <span className="imob-feature-ai__pill imob-feature-ai__pill--sms" style={{ left: '60.66%', top: '64.06%' }}>
          <img src="/assets/imob/icon-sms.svg" alt="" aria-hidden="true" />
          SMS
        </span>
        <span className="imob-feature-ai__pill imob-feature-ai__pill--bolt" style={{ left: '80.03%', top: '41.93%' }}>
          <img src="/assets/imob/icon-bolt.svg" alt="" aria-hidden="true" />
          8s
        </span>

        <div className="imob-feature-ai__text">
          <div className="imob-feature__icon" aria-hidden="true">
            <img src="/assets/imob/icon-message-square.svg" alt="" />
          </div>
          <p className="imob-feature__title">{t('feature1.title')}</p>
          <p className="imob-feature__body">{t('feature1.body')}</p>
        </div>
      </div>
    </section>
  );
}
