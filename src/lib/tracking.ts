/**
 * Single tracking layer: Meta Pixel + Google Analytics + PostHog.
 * Safe no-ops when a destination is not installed or during SSR.
 */
import { capture } from "./analytics";

type Params = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const PRODUCT = "Pack Definitivo Pérdida de Peso";

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", name, params);
    window.gtag?.("event", name.toLowerCase(), params);
  } catch {
    /* tracking must never break checkout */
  }
  capture(name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase(), params);
}

export const trackPageView = () => trackEvent("PageView", { page: window.location.pathname });

export const trackSectionView = (section: string) =>
  trackEvent("SectionView", { section });

export const trackScrollDepth = (depth: number) => trackEvent("ScrollDepth", { depth });

export const trackCtaClick = (location: string) => trackEvent("CtaClick", { location });

export const trackFaqOpen = (question: string) => trackEvent("FaqOpen", { question });

export const trackInitiateCheckout = (value: number, location?: string) =>
  trackEvent("InitiateCheckout", {
    value,
    currency: "ARS",
    content_name: PRODUCT,
    ...(location ? { location } : {}),
  });

export const trackCheckoutError = (message: string) =>
  trackEvent("CheckoutError", { message });

export const trackPurchase = (value: number, paymentId?: string | null) =>
  trackEvent("Purchase", {
    value,
    currency: "ARS",
    content_name: PRODUCT,
    ...(paymentId ? { payment_id: paymentId } : {}),
  });

export const trackPurchaseNotVerified = () => trackEvent("PurchaseNotVerified");
