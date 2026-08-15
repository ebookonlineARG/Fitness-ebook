/**
 * Meta Pixel + Google Analytics event helpers.
 * Safe no-ops when the pixels are not installed or during SSR.
 */
type Params = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", name, params);
    window.gtag?.("event", name.toLowerCase(), params);
  } catch {
    /* tracking must never break checkout */
  }
}

export const trackPageView = () => trackEvent("PageView");

export const trackInitiateCheckout = (value: number) =>
  trackEvent("InitiateCheckout", { value, currency: "ARS", content_name: "Pack Definitivo Pérdida de Peso" });

export const trackPurchase = (value: number) =>
  trackEvent("Purchase", { value, currency: "ARS", content_name: "Pack Definitivo Pérdida de Peso" });
