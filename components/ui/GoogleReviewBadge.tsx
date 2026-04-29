// Reusable Google review badge — 5.0 stars + link to Google Business Profile.
// Used on service sub-pages above the estimator CTA section.

const GOOGLE_BUSINESS_URL = "https://g.page/r/forge-point-property-services";

export function GoogleReviewBadge() {
  return (
    <section className="bg-navy py-10 px-6 border-t border-white/8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        {/* Stars + label */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#D4981A"
                stroke="#D4981A"
                strokeWidth="1.5"
                className="flex-shrink-0"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="font-condensed font-600 text-sm text-white uppercase tracking-wide">
            5.0 on Google
          </span>
        </div>

        <span className="hidden sm:block text-white/20">·</span>

        <a
          href={GOOGLE_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-condensed text-sm uppercase tracking-wide text-amber hover:text-white transition-colors"
        >
          Read All Reviews on Google →
        </a>
      </div>
    </section>
  );
}
