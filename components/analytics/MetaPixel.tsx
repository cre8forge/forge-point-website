"use client";

/**
 * MetaPixel
 *
 * Standalone Meta Pixel implementation with Advanced Matching support.
 * Use this OR the GTM Meta Pixel tag — not both simultaneously.
 *
 * Advanced Matching hashes PII client-side with SHA-256 before sending
 * to Meta. This improves event match rates by 10-30% over base pixel alone.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_META_PIXEL_ID in Vercel env vars.
 *   2. Call setAdvancedMatching({ email, phone }) after a user provides data
 *      (e.g. on contact form submit).
 *   3. Call trackMetaEvent("Lead", {...}) for conversion events.
 */

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// ── SHA-256 hash helper (Web Crypto — available in all modern browsers) ──

async function sha256hex(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  const encoded    = new TextEncoder().encode(normalized);
  const hashBuf    = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── fbq type shim ─────────────────────────────────────────────────

declare global {
  interface Window {
    fbq:  ((...args: unknown[]) => void) & { loaded?: boolean; version?: string; queue?: unknown[] };
    _fbq: Window["fbq"];
  }
}

// ── Advanced Matching ─────────────────────────────────────────────

export interface AdvancedMatchData {
  email?:     string;
  phone?:     string;
  firstName?: string;
  lastName?:  string;
  zip?:       string;
  city?:      string;
  state?:     string;
}

/**
 * Call after a user provides contact info (form submit, account login, etc.).
 * Hashes all provided fields with SHA-256 and re-initialises the pixel
 * with the matched data — improves attribution on subsequent events.
 */
export async function setAdvancedMatching(data: AdvancedMatchData) {
  if (typeof window === "undefined" || !PIXEL_ID || typeof window.fbq !== "function") return;

  const matched: Record<string, string> = {};
  if (data.email)     matched.em = await sha256hex(data.email);
  if (data.phone)     matched.ph = await sha256hex(data.phone.replace(/\D/g, ""));
  if (data.firstName) matched.fn = await sha256hex(data.firstName);
  if (data.lastName)  matched.ln = await sha256hex(data.lastName);
  if (data.zip)       matched.zp = await sha256hex(data.zip);
  if (data.city)      matched.ct = await sha256hex(data.city);
  if (data.state)     matched.st = await sha256hex(data.state);

  if (Object.keys(matched).length === 0) return;
  window.fbq("init", PIXEL_ID, matched);
}

/**
 * Fire a standard or custom Meta event.
 * Standard events: PageView, Lead, Contact, InitiateCheckout, CompleteRegistration
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params ?? {});
}

// ── Component ─────────────────────────────────────────────────────

export function MetaPixel() {
  const pathname      = usePathname();
  const initialRender = useRef(true);

  // Fire PageView on every SPA route change.
  // Skip the first render — the inline script already fires PageView on load,
  // so we only track subsequent client-side navigations to avoid double-counting.
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s){
if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
