# JSYNQ Imob — Landing

Landing page da JSYNQ focada em imobiliárias, implementada pixel-perfect a partir do arquivo Figma "LPs". Sem pricing/checkout — os CTAs abrem o formulário de contato (modal) ou o WhatsApp direto.

## Stack

- **Next.js 16** (App Router, Server Components por padrão)
- **React 18**
- **TypeScript**
- **next/font** (Inter + Sometype Mono, carregados com `display: swap`)
- **@vercel/analytics** + **@vercel/speed-insights** (tracking nativo)
- i18n próprio (pt/en/es) via cookie + middleware de geo/idioma
- Metadata API (Open Graph, Twitter Card, hreflang, canonical, robots — tudo tipado)

## Estrutura

```
src/
  app/
    layout.tsx          ← html + body + metadata por idioma + Analytics + Speed Insights
    page.tsx             ← composição das seções da LP
    globals.css           ← tokens de design + estilos de todas as seções (prefixo .imob-*)
    api/og/route.tsx      ← OG image dinâmica por idioma (edge)
    privacy-policy/, terms-of-use/  ← páginas legais estáticas

  components/
    sections/            ← Nav, Hero, Partners, FeaturesIntro, Feature*, HowItWorks,
                            Testimonials, Cta, Footer (uma seção da LP = um componente)
    ContactModal.tsx      ← modal com form embed da JSYNQ (iframe)
    WhatsAppFab.tsx        ← botão flutuante de WhatsApp
    CookieConsent.tsx
    RevealManager.tsx      ← scroll-reveal via IntersectionObserver (data-reveal)
    ui/                    ← LanguageSelector, SvgSprites, icons

  lib/
    i18n/                  ← context + dicionário de traduções (pt/en/es)
    contact-modal/          ← context do modal de contato
    whatsapp.ts             ← número + builder de link wa.me (usado por CTAs e pelo fab)
    geo.ts, analytics.ts, legal-content.ts

public/
  assets/imob/             ← assets exportados do Figma (ilustrações, ícones, fotos)
  assets/jsynq-logo-horizontal.svg, jsynq-ai-badge.svg
  robots.txt, sitemap.xml, llms.txt, manifest.json

middleware.ts              ← detecção de idioma/país (edge)
next.config.ts             ← headers de segurança e cache
```

## Rodando local

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

## Build de produção

```bash
npm run build
npm run start
```

## Deploy na Vercel

1. Importe o repositório em https://vercel.com/new
2. Framework Preset: **Next.js** (auto-detectado)
3. Deploy

Vercel já provisiona automaticamente Analytics, Speed Insights, edge cache e deploys de preview por PR.

## CTAs (sem pricing)

Não há fluxo de cadastro/checkout nesta LP. Os botões primários ("Começar Teste Grátis") abrem o `ContactModal` (form embed da JSYNQ); os secundários ("Falar com consultor") abrem o WhatsApp via `lib/whatsapp.ts`. O número de WhatsApp e o texto padrão de cada CTA ficam centralizados lá — para trocar o número, edite só esse arquivo.

## i18n

Textos vivem em `src/lib/i18n/translations.ts` (pt/en/es, chaves flat). Idioma detectado por: `?lang=`/`?language=` na URL → cookie `language` (setado pelo middleware a partir do `Accept-Language`) → `localStorage` → `navigator.language` → padrão `pt`. Selecionável pelo globo no header.

## Headers de segurança e cache

Definidos em `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, cache imutável em `/assets/*`, cache curto em `robots.txt`/`sitemap.xml`/`llms.txt`/`manifest.json`.

## SEO

- Metadata API completo (Open Graph, Twitter Card, canonical, hreflang) por idioma em `layout.tsx`
- `robots.txt` com permissões explícitas para crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- `sitemap.xml` com os anchors principais
- `llms.txt` — resumo da página para crawlers de LLM
