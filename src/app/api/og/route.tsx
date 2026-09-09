import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

// Runtime is deliberately left at the default (nodejs). `runtime = 'edge'`
// is deprecated in this Next version — the build warns about it — and
// `next/og` no longer needs Edge to render an ImageResponse.

// ---------------------------------------------------------------------------
// Translated content for the OG image
// ---------------------------------------------------------------------------

type LanguageCode = 'pt' | 'en' | 'es';

const ogTranslations: Record<LanguageCode, {
  pill: string;
  headlineA: string;
  headlineB: string;
  subA: string;
  subB: string;
}> = {
  pt: {
    pill: 'Workspace para Corretores de Elite',
    headlineA: 'Enquanto você mostra um imóvel,',
    headlineB: 'seu próximo lead já está qualificado.',
    subA: 'Respostas em até 10s no WhatsApp, Instagram e SMS.',
    subB: 'CRM automático e follow-up por IA.',
  },
  en: {
    pill: 'Workspace for Elite Realtors',
    headlineA: 'While you show a property,',
    headlineB: 'your next lead is already qualified.',
    subA: 'Replies in under 10s on WhatsApp, Instagram and SMS.',
    subB: 'Automatic CRM and AI follow-up.',
  },
  es: {
    pill: 'Workspace para Corredores de Élite',
    headlineA: 'Mientras muestras una propiedad,',
    headlineB: 'tu próximo lead ya está calificado.',
    subA: 'Respuestas en menos de 10s por WhatsApp, Instagram y SMS.',
    subB: 'CRM automático y seguimiento por IA.',
  },
};

function isLang(v: string | null): v is LanguageCode {
  return v === 'pt' || v === 'en' || v === 'es';
}

// ---------------------------------------------------------------------------
// GET /api/og?lang=pt|en|es
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const lang = isLang(req.nextUrl.searchParams.get('lang'))
    ? (req.nextUrl.searchParams.get('lang') as LanguageCode)
    : 'pt';

  const t = ogTranslations[lang];

  // Fetch Inter font (weight 700 for headlines, 400 for body)
  const [interBold, interRegular] = await Promise.all([
    fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf').then(r => r.arrayBuffer()),
    fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf').then(r => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a10',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Radial gradient overlays */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse 60% 60% at 18% 0%, rgba(255,117,117,0.32) 0%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse 60% 60% at 82% 100%, rgba(92,169,240,0.32) 0%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(19,219,153,0.24) 0%, transparent 100%)',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.5,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 100% 90% at 50% 50%, white, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 90% at 50% 50%, white, transparent)',
          }}
        />

        {/* Content layer */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '96px',
            position: 'relative',
            zIndex: 1,
            flex: 1,
          }}
        >
          {/* Eyebrow pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 20,
              padding: '8px 20px',
              alignSelf: 'flex-start',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF7575, #13DB99, #5CA9F0)',
                marginRight: 12,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.02em',
              }}
            >
              {t.pill}
            </span>
          </div>

          {/* Main headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 48,
            }}
          >
            <span
              style={{
                fontSize: 68,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {t.headlineA}
            </span>
            <span
              style={{
                fontSize: 68,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                background: 'linear-gradient(135deg, #FF7575, #13DB99, #5CA9F0)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {t.headlineB}
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.72)',
                letterSpacing: '-0.005em',
              }}
            >
              {t.subA}
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.72)',
                letterSpacing: '-0.005em',
              }}
            >
              {t.subB}
            </span>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1, display: 'flex' }} />

          {/* Bottom row: logo + site */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            {/* JSYNQ logo mark (simplified J icon + text) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Logo SVG mark */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M34.2857 9.52571L20 17.379L5.71238 9.52571V5.71238H30.48V0H0V12.379L20 23.8133L34.2857 15.6476V25.7143L20 33.5733L5.71238 25.7143V20.04L0 16.7733V28.5733L20 40L40 28.5733V0H34.2857V9.52571Z"
                  fill="#ffffff"
                />
              </svg>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                JSYNQ IMOB
              </span>
            </div>

            <span
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.02em',
              }}
            >
              imob.jsynq.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      ],
    },
  );
}
