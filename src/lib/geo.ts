import { headers } from 'next/headers';

export type UserCountry = 'BR' | 'INTL';

function normalizeCountryFromSignals(args: {
  countryCode?: string | null;
  acceptLanguage?: string | null;
}): UserCountry {
  const c = (args.countryCode || '').toUpperCase();
  if (c === 'BR') return 'BR';

  const al = (args.acceptLanguage || '').toLowerCase();
  if (al.includes('pt-br')) return 'BR';

  return 'INTL';
}

/**
 * Server-side country detection (works even if middleware isn't running).
 *
 * Priority:
 * - middleware header `x-user-country` (when middleware runs)
 * - Vercel header `x-vercel-ip-country`
 * - accept-language `pt-BR`
 * - default INTL
 */
export async function getServerUserCountry(): Promise<UserCountry> {
  const h = await headers();
  const fromMiddleware = h.get('x-user-country');
  if (fromMiddleware === 'BR' || fromMiddleware === 'INTL') return fromMiddleware;

  const vercelCountry = h.get('x-vercel-ip-country');
  const acceptLanguage = h.get('accept-language');

  return normalizeCountryFromSignals({
    countryCode: vercelCountry,
    acceptLanguage,
  });
}

/**
 * Raw ISO country code (e.g. 'US', 'BR', 'FR'), uppercased.
 * Returns null when geo is unknown (e.g. localhost / dev).
 *
 * Priority: middleware header `x-user-country-code` → Vercel `x-vercel-ip-country`.
 */
export async function getServerCountryCode(): Promise<string | null> {
  const h = await headers();
  const fromMiddleware = h.get('x-user-country-code');
  if (fromMiddleware) return fromMiddleware.toUpperCase();

  const vercelCountry = h.get('x-vercel-ip-country');
  return vercelCountry ? vercelCountry.toUpperCase() : null;
}
