/**
 * Google Analytics / GTM event tracking + sign-up URL builder + client-side
 * location helpers. (Mirrors LPJSYNQ — src/lib/analytics.ts)
 *
 * Tracking functions no-op gracefully when no gtag/dataLayer is present.
 */

import type { LanguageCode } from '@/lib/i18n/translations';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * User location helpers.
 *
 * Source of truth: `middleware.ts` sets a `user-country` cookie with values:
 * - 'BR'   -> Brazil
 * - 'INTL' -> Everywhere else
 */
export type UserCountry = 'BR' | 'INTL';

export function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const cookie of cookies) {
    const eqIdx = cookie.indexOf('=');
    const key = eqIdx === -1 ? cookie : cookie.slice(0, eqIdx);
    if (key === name) {
      const rawValue = eqIdx === -1 ? '' : cookie.slice(eqIdx + 1);
      try {
        return decodeURIComponent(rawValue);
      } catch {
        return rawValue;
      }
    }
  }
  return undefined;
}

export const getUserCountry = (): UserCountry => {
  const cookieVal = getCookieValue('user-country');
  return cookieVal === 'BR' ? 'BR' : 'INTL';
};

export const getUserCurrency = (): 'USD' | 'BRL' => {
  return getUserCountry() === 'BR' ? 'BRL' : 'USD';
};

// Every "Começar Teste Grátis" CTA sends visitors straight into the app's
// own sign-up flow rather than this page's contact form. `location` is the
// same source label already passed to trackSignUpClick, carried along as a
// UTM param so it's visible on the receiving end too, not just in this
// site's own GA.
export const SIGNUP_URL = 'https://app.jsynq.com/sign-up';

/**
 * White-label guard for the sign-up screen.
 *
 * app.jsynq.com brands /sign-up from an `lp` (launch partner) param. Its
 * resolver is `lp = urlParam || storedParam`, where the stored value lives in
 * session/localStorage under `subscription:params` and persists for 30 days.
 * So a visitor who ever opened a partner link keeps seeing that partner's
 * logo on our sign-up too — verified: a partner value planted in storage was
 * overridden the moment a URL `lp` was supplied, and the stored value was
 * rewritten to match.
 *
 * Sending an explicit `lp` therefore both wins over the stale value and
 * repairs it. Unknown values fall back to `setBranding(null)` = default JSYNQ
 * branding, which is what 'jsynq' currently hits.
 *
 * CAVEAT: that fallback is exactly *why* it works — 'jsynq' isn't a
 * registered partner slug. If one is ever created with this slug, these CTAs
 * would start showing that partner's branding. Replace with whatever reserved
 * "no partner" value the platform team confirms.
 */
export const SIGNUP_LP = 'jsynq';

// `lang` mirrors this site's own query-param convention for language
// (see detectLanguage in lib/i18n/context.tsx) — app.jsynq.com reads it the
// same way, so a visitor who picked PT/EN/ES here lands on sign-up already
// in that language instead of whatever it detects on its own.
export function buildSignUpUrl(location: string, language: LanguageCode): string {
  const url = new URL(SIGNUP_URL);
  url.searchParams.set('lp', SIGNUP_LP);
  url.searchParams.set('lang', language);
  url.searchParams.set('utm_source', 'imob_lp');
  url.searchParams.set('utm_medium', 'cta');
  url.searchParams.set('utm_content', location);
  return url.toString();
}

export type LandingPageType = 'home' | 'landingpage';

export interface TrackingEvent {
  event: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Get current landing page type based on pathname
 */
export const getLandingPageType = (): LandingPageType => {
  if (typeof window === 'undefined') return 'home';
  const pathname = window.location.pathname;
  return pathname.includes('/landingpage') ? 'landingpage' : 'home';
};

/**
 * Send event to Google Analytics (gtag) + GTM dataLayer
 */
export const trackEvent = (
  eventName: string,
  eventParams?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: unknown;
  },
) => {
  if (typeof window === 'undefined') return;

  const landingPage = getLandingPageType();
  const params = {
    ...eventParams,
    landing_page: landingPage,
    page_path: window.location.pathname,
  };

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
};

export const trackCTAClick = (location: string, ctaText?: string, planType?: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: `${location}_${ctaText || 'button'}`,
    cta_location: location,
    cta_text: ctaText,
    plan_type: planType,
  });
};

export const trackSignUpClick = (location: string, planType?: string) => {
  trackEvent('sign_up_click', {
    event_category: 'conversion',
    event_label: location,
    sign_up_location: location,
    plan_type: planType,
  });
};

export const trackPricingClick = (
  planName: string,
  planType: 'monthly' | 'yearly',
  seats: number,
) => {
  trackEvent('pricing_plan_click', {
    event_category: 'engagement',
    event_label: planName,
    plan_name: planName,
    plan_type: planType,
    seats,
  });
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionName,
    section_name: sectionName,
  });
};

export const trackFAQClick = (question: string) => {
  trackEvent('faq_click', {
    event_category: 'engagement',
    event_label: question,
    faq_question: question,
  });
};

export const trackComparisonView = () => {
  trackEvent('comparison_view', {
    event_category: 'engagement',
    event_label: 'comparison_table',
  });
};

export const trackFeatureClick = (featureName: string) => {
  trackEvent('feature_click', {
    event_category: 'engagement',
    event_label: featureName,
    feature_name: featureName,
  });
};
