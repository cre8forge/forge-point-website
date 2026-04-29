import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ── Advisory featured card ────────────────────────────────────────

const ADVISORY = {
  photo:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
  label: "Advisory",
  heading: "Forge Point Advisory",
  quote:
    "We've managed millions of square feet of the properties you're buying or selling. That's not an agent — that's an advantage.",
  services: [
    "Buyer & Seller Representation",
    "Investment Acquisition Analysis",
    "Portfolio Strategy & 1031 Exchange",
  ],
  ctaLabel: "Explore Advisory Services →",
  href: "/services/buyer-representation",
  disclosure:
    "Aaron R. Dolph · Licensed CO Broker #FA100100755 · Employing Broker: Triumph Real Estate Corporation #ER1325490",
};

// ── 2×2 grid cards ────────────────────────────────────────────────

const CARDS = [
  {
    photo:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80",
    label: "Management",
    heading: "Property & Portfolio Management",
    quote:
      "4 million square feet managed. 115 tenants at peak. We've run the properties you own — and we know what happens when management gets it wrong.",
    services: [
      "Commercial & Industrial Management",
      "Multifamily & HOA Communities",
      "Single Family Home Management",
    ],
    ctaLabel: "Explore Management →",
    href: "/services/property-management",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
    label: "Custom Interiors",
    heading: "Custom Interiors",
    quote:
      "The same company managing your property is the one swinging the hammer. No handoffs. No finger-pointing. One team accountable from demo to done.",
    services: [
      "Renovation & Remodel",
      "Basement Finishing & Additions",
      "Investment Property Rehab",
      "Kitchen, Bath & Flooring",
    ],
    ctaLabel: "Explore Interiors →",
    href: "/services/renovation-remodel",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    label: "Outdoor Living & Grounds",
    heading: "Outdoor Living & Grounds",
    quote:
      "We design it. We build it. We maintain it. Your outdoor space never has to be someone else's problem again.",
    services: [
      "Landscape Design & Install",
      "Decks, Pergolas & Patios",
      "Grounds Maintenance",
      "Pressure Washing & Fencing",
    ],
    ctaLabel: "Explore Outdoor Services →",
    href: "/services/landscape-design-install",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    label: "Concierge & Estate",
    heading: "Concierge & Estate Services",
    quote:
      "The same trusted face. Every visit. For the details that don't make the to-do list until something goes wrong.",
    services: [
      "Estate Housekeeping & Cleaning",
      "Home Safety & Wellness Checks",
      "Mobile Auto Detailing",
    ],
    ctaLabel: "Explore Concierge →",
    href: "/services/housekeeping-cleaning",
  },
];

// ── Component ─────────────────────────────────────────────────────

export function ServicesSection() {
  return (
    <section className="py-24 px-6 bg-navy" id="services">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          eyebrow="What We Do"
          heading="One Company. Every Corner of Your Property."
          subheading="From acquisition strategy and real estate representation to renovation, grounds maintenance, and daily estate management — Forge Point handles what your property needs at every scale. One crew. One standard. Northern Colorado's property done right."
          className="mb-12"
        />

        {/* ── Advisory — full-width featured card ── */}
        <Link
          href={ADVISORY.href}
          className="block relative overflow-hidden mb-5 group border border-amber/15 hover:border-amber/35 transition-colors duration-300"
        >
          {/* Background image */}
          <div className="relative aspect-[16/7] sm:aspect-[16/6] lg:aspect-[16/5]">
            <Image
              src={ADVISORY.photo}
              alt="Aerial view of residential neighborhood representing Forge Point Advisory real estate services"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            {/* Dark navy overlay */}
            <div className="absolute inset-0 bg-[#0D1B2A]/60" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">

              {/* Label + badge */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-amber">
                  {ADVISORY.label}
                </span>
                <span className="font-condensed font-600 text-[9px] uppercase tracking-[0.12em] text-navy bg-amber px-2 py-0.5">
                  Highest &amp; Best
                </span>
              </div>

              {/* H3 */}
              <h3 className="font-cinzel font-700 text-white text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide mb-3 normal-case">
                {ADVISORY.heading}
              </h3>

              {/* Quote */}
              <p className="font-cormorant italic font-300 text-white/85 text-base sm:text-lg leading-relaxed border-l-[3px] border-amber pl-4 mb-4 max-w-2xl">
                &ldquo;{ADVISORY.quote}&rdquo;
              </p>

              {/* Sub-services */}
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4">
                {ADVISORY.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-1.5 font-barlow font-300 text-sm text-white/65"
                  >
                    <span className="text-amber text-[9px] leading-none">◆</span>
                    {s}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <span className="font-condensed font-600 text-sm uppercase tracking-widest text-amber/80 group-hover:text-amber transition-colors">
                {ADVISORY.ctaLabel}
              </span>

              {/* RE Disclosure */}
              <p className="font-barlow font-300 text-[9px] text-white/22 mt-3 leading-relaxed">
                {ADVISORY.disclosure}
              </p>
            </div>
          </div>
        </Link>

        {/* ── 2×2 grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-card border border-white/8 overflow-hidden hover:border-orange/30 transition-all duration-200 flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={card.photo}
                  alt={`${card.heading} — Forge Point Property Services Northern Colorado`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">

                {/* Label */}
                <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-amber mb-2">
                  {card.label}
                </p>

                {/* H3 */}
                <h3 className="font-cinzel font-700 text-white text-base uppercase tracking-wide mb-3 normal-case group-hover:text-orange transition-colors">
                  {card.heading}
                </h3>

                {/* Quote */}
                <p className="font-cormorant italic font-300 text-white/70 text-sm leading-relaxed border-l-[3px] border-orange/40 pl-3 mb-4">
                  &ldquo;{card.quote}&rdquo;
                </p>

                {/* Sub-services */}
                <ul className="space-y-1.5 mb-5 flex-1">
                  {card.services.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 font-barlow font-300 text-xs text-white/55"
                    >
                      <span className="text-orange/60 text-[9px] mt-0.5 flex-shrink-0 leading-none">◆</span>
                      {s}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <span className="font-condensed font-600 text-xs uppercase tracking-widest text-orange/60 group-hover:text-orange transition-colors">
                  {card.ctaLabel}
                </span>

              </div>
            </Link>
          ))}
        </div>

        {/* Section footer */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="font-condensed font-600 text-sm uppercase tracking-widest text-white/35 hover:text-orange transition-colors"
          >
            View All Services →
          </Link>
        </div>

      </div>
    </section>
  );
}
