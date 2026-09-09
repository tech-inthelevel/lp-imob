import { Inter, Sometype_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { I18nProvider } from '@/lib/i18n/context';
import { ContactModalProvider } from '@/lib/contact-modal/context';
import { CookieConsent } from '@/components/CookieConsent';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

// Used for the CRM data-label chips ("QUENTE", "URGÊNCIA"...) in the CRM feature section.
const sometypeMono = Sometype_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-mono',
});

// TODO: replace with the real production domain once it's defined.
const SITE_URL = 'https://imob.jsynq.com';

// ---------------------------------------------------------------------------
// Per-language meta content
// ---------------------------------------------------------------------------

type LanguageCode = 'pt' | 'en' | 'es';

const META: Record<LanguageCode, {
  htmlLang: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  twitterTitle: string;
  twitterDescription: string;
  /** Mirrors the feature sections actually rendered on the page. */
  featureList: string[];
}> = {
  pt: {
    htmlLang: 'pt-BR',
    title: 'JSYNQ Imob — Workspace com IA para Corretores de Elite',
    description: 'Enquanto você mostra um imóvel, o seu próximo lead já está qualificado. Respostas em até 10s no WhatsApp, Instagram e SMS, CRM automático e follow-up por IA.',
    keywords: 'imobiliária, corretor de imóveis, CRM imobiliário, IA para imobiliárias, JSYNQ, qualificação de leads, WhatsApp imobiliária',
    ogTitle: 'JSYNQ Imob — Enquanto você mostra um imóvel, seu próximo lead já está qualificado',
    ogDescription: 'Respostas em até 10s no WhatsApp, Instagram e SMS. CRM automático e follow-up por IA para corretores de elite.',
    ogLocale: 'pt_BR',
    twitterTitle: 'JSYNQ Imob — Workspace com IA para Corretores de Elite',
    twitterDescription: 'Enquanto você mostra um imóvel, o seu próximo lead já está qualificado.',
    featureList: [
      'Resposta automática por IA em WhatsApp, Instagram e SMS',
      'Qualificação e triagem de leads por IA',
      'CRM com atualização automática do funil',
      'Follow-up automatizado até a decisão de compra',
      'Relatórios e insights de origem e conversão de leads',
      'Timeline completa de histórico por lead',
      'Agendamento automático de visitas',
    ],
  },
  en: {
    htmlLang: 'en',
    title: 'JSYNQ Imob — AI Workspace for Elite Realtors',
    description: 'While you show a property, your next lead is already qualified. Replies in under 10s on WhatsApp, Instagram and SMS, automatic CRM and AI follow-up.',
    keywords: 'real estate, realtor CRM, AI for real estate, JSYNQ, lead qualification, WhatsApp real estate',
    ogTitle: 'JSYNQ Imob — While you show a property, your next lead is already qualified',
    ogDescription: 'Replies in under 10s on WhatsApp, Instagram and SMS. Automatic CRM and AI follow-up for elite realtors.',
    ogLocale: 'en_US',
    twitterTitle: 'JSYNQ Imob — AI Workspace for Elite Realtors',
    twitterDescription: 'While you show a property, your next lead is already qualified.',
    featureList: [
      'Automatic AI replies on WhatsApp, Instagram and SMS',
      'AI lead qualification and screening',
      'CRM with automatic pipeline updates',
      'Automated follow-up through to the buying decision',
      'Reports and insights on lead source and conversion',
      'Full history timeline per lead',
      'Automatic visit scheduling',
    ],
  },
  es: {
    htmlLang: 'es',
    title: 'JSYNQ Imob — Workspace con IA para Corredores de Élite',
    description: 'Mientras muestras una propiedad, tu próximo lead ya está calificado. Respuestas en menos de 10s por WhatsApp, Instagram y SMS, CRM automático y seguimiento por IA.',
    keywords: 'inmobiliaria, corredor de propiedades, CRM inmobiliario, IA para inmobiliarias, JSYNQ, calificación de leads, WhatsApp inmobiliaria',
    ogTitle: 'JSYNQ Imob — Mientras muestras una propiedad, tu próximo lead ya está calificado',
    ogDescription: 'Respuestas en menos de 10s por WhatsApp, Instagram y SMS. CRM automático y seguimiento por IA para corredores de élite.',
    ogLocale: 'es_ES',
    twitterTitle: 'JSYNQ Imob — Workspace con IA para Corredores de Élite',
    twitterDescription: 'Mientras muestras una propiedad, tu próximo lead ya está calificado.',
    featureList: [
      'Respuestas automáticas con IA en WhatsApp, Instagram y SMS',
      'Calificación y filtrado de leads con IA',
      'CRM con actualización automática del embudo',
      'Seguimiento automatizado hasta la decisión de compra',
      'Informes e insights de origen y conversión de leads',
      'Historial completo por lead en una única timeline',
      'Agendamiento automático de visitas',
    ],
  },
};

function isLang(v: string | undefined): v is LanguageCode {
  return v === 'pt' || v === 'en' || v === 'es';
}

/**
 * Structured data. This is what AI answer engines and Google's rich results
 * actually parse, so it's the highest-leverage SEO surface on the page.
 *
 * Deliberately conservative: no `aggregateRating`, no `offers`, no `sameAs`.
 * Structured data has to describe things that are true and visible on the
 * page — inventing a rating, a price, or a social profile the site doesn't
 * actually link to is exactly what gets a site's rich results pulled. The
 * footer's social hrefs are still placeholders, so they stay out until they
 * point somewhere real. Same reason there's no FAQPage: the page has no FAQ.
 */
function buildJsonLd(lang: LanguageCode, m: (typeof META)[LanguageCode]) {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: 'JSYNQ',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/jsynq-logo-horizontal.svg`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: SITE_URL,
        name: m.title,
        description: m.description,
        publisher: { '@id': orgId },
        inLanguage: m.htmlLang,
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: m.title,
        description: m.description,
        isPartOf: { '@id': siteId },
        about: { '@id': orgId },
        inLanguage: m.htmlLang,
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/api/og?lang=${lang}` },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'JSYNQ Imob',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'CRM',
        operatingSystem: 'Web',
        url: `${SITE_URL}/`,
        description: m.description,
        inLanguage: m.htmlLang,
        provider: { '@id': orgId },
        featureList: m.featureList,
      },
    ],
  };
}

// NOTA: Em vez de usar `export const metadata` (que dispara o Next a criar
// um <MetadataWrapper> com Suspense boundary — fonte do mismatch de hidratação
// quando combinado com dangerouslySetInnerHTML), declaramos todos os meta tags
// diretamente dentro do <head>. Isso bypassa o sistema de streaming de metadata
// e garante SSR puro sem Suspense.

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the language cookie set by middleware (server-side)
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('language')?.value;
  const lang: LanguageCode = isLang(cookieLang) ? cookieLang : 'pt';
  const m = META[lang];

  // Dynamic OG image URL with language parameter
  const ogImageUrl = `${SITE_URL}/api/og?lang=${lang}`;

  return (
    <html lang={m.htmlLang} className={`${inter.variable} ${sometypeMono.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#13DB99" />
        <meta name="color-scheme" content="light" />

        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <meta name="keywords" content={m.keywords} />
        <meta name="author" content="JSYNQ" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          name="permissions-policy"
          content="camera=(), microphone=(), geolocation=(), interest-cohort=()"
        />

        <link rel="canonical" href={SITE_URL + '/'} />
        <link rel="alternate" hrefLang="pt-BR" href={SITE_URL + '/'} />
        <link rel="alternate" hrefLang="en" href={SITE_URL + '/?lang=en'} />
        <link rel="alternate" hrefLang="es" href={SITE_URL + '/?lang=es'} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL + '/'} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="JSYNQ Workspace" />
        <meta property="og:title" content={m.ogTitle} />
        <meta property="og:description" content={m.ogDescription} />
        <meta property="og:url" content={SITE_URL + '/'} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={m.ogTitle} />
        <meta property="og:locale" content={m.ogLocale} />
        {/* Alternate locales — exclude the current locale to avoid duplicates */}
        {m.ogLocale !== 'pt_BR' && <meta property="og:locale:alternate" content="pt_BR" />}
        {m.ogLocale !== 'en_US' && <meta property="og:locale:alternate" content="en_US" />}
        {m.ogLocale !== 'es_ES' && <meta property="og:locale:alternate" content="es_ES" />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={m.twitterTitle} />
        <meta name="twitter:description" content={m.twitterDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@jsynqapp" />

        {/* Preconnect to external origins used at runtime (contact form embed) */}
        <link rel="dns-prefetch" href="https://app.jsynq.com" />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured data — see buildJsonLd for why it's scoped the way it
            is. JSON.stringify (not a template literal) so the payload can't
            break out of the script tag. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang, m)) }}
        />
      </head>
      <body>
        <I18nProvider>
          <ContactModalProvider>{children}</ContactModalProvider>
          <CookieConsent />
        </I18nProvider>
        {/* Vercel built-in tracking */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
