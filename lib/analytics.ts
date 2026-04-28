/**
 * Analytics helpers — push events to GTM's dataLayer.
 * Call these from client components after user interactions.
 *
 * GTM picks up every dataLayer.push() and can forward events to:
 *   - Google Analytics 4
 *   - Google Ads conversion tracking
 *   - Meta Pixel
 *   - Any other tag configured in your GTM container
 */

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  const dl = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  if (!Array.isArray(dl)) return;
  dl.push({ event: eventName, ...params });
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

  /** Contact form successfully submitted */
  contactFormSubmitted(hasEstimate: boolean, categories: string) {
    trackEvent("contact_form_submitted", {
      has_estimate:       hasEstimate,
      service_categories: categories,
    });
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
