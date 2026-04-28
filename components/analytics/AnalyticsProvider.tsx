"use client";

/**
 * AnalyticsProvider
 *
 * Mounted once in layout.tsx alongside {children} — not a wrapper.
 * Responsibilities:
 *  1. SPA page-view events on every Next.js route change
 *  2. Unified click capture: element id, classes, text, tag, href → dataLayer
 *  3. Geo / IP lookup (once per session) → dataLayer geo_data event
 */

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag:      (...args: unknown[]) => void;
  }
}

type GeoData = {
  ip:           string;
  city?:        string | null;
  region?:      string | null;
  country?:     string | null;
  country_code?:string | null;
  zip?:         string | null;
  lat?:         string | null;
  lng?:         string | null;
};

// ── Helpers ───────────────────────────────────────────────────────

function pushDL(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

// ── Inner component: requires Suspense boundary ───────────────────

function PageViewTracker() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    pushDL({
      event:       "page_view",
      page_path:   pathname,
      page_search: searchParams.toString() || undefined,
      page_title:  document.title,
      page_url:    window.location.href,
    });
  }, [pathname, searchParams]);

  return null;
}

// ── Main component ────────────────────────────────────────────────

export function AnalyticsProvider() {

  /* ── 1. Global click capture ── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target  = e.target as HTMLElement;
      const closest = target.closest("a, button, [data-track]") as HTMLElement | null;
      if (!closest) return;
      if (!Array.isArray(window.dataLayer)) return;

      const anchor = closest as HTMLAnchorElement;
      pushDL({
        event:          "element_click",
        element_id:     closest.id    || undefined,
        element_classes:closest.className?.trim() || undefined,
        element_text:   closest.textContent?.trim().slice(0, 120) || undefined,
        element_tag:    closest.tagName.toLowerCase(),
        element_href:   anchor.href   || undefined,
        page_path:      window.location.pathname,
      });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  /* ── 2. Geo / IP lookup (once per session) ── */
  useEffect(() => {
    const SESSION_KEY = "fp_geo";
    const cached = sessionStorage.getItem(SESSION_KEY);

    if (cached) {
      try {
        const geo: GeoData = JSON.parse(cached);
        pushDL({ event: "geo_data", ...geo });
      } catch { /* ignore malformed cache */ }
      return;
    }

    fetch("/api/geo")
      .then((r) => r.json())
      .then((geo: GeoData) => {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(geo));
        pushDL({
          event:        "geo_data",
          visitor_ip:   geo.ip,
          visitor_city: geo.city    || undefined,
          visitor_region: geo.region || undefined,
          visitor_country: geo.country || undefined,
          visitor_country_code: geo.country_code || undefined,
          visitor_zip:  geo.zip    || undefined,
          visitor_lat:  geo.lat    || undefined,
          visitor_lng:  geo.lng    || undefined,
        });
      })
      .catch(() => { /* geo unavailable — continue silently */ });
  }, []);

  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
