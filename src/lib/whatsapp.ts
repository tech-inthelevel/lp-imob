// Shared WhatsApp number + link builder — reused by the floating WhatsApp
// button and every secondary "Falar com consultor" CTA on the page.
export const WHATSAPP_NUMBER = '16892803820'; // +1 (689) 280-3820

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
