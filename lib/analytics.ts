/**
 * Analytics helpers — push events to GTM's dataLayer.
 * Call these from client components after user interactions.
 *
 * GTM picks up every dataLayer.push() and can forward events to:
 *   - Google Analytics 4
 *   - Google Ads conversion tracking (Enhanced Conversions)
 *   - Meta Pixel (Advanced Matching)
 *   - Any other tag configured in your GTM container
 */

// ── Types ─────────────────────────────────────────────────────────

type EventParams = Record<string, string | number | boolean>;

// ── Core push ─────────────────────────────────────────────────────

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  const dl = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  if (!Array.isArray(dl)) return;
  dl.push({ event: eventName, ...params });
}

// ── SHA-256 hash helper (Enhanced Conversions requires hashed PII) ─

async function sha256hex(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  const encoded    = new TextEncoder().encode(normalized);
  const hashBuf    = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── Enhanced Conversions (Google Ads) ─────────────────────────────

export interface EnhancedConversionData {
  email?:     string;
  phone?:     string;
  firstName?: string;
  lastName?:  string;
  address?: {
    street?:  string;
    city?:    string;
    region?:  string;
    zip?:     string;
    country?: string;
  };
}

/**
 * Hash user-provided PII for Google Ads Enhanced Conversions.
 *
 * Call this after a contact form submit or lead capture, then push
 * the result as "user_data" on the conversion event so GTM / Google Ads
 * can match it against signed-in Google accounts.
 *
 * All fields are SHA-256 hashed client-side before touching the network.
 *
 * @see https://support.google.com/google-ads/answer/13258081
 */
export async function buildEnhancedConversionData(
  data: EnhancedConversionData,
): Promise<Record<string, unknown>> {
  const user_data: Record<string, unknown> = {};

  if (data.email)     user_data.sha256_email_address = await sha256hex(data.email);
  if (data.phone)     user_data.sha256_phone_number  = await sha256hex(data.phone.replace(/\D/g, ""));
  if (data.firstName) user_data.sha256_first_name    = await sha256hex(data.firstName);
  if (data.lastName)  user_data.sha256_last_name     = await sha256hex(data.lastName);

  if (data.address) {
    const addr: Record<string, unknown> = {};
    if (data.address.street)  addr.sha256_street  = await sha256hex(data.address.street);
    if (data.address.city)    addr.city           = data.address.city.trim().toLowerCase();
    if (data.address.region)  addr.region         = data.address.region.trim().toLowerCase();
    if (data.address.zip)     addr.postal_code    = data.address.zip.trim();
    if (data.address.country) addr.country        = data.address.country.trim().toUpperCase();
    if (Object.keys(addr).length > 0) user_data.address = addr;
  }

  return user_data;
}

/**
 * Fire a Google Ads conversion event with Enhanced Conversion data.
 *
 * Usage (contact form submit):
 *   const userData = await buildEnhancedConversionData({ email, phone });
 *   fireEnhancedConversion("AW-CONVERSION_ID/LABEL", userData);
 *
 * The conversionId must match the conversion action in your Google Ads account.
 */
export function fireEnhancedConversion(
  conversionId: string,
  userData: Record<string, unknown>,
  extras?: EventParams,
) {
  if (typeof window === "undefined") return;
  const dl = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  if (!Array.isArray(dl)) return;

  dl.push({
    event:       "conversion",
    send_to:     conversionId,
    user_data:   userData,
    ...extras,
  });
}

// ── Pre-built events ──────────────────────────────────────────────

export const analytics = {

  /** User clicks "Request a Detailed Quote" from the estimator */
  estimateRequested(categories: string[]) {
    trackEvent("estimate_requested", {
      service_categories: categories.join(", "),
      item_count:         categories.length,
    });
  },

  /** Contact form successfully submitted — optionally fire Enhanced Conversion */
  contactFormSubmitted(
    hasEstimate: boolean,
    categories: string,
    options?: { conversionId?: string; userData?: Record<string, unknown> },
  ) {
    trackEvent("contact_form_submitted", {
      has_estimate:       hasEstimate,
      service_categories: categories,
    });

    if (options?.conversionId && options?.userData) {
      fireEnhancedConversion(options.conversionId, options.userData);
    }
  },

  /** User clicks the phone number link */
  phoneClicked(location: string) {
    trackEvent("phone_click", { location });
  },

  /** User clicks any primary CTA button */
  ctaClicked(label: string, location: string) {
    trackEvent("cta_click", { label, location });
  },

  /** User views an individual service page */
  serviceViewed(serviceName: string, slug: string) {
    trackEvent("service_viewed", { service_name: serviceName, slug });
  },

  /** User submits the estimate form (estimate page) */
  estimateViewed(totalLow: number, totalHigh: number, itemCount: number) {
    trackEvent("estimate_viewed", {
      estimate_low:  totalLow,
      estimate_high: totalHigh,
      item_count:    itemCount,
    });
  },

  /** Search query entered */
  siteSearched(query: string, resultCount: number) {
    trackEvent("site_search", { search_term: query, result_count: resultCount });
  },
};
