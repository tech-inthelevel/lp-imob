// i18n dictionary — JSYNQ Imob landing page.
// Content sourced from Figma "LPs" file, page "📋 Dev Specs — Claude Code"
// (section 8: TEXTOS COMPLETOS) and the live design nodes. Flat keys.

export type LanguageCode = 'pt' | 'en' | 'es';

export type TranslationDict = Record<string, string>;

export const LANG_LABELS: Record<LanguageCode, string> = { pt: 'PT', en: 'EN', es: 'ES' };
export const HTML_LANG: Record<LanguageCode, string> = { pt: 'pt-BR', en: 'en', es: 'es' };
export const DEFAULT_LANG: LanguageCode = 'pt';

export const translations: Record<LanguageCode, TranslationDict> = {
  pt: {
    'nav.solucoes': 'Soluções',
    'nav.funcionalidades': 'Funcionalidades',
    'nav.comoFunciona': 'Como Funciona',
    'nav.cta': 'Começar Teste Grátis',

    'hero.badge': 'Workspace para Corretores de Elite',
    'hero.titleA': 'Enquanto você mostra um imóvel,',
    'hero.titleB': ' o seu próximo lead já está qualificado.',
    'hero.sub': 'Enquanto você está ocupado, seus leads continuam sendo atendidos, qualificados e agendados — inclusive fora do horário comercial. Direto no WhatsApp e Instagram, integrado ao CRM.',
    'hero.cta1': 'Começar Teste Grátis',
    'hero.cta2': 'Falar com consultor',
    'hero.proof': '4,8/5 — mais de 4.000 usuários já utilizam o JSYNQ',

    'partners.label': 'Integrado com as principais ferramentas do mercado',

    'featuresIntro.eyebrow': 'Alta Performance',
    'featuresIntro.title': 'Cada lead é atendido. Nenhuma oportunidade fica para trás.',

    'feature1.title': 'Respostas em até 10 segundos, em qualquer canal',
    'feature1.body': 'A JSYNQ IA atende automaticamente pelo WhatsApp, Instagram e SMS, evitando atrasos e impedindo que seus leads esfriem.',

    'feature2.title': 'Nunca mais preencha o CRM na mão',
    'feature2.body': 'Cada conversa vira informação estratégica. A IA identifica orçamento, localização e perfil de crédito e organiza tudo automaticamente para o corretor dar continuidade.',
    'feature2.tag1': 'QUENTE',
    'feature2.tag2': '$$$',
    'feature2.tag3': 'URGÊNCIA',
    'feature2.tag4': 'LOCALIZAÇÃO',
    'feature2.cta1': 'Começar Teste Grátis',
    'feature2.cta2': 'Falar com consultor',

    'feature3.title': 'Chega de perder vendas por falta de follow-up',
    'feature3.body': 'A IA lembra visitas, envia imóveis compatíveis e mantém cada comprador engajado até a decisão de compra.',

    'feature4.title': 'Gere Relatórios e Insights Inteligentes',
    'feature4.body': 'Veja de onde vêm seus melhores leads, o que eles mais buscam e quais abordagens fecham mais visitas. Decisão por dado, não por achismo.',

    'feature5.title': 'Rastreabilidade Total. Sem Perda de Histórico.',
    'feature5.body': 'Todo o histórico fica organizado em uma única timeline. Qualquer corretor assume o lead sabendo quais imóveis já viu, preferências, orçamento e estágio da negociação.',
    'feature5.cta1': 'Começar Teste Grátis',
    'feature5.cta2': 'Falar com consultor',
    'feature5.t1': 'Agente IA entra em contato',
    'feature5.t1d': '30 Jul, 2026, 10:00',
    'feature5.t2': 'Agente IA moveu o lead para coluna Qualificado',
    'feature5.t2d': '30 Jul, 2026, 19:34',
    'feature5.t3': 'Agente IA moveu o lead para coluna Negociação',
    'feature5.t3d': '31 Jul, 2026, 15:57',
    'feature5.t4': 'Agente IA marcou uma nova reunião — 04 Ago, 2026, às 14:30',
    'feature5.t4d': '31 Jul, 2026, 16:12',
    'feature5.t5': 'Vendedor assume o lead',
    'feature5.t5d': '31 Jul, 2026, 16:12',

    'how.eyebrow': 'Simplificado para Corretores',
    'how.title': 'Como a JSYNQ acelera o seu funil em 3 passos',
    'how.step1Title': 'Conecte seus Canais',
    'how.step1Body': 'Em poucos minutos, conecte WhatsApp, Instagram e seus sistemas ao Workspace, com total segurança.',
    'how.step2Title': 'AI Qualifica os Leads',
    'how.step2Body': 'Nossa inteligência artificial engaja imediatamente, filtra curiosos, descobre o perfil de investimento e agenda a visita ideal.',
    'how.step3Title': 'Você Fecha os Negócios',
    'how.step3Body': 'Sua equipe entra em ação só com leads quentes, com histórico completo e visitas já agendadas no calendário.',

    'testimonials.eyebrow': 'Sucesso Comprovado',
    'testimonials.title': 'Depoimentos de Clientes JSYNQ AI',
    'testimonials.quote1': 'Antes do JSYNQ Workspace, perdíamos cerca de 40% dos leads de anúncios por demora na resposta no final de semana. **Agora a IA qualifica e agenda visitas no sábado à noite** sem que eu precise olhar o celular.',
    'testimonials.author1': 'Ricardo Silva',
    'testimonials.role1': 'Diretor de Vendas, Imobiliária Apex',
    'testimonials.quote2': '**Nossa conversão de lead frio para visita agendada subiu de 4% para 18%.** A triagem automática impede que nossa equipe perca tempo de trabalho com leads desqualificados.',
    'testimonials.author2': 'Paula Guedes',
    'testimonials.role2': 'Corretora Autônoma Premium',
    'testimonials.quote3': 'Trocamos três ferramentas pelo JSYNQ e o histórico deixou de se perder na troca de plantão. **Qualquer corretor assume o lead sabendo exatamente onde parou.**',
    'testimonials.author3': 'Marina Duarte',
    'testimonials.role3': 'Gerente Comercial, Vetor Imóveis',

    'cta.title': 'Pronto para transformar sua imobiliária com IA?',
    'cta.body': 'Enquanto você faz uma visita, quantos leads estão esperando retorno? Comece grátis e pare de perder oportunidades.',
    'cta.cta1': 'Começar Teste Grátis',
    'cta.cta2': 'Falar com consultor',
    'cta.note': 'Sem necessidade de cartão de crédito. Teste grátis por 7 dias.',

    'footer.copyright': '© 2026 JSYNQ Workspace. Todos os direitos reservados.',
    'footer.terms': 'Termos de Uso',
    'footer.privacy': 'Políticas de Privacidade',

    'whatsapp.label': 'Falar no WhatsApp',
    'whatsapp.text': 'Olá! Vim pela página da JSYNQ Imob e gostaria de saber mais.',
    'whatsapp.consultText': 'Olá! Gostaria de falar com um consultor da JSYNQ sobre a minha imobiliária.',

    'contact.title': 'Fale com a gente',
    'contact.close': 'Fechar',

    'cookie.aria': 'Aviso de cookies',
    'cookie.text': 'Usamos cookies essenciais e de análise para melhorar sua experiência. Veja nossa',
    'cookie.privacy': 'Política de Privacidade',
    'cookie.accept': 'Aceitar',
    'cookie.reject': 'Rejeitar',
  },
  en: {
    'nav.solucoes': 'Solutions',
    'nav.funcionalidades': 'Features',
    'nav.comoFunciona': 'How It Works',
    'nav.cta': 'Start Free Trial',

    'hero.badge': 'Workspace for Elite Realtors',
    'hero.titleA': 'While you show a property,',
    'hero.titleB': ' your next lead is already qualified.',
    'hero.sub': 'While you’re busy, your leads keep getting answered, qualified and scheduled — even outside business hours. Straight from WhatsApp and Instagram, integrated with your CRM.',
    'hero.cta1': 'Start Free Trial',
    'hero.cta2': 'Talk to an advisor',
    'hero.proof': '4.8/5 — over 4,000 users already trust JSYNQ',

    'partners.label': 'Integrated with the leading tools in the market',

    'featuresIntro.eyebrow': 'High Performance',
    'featuresIntro.title': 'Every lead gets a reply. No opportunity slips away.',

    'feature1.title': 'Replies in under 10 seconds, on any channel',
    'feature1.body': 'JSYNQ AI automatically responds via WhatsApp, Instagram and SMS, avoiding delays and keeping your leads from going cold.',

    'feature2.title': 'Never fill out the CRM by hand again',
    'feature2.body': 'Every conversation becomes strategic data. The AI identifies budget, location and credit profile, and organizes everything automatically for the agent to follow up.',
    'feature2.tag1': 'HOT',
    'feature2.tag2': '$$$',
    'feature2.tag3': 'URGENCY',
    'feature2.tag4': 'LOCATION',
    'feature2.cta1': 'Start Free Trial',
    'feature2.cta2': 'Talk to an advisor',

    'feature3.title': 'Stop losing sales to missed follow-up',
    'feature3.body': 'The AI remembers visits, sends matching listings, and keeps every buyer engaged until they’re ready to close.',

    'feature4.title': 'Generate Smart Reports and Insights',
    'feature4.body': 'See where your best leads come from, what they’re looking for, and which approaches close the most visits. Decide with data, not guesswork.',

    'feature5.title': 'Full Traceability. No History Lost.',
    'feature5.body': 'Every touchpoint is organized in a single timeline. Any agent can pick up a lead knowing exactly which properties they’ve seen, their preferences, budget and stage in the negotiation.',
    'feature5.cta1': 'Start Free Trial',
    'feature5.cta2': 'Talk to an advisor',
    'feature5.t1': 'AI Agent reaches out',
    'feature5.t1d': 'Jul 30, 2026, 10:00 AM',
    'feature5.t2': 'AI Agent moved the lead to the Qualified column',
    'feature5.t2d': 'Jul 30, 2026, 7:34 PM',
    'feature5.t3': 'AI Agent moved the lead to the Negotiation column',
    'feature5.t3d': 'Jul 31, 2026, 3:57 PM',
    'feature5.t4': 'AI Agent booked a new meeting — Aug 4, 2026, at 2:30 PM',
    'feature5.t4d': 'Jul 31, 2026, 4:12 PM',
    'feature5.t5': 'Salesperson takes over the lead',
    'feature5.t5d': 'Jul 31, 2026, 4:12 PM',

    'how.eyebrow': 'Simplified for Realtors',
    'how.title': 'How JSYNQ speeds up your funnel in 3 steps',
    'how.step1Title': 'Connect Your Channels',
    'how.step1Body': 'In just a few minutes, connect WhatsApp, Instagram and your systems to the Workspace, with total security.',
    'how.step2Title': 'AI Qualifies the Leads',
    'how.step2Body': 'Our AI engages immediately, filters out window-shoppers, uncovers the investment profile and books the ideal visit.',
    'how.step3Title': 'You Close the Deals',
    'how.step3Body': 'Your team steps in only for hot leads, with full history and visits already booked on the calendar.',

    'testimonials.eyebrow': 'Proven Success',
    'testimonials.title': 'Testimonials from JSYNQ AI Clients',
    'testimonials.quote1': 'Before JSYNQ Workspace, we lost around 40% of ad leads to slow weekend response times. **Now the AI qualifies leads and books visits on a Saturday night** without me having to look at my phone.',
    'testimonials.author1': 'Ricardo Silva',
    'testimonials.role1': 'Sales Director, Apex Realty',
    'testimonials.quote2': '**Our conversion rate from cold lead to booked visit went from 4% to 18%.** Automatic screening keeps our team from wasting time on unqualified leads.',
    'testimonials.author2': 'Paula Guedes',
    'testimonials.role2': 'Independent Premium Realtor',
    'testimonials.quote3': 'We replaced three tools with JSYNQ and the history stopped getting lost at shift handover. **Any agent can pick up a lead knowing exactly where it left off.**',
    'testimonials.author3': 'Marina Duarte',
    'testimonials.role3': 'Head of Sales, Vetor Imóveis',

    'cta.title': 'Ready to transform your real estate business with AI?',
    'cta.body': 'While you’re at a showing, how many leads are waiting on a reply? Start free and stop losing opportunities.',
    'cta.cta1': 'Start Free Trial',
    'cta.cta2': 'Talk to an advisor',
    'cta.note': 'No credit card required. Free 7-day trial.',

    'footer.copyright': '© 2026 JSYNQ Workspace. All rights reserved.',
    'footer.terms': 'Terms of Use',
    'footer.privacy': 'Privacy Policy',

    'whatsapp.label': 'Chat on WhatsApp',
    'whatsapp.text': 'Hi! I came from the JSYNQ Imob page and would like to know more.',
    'whatsapp.consultText': 'Hi! I’d like to talk to a JSYNQ advisor about my real estate business.',

    'contact.title': 'Talk to us',
    'contact.close': 'Close',

    'cookie.aria': 'Cookie notice',
    'cookie.text': 'We use essential and analytics cookies to improve your experience. See our',
    'cookie.privacy': 'Privacy Policy',
    'cookie.accept': 'Accept',
    'cookie.reject': 'Reject',
  },
  es: {
    'nav.solucoes': 'Soluciones',
    'nav.funcionalidades': 'Funcionalidades',
    'nav.comoFunciona': 'Cómo Funciona',
    'nav.cta': 'Empezar Prueba Gratis',

    'hero.badge': 'Workspace para Corredores de Élite',
    'hero.titleA': 'Mientras muestras una propiedad,',
    'hero.titleB': ' tu próximo lead ya está calificado.',
    'hero.sub': 'Mientras estás ocupado, tus leads siguen siendo atendidos, calificados y agendados, incluso fuera del horario comercial. Directo por WhatsApp e Instagram, integrado con tu CRM.',
    'hero.cta1': 'Empezar Prueba Gratis',
    'hero.cta2': 'Hablar con un asesor',
    'hero.proof': '4,8/5 — más de 4.000 usuarios ya confían en JSYNQ',

    'partners.label': 'Integrado con las principales herramientas del mercado',

    'featuresIntro.eyebrow': 'Alto Rendimiento',
    'featuresIntro.title': 'Cada lead recibe respuesta. Ninguna oportunidad se pierde.',

    'feature1.title': 'Respuestas en menos de 10 segundos, en cualquier canal',
    'feature1.body': 'La IA de JSYNQ responde automáticamente por WhatsApp, Instagram y SMS, evitando demoras y que tus leads se enfríen.',

    'feature2.title': 'Nunca más completes el CRM a mano',
    'feature2.body': 'Cada conversación se convierte en información estratégica. La IA identifica presupuesto, ubicación y perfil crediticio, y organiza todo automáticamente para que el corredor dé seguimiento.',
    'feature2.tag1': 'CALIENTE',
    'feature2.tag2': '$$$',
    'feature2.tag3': 'URGENCIA',
    'feature2.tag4': 'UBICACIÓN',
    'feature2.cta1': 'Empezar Prueba Gratis',
    'feature2.cta2': 'Hablar con un asesor',

    'feature3.title': 'Deja de perder ventas por falta de seguimiento',
    'feature3.body': 'La IA recuerda las visitas, envía propiedades compatibles y mantiene a cada comprador comprometido hasta la decisión de compra.',

    'feature4.title': 'Genera Informes e Insights Inteligentes',
    'feature4.body': 'Descubre de dónde vienen tus mejores leads, qué buscan más y qué enfoques cierran más visitas. Decide con datos, no con suposiciones.',

    'feature5.title': 'Trazabilidad Total. Sin Pérdida de Historial.',
    'feature5.body': 'Todo el historial queda organizado en una única línea de tiempo. Cualquier corredor puede tomar el lead sabiendo qué propiedades ya vio, sus preferencias, presupuesto y etapa de la negociación.',
    'feature5.cta1': 'Empezar Prueba Gratis',
    'feature5.cta2': 'Hablar con un asesor',
    'feature5.t1': 'El Agente IA contacta al lead',
    'feature5.t1d': '30 jul, 2026, 10:00',
    'feature5.t2': 'El Agente IA movió el lead a la columna Calificado',
    'feature5.t2d': '30 jul, 2026, 19:34',
    'feature5.t3': 'El Agente IA movió el lead a la columna Negociación',
    'feature5.t3d': '31 jul, 2026, 15:57',
    'feature5.t4': 'El Agente IA agendó una nueva reunión — 04 ago, 2026, a las 14:30',
    'feature5.t4d': '31 jul, 2026, 16:12',
    'feature5.t5': 'El vendedor toma el lead',
    'feature5.t5d': '31 jul, 2026, 16:12',

    'how.eyebrow': 'Simplificado para Corredores',
    'how.title': 'Cómo JSYNQ acelera tu embudo en 3 pasos',
    'how.step1Title': 'Conecta tus Canales',
    'how.step1Body': 'En pocos minutos, conecta WhatsApp, Instagram y tus sistemas al Workspace, con total seguridad.',
    'how.step2Title': 'La IA Califica los Leads',
    'how.step2Body': 'Nuestra inteligencia artificial interactúa de inmediato, filtra curiosos, descubre el perfil de inversión y agenda la visita ideal.',
    'how.step3Title': 'Tú Cierras los Negocios',
    'how.step3Body': 'Tu equipo entra en acción solo con leads calientes, con historial completo y visitas ya agendadas en el calendario.',

    'testimonials.eyebrow': 'Éxito Comprobado',
    'testimonials.title': 'Testimonios de Clientes de JSYNQ AI',
    'testimonials.quote1': 'Antes de JSYNQ Workspace, perdíamos cerca del 40% de los leads de anuncios por demoras en responder los fines de semana. **Ahora la IA califica y agenda visitas un sábado por la noche** sin que yo tenga que mirar el celular.',
    'testimonials.author1': 'Ricardo Silva',
    'testimonials.role1': 'Director de Ventas, Inmobiliaria Apex',
    'testimonials.quote2': '**Nuestra conversión de lead frío a visita agendada subió del 4% al 18%.** El filtro automático evita que nuestro equipo pierda tiempo con leads no calificados.',
    'testimonials.author2': 'Paula Guedes',
    'testimonials.role2': 'Corredora Autónoma Premium',
    'testimonials.quote3': 'Cambiamos tres herramientas por JSYNQ y el historial dejó de perderse en el cambio de turno. **Cualquier corredor retoma el lead sabiendo exactamente dónde quedó.**',
    'testimonials.author3': 'Marina Duarte',
    'testimonials.role3': 'Gerente Comercial, Vetor Imóveis',

    'cta.title': '¿Listo para transformar tu inmobiliaria con IA?',
    'cta.body': 'Mientras haces una visita, ¿cuántos leads están esperando respuesta? Empieza gratis y deja de perder oportunidades.',
    'cta.cta1': 'Empezar Prueba Gratis',
    'cta.cta2': 'Hablar con un asesor',
    'cta.note': 'No se necesita tarjeta de crédito. Prueba gratis por 7 días.',

    'footer.copyright': '© 2026 JSYNQ Workspace. Todos los derechos reservados.',
    'footer.terms': 'Términos de Uso',
    'footer.privacy': 'Política de Privacidad',

    'whatsapp.label': 'Hablar por WhatsApp',
    'whatsapp.text': '¡Hola! Vine desde la página de JSYNQ Imob y me gustaría saber más.',
    'whatsapp.consultText': '¡Hola! Me gustaría hablar con un asesor de JSYNQ sobre mi inmobiliaria.',

    'contact.title': 'Habla con nosotros',
    'contact.close': 'Cerrar',

    'cookie.aria': 'Aviso de cookies',
    'cookie.text': 'Usamos cookies esenciales y de análisis para mejorar tu experiencia. Consulta nuestra',
    'cookie.privacy': 'Política de Privacidad',
    'cookie.accept': 'Aceptar',
    'cookie.reject': 'Rechazar',
  },
};
