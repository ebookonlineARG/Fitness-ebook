/**
 * PostHog bootstrap (browser only). Never throws: analytics must not break the funnel.
 */
import type { PostHog } from "posthog-js";

let client: PostHog | null = null;
let initializing = false;

const TOKEN = import.meta.env["VITE_LOVABLE_CONNECTOR_POSTHOG_API_KEY"] as string | undefined;
const REGION = (import.meta.env["VITE_LOVABLE_CONNECTOR_POSTHOG_REGION"] as string | undefined) ?? "eu";

const API_HOST = REGION === "us" ? "https://us.i.posthog.com" : "https://eu.i.posthog.com";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "xcod",
] as const;

function campaignProps() {
  const params = new URLSearchParams(window.location.search);
  const props: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) props[key] = value;
  }
  return props;
}

export async function initAnalytics() {
  if (typeof window === "undefined" || client || initializing || !TOKEN) return null;
  initializing = true;
  try {
    const mod = await import("posthog-js");
    const posthog = mod.default;
    posthog.init(TOKEN, {
      api_host: API_HOST,
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      persistence: "localStorage+cookie",
    });
    client = posthog;

    const props = campaignProps();
    if (Object.keys(props).length > 0) {
      posthog.register(props);
      posthog.people?.set(props);
    }
    return posthog;
  } catch {
    return null;
  } finally {
    initializing = false;
  }
}

export function capture(event: string, props: Record<string, unknown> = {}) {
  try {
    client?.capture(event, props);
  } catch {
    /* analytics must never break the funnel */
  }
}
