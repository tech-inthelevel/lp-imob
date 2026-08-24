'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { useI18n } from '@/lib/i18n/context';
import { trackEvent } from '@/lib/analytics';

// JSYNQ form builder embed (handles its own fields + CRM submission).
// One form per language — picked from the selected site language.
const FORM_IDS: Record<string, string> = {
  pt: '698af57985341462c7ad71b0',
  en: '6a208eeee188e2b31a18ccca',
  es: '6a208f2de188e2b31a18d3cf',
};
const EMBED_SCRIPT = 'https://app.jsynq.com/form-embed.js';

export function ContactModal({
  isOpen,
  onClose,
  source,
}: {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}) {
  const { t, language } = useI18n();
  const formSrc = `https://app.jsynq.com/forms/${FORM_IDS[language] ?? FORM_IDS.pt}?embed=1`;
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Scroll lock + initial focus + restore focus + track open
  useEffect(() => {
    if (!isOpen) return;
    lastFocused.current = document.activeElement as HTMLElement;
    document.body.classList.add('modal-open');
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    trackEvent('contact_modal_open', {
      event_category: 'engagement',
      event_label: source || 'unknown',
      source: source || 'unknown',
    });

    return () => {
      window.clearTimeout(focusTimer);
      document.body.classList.remove('modal-open');
      lastFocused.current?.focus?.();
    };
  }, [isOpen, source]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="cmodal"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cmodal__dialog cmodal__dialog--embed"
        role="dialog"
        aria-modal="true"
        aria-label={t('contact.title')}
      >
        <button
          type="button"
          className="cmodal__close"
          aria-label={t('contact.close')}
          onClick={onClose}
          ref={closeRef}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <iframe
          key={language}
          src={formSrc}
          data-jsynq-form=""
          title={t('contact.title')}
          className="cmodal__embed"
          loading="lazy"
        />

        {/* Loads once (deduped by src); resizes the iframe via postMessage */}
        <Script src={EMBED_SCRIPT} strategy="afterInteractive" />
      </div>
    </div>
  );
}
