import Image from "next/image";
import Link from "next/link";

export interface LearnMoreLink {
  title:        string;
  slug:         string;   // article slug
  categorySlug: string;   // category slug for URL
}

interface ServiceOverviewProps {
  heading:         string;
  body:            readonly string[];
  overviewImage:   string; // local image path (from public/)
  learnMoreLinks?: LearnMoreLink[];
}

export function ServiceOverview({ heading, body, overviewImage, learnMoreLinks }: ServiceOverviewProps) {
  return (
    <section className="bg-navy py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Text */}
        <div>
          <h2
            className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-wide mb-6
                       border-l-2 border-orange pl-4"
          >
            {heading}
          </h2>

          <div className="space-y-4">
            {body.map((paragraph, i) => (
              <p key={i} className="font-barlow font-300 text-muted text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Learn more — inline University article links */}
          {learnMoreLinks && learnMoreLinks.length > 0 && (
            <p className="mt-5 font-barlow font-300 text-sm italic text-white/38 leading-relaxed">
              <span className="not-italic font-500 text-white/50">Learn more: </span>
              {learnMoreLinks.map((link, i) => (
                <span key={link.slug}>
                  <Link
                    href={`/university/${link.categorySlug}/${link.slug}`}
                    className="underline underline-offset-2 hover:text-orange transition-colors"
                  >
                    {link.title}
                  </Link>
                  {i < learnMoreLinks.length - 1 && (
                    <span aria-hidden="true" className="mx-1.5 not-italic">·</span>
                  )}
                </span>
              ))}
            </p>
          )}
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/8">
          <Image
            src={overviewImage}
            alt={heading}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-navy/10" />
        </div>
      </div>
    </section>
  );
}
