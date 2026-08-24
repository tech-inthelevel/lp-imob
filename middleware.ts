import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type SupportedLanguage = 'en' | 'pt' | 'es';
type UserCountry = 'BR' | 'INTL';

function normalizeCountry(args: {
  geoCountry?: string | null;
  acceptLanguage: string;
  cookieCountry?: string | null;
}): UserCountry {
  // 1) Vercel Geo / header
  const geoCountry = args.geoCountry?.toUpperCase();
  if (geoCountry === 'BR') return 'BR';

  // 2) Accept-Language (pt-BR). Used for localhost and when geo isn't available.
  const hasPtBR = args.acceptLanguage.toLowerCase().includes('pt-br');
  if (hasPtBR) return 'BR';

  // 3) Sticky cookie from a previous visit (reduces flicker)
  const cookie = args.cookieCountry?.toUpperCase();
  if (cookie === 'BR') return 'BR';
  if (cookie === 'INTL') return 'INTL';

  return 'INTL';
}

export function middleware(request: NextRequest) {
  // NOTE: runs on the Edge runtime. Use `?__mwdebug=1` to inspect output headers.
  const debug = request.nextUrl.searchParams.has('__mwdebug');

  // Language detection (kept from the legacy client behaviour)
  const cookieLang = request.cookies.get('language')?.value as SupportedLanguage | undefined;
  const acceptLanguage = request.headers.get('accept-language') || '';
  const hasValidCookie = cookieLang === 'en' || cookieLang === 'pt' || cookieLang === 'es';
  let detectedLang: SupportedLanguage = 'pt';

  if (hasValidCookie) {
    detectedLang = cookieLang as SupportedLanguage;
  } else {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, q = '1'] = lang.trim().split(';q=');
        return { code: code.toLowerCase().split('-')[0], quality: parseFloat(q) };
      })
      .sort((a, b) => b.quality - a.quality);

    for (const lang of languages) {
      if (lang.code === 'pt') {
        detectedLang = 'pt';
        break;
      } else if (lang.code === 'en') {
        detectedLang = 'en';
        break;
      } else if (lang.code === 'es') {
        detectedLang = 'es';
        break;
      }
    }
  }

  // Geo is available on Vercel edge; cast to access safely (Next 16 removed `geo`)
  const geoCountry =
    (request as { geo?: { country?: string } }).geo?.country ||
    request.headers.get('x-vercel-ip-country');

  const cookieCountry = request.cookies.get('user-country')?.value;
  const userCountry = normalizeCountry({ geoCountry, acceptLanguage, cookieCountry });

  // Raw ISO country code (e.g. 'US', 'BR', 'FR') — empty when geo is unknown.
  const countryCode = (geoCountry || '').toUpperCase();

  // Clone headers so the values are readable in Server Components.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-country', userCountry);
  requestHeaders.set('x-user-country-code', countryCode);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set('x-user-country', userCountry);
  response.headers.set('x-user-country-code', countryCode);
  if (debug) {
    response.headers.set('x-mw-debug', '1');
    response.headers.set('x-mw-geo-country', geoCountry || '');
    response.headers.set('x-mw-accept-language', acceptLanguage);
    response.headers.set('x-mw-cookie-country', cookieCountry || '');
  }

  response.cookies.set('user-country', userCountry, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  if (!hasValidCookie || cookieLang !== detectedLang) {
    response.cookies.set('language', detectedLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
