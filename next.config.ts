import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Imagens estáticas e SVG vão direto via /public, sem next/image (mantém o que já temos)
  images: {
    formats: ['image/webp'],
  },
  // Headers de segurança e cache. Vercel respeita estes; outros hosts usam _headers/vercel.json/.htaccess
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(robots.txt|sitemap.xml|llms.txt|manifest.json)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        // The hero house SVG loads via <object> (see HeroCasa.tsx) so its CSS
        // draw-on animation actually plays — <img src> freezes it. `<object>`
        // embeds same-origin content as its own document, which is exactly
        // what the blanket X-Frame-Options: DENY above (clickjacking
        // protection for real pages) also blocks, same-origin or not. This
        // later, more specific rule overrides it back to SAMEORIGIN for just
        // this one static asset — last matching rule wins for a given header
        // key on the same path (see Next's headers() override behavior) —
        // so the illustration can embed itself while every other response,
        // page or asset, keeps the strict DENY.
        source: '/assets/imob/hero-casa.svg',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
    ];
  },
};

export default nextConfig;
