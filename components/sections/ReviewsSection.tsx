import { SectionHeader } from "@/components/ui/SectionHeader";
import { PLACEHOLDER_REVIEWS } from "@/lib/site-data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#D4981A" : "none"}
          stroke="#D4981A"
          strokeWidth="1.5"
          className="flex-shrink-0"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="py-24 px-6 bg-navy" id="reviews">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          eyebrow="Client Reviews"
          heading="What Our Clients Say"
          subheading="Real feedback from real Northern Colorado property owners."
          className="mb-16"
        />

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLACEHOLDER_REVIEWS.map((review) => (
            <div
              key={review.name}
              className="bg-card border border-card rounded-sm p-7 flex flex-col gap-5"
            >
              <StarRating rating={review.rating} />

              <p className="font-cormorant italic font-300 text-lg text-white/90 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="font-barlow font-400 text-sm text-white">
                  {review.name}
                </span>
                <span className="font-barlow font-300 text-xs text-muted">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating + Google link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span className="font-condensed font-600 text-sm text-white uppercase tracking-wide">
              5.0 on Google
            </span>
          </div>
          <span className="hidden sm:block text-white/20">·</span>
          {/* Link updated once Google Business Profile is verified */}
          <a
            href="https://g.page/r/forge-point-property-services"
            target="_blank"
            rel="noopener noreferrer"
            className="font-condensed text-sm uppercase tracking-wide text-amber hover:text-white transition-colors"
          >
            Read All Reviews on Google →
          </a>
        </div>

      </div>
    </section>
  );
}
