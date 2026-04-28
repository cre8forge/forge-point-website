import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Divider } from "@/components/ui/Divider";
import { SERVICES_DATA } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Forge Point is a full-service property company — from acquisition strategy and representation to renovation, grounds, and daily estate management. One team. Every scale. Northern Colorado.",
};

// ── RE license disclosure ────────────────────────────────────────

const RE_DISCLOSURE =
  "Aaron R. Dolph · Colorado Real Estate Broker · License #FA100100755 · " +
  "Employing Broker: Triumph Real Estate Corporation #ER1325490";

// ── Category definitions ─────────────────────────────────────────

type ServiceCard = {
  label:       string;
  description: string;
  href:        string;
};

type Category = {
  label:       string;
  description: string;
  accent?:     boolean;   // amber highlight for Advisory
  disclosure?: boolean;   // show RE license disclosure
  cards:       ServiceCard[];
};

const CATEGORIES: Category[] = [
  // ── 1. Forge Point Advisory ────────────────────────────────────
  {
    label:    "Forge Point Advisory",
    accent:   true,
    disclosure: true,
    description:
      "Forge Point Advisory is a licensed Colorado real estate brokerage practice bringing 15 years of commercial and residential market experience to buyers, sellers, and investors who need more than an agent — they need a strategic partner who has managed the assets they're buying or selling. We represent your interests from first analysis through close.",
    cards: [
      {
        label:       "Buyer Representation",
        description: "Whether you're buying your first home, upgrading, or adding to an investment portfolio — we represent you with the same depth. We've managed the properties you're buying. We see deferred maintenance, realistic rent potential, and HOA red flags that most agents miss entirely.",
        href:        "/services/buyer-representation",
      },
      {
        label:       "Seller Representation",
        description: "For homeowners, landlords, and investors who want results — not just a sign in the yard. We bring honest pricing strategy, presale improvement guidance, and real buyer relationships. Residential, investment, and commercial.",
        href:        "/services/seller-representation",
      },
      {
        label:       "Investment Acquisition Analysis",
        description: "Before you buy, know what you're buying. Cap rate, cash-on-cash return, deferred maintenance exposure, and market comps — delivered as a written report, not a sales pitch.",
        href:        "/services/investment-acquisition-analysis",
      },
      {
        label:       "Commercial Leasing Advisory",
        description: "Tenant representation and landlord advisory for commercial leases — office, retail, industrial, and flex. We've sat on both sides of the table managing millions of square feet.",
        href:        "/services/commercial-leasing-advisory",
      },
      {
        label:       "Portfolio Strategy & Disposition",
        description: "Hold, sell, refinance, or 1031 — we help investment property owners think through the full picture before making a move. Coordination with your CPA and attorney. No transaction fee unless we represent the deal.",
        href:        "/services/portfolio-strategy",
      },
      {
        label:       "1031 Exchange Coordination",
        description: "Time-sensitive and unforgiving. We coordinate the identification, analysis, and acquisition of 1031 replacement properties with the precision the timeline demands.",
        href:        "/services/1031-exchange",
      },
    ],
  },

  // ── 2. Property & Portfolio Management ─────────────────────────
  {
    label: "Property & Portfolio Management",
    description:
      "Over 4 million square feet of commercial and industrial space managed. Multifamily communities up to 115 tenants. Single-family homes handled with the personal attention individual owners deserve. Forge Point's management practice is built on documented systems, vetted vendors, and the judgment that only comes from years on the ground.",
    cards: [
      {
        label:       "Commercial & Industrial Management",
        description: "Full-service management for office parks, retail centers, warehouses, and industrial facilities. We've managed 4M+ sq ft of commercial space — we know what owners, tenants, and inspectors expect at scale.",
        href:        "/services/property-management",
      },
      {
        label:       "Multifamily & HOA Management",
        description: "Community management for multifamily properties and HOA communities up to 115 tenants. Board-ready reporting, consistent systems, and responsive vendor coordination.",
        href:        "/services/property-management",
      },
      {
        label:       "Single Family Home Management",
        description: "Personalized management for individual rental homes. A dedicated point of contact who knows the property, the tenants, and the owner's preferences — not just a work order queue.",
        href:        "/services/property-management",
      },
      {
        label:       "On-Call Boots-on-Ground Response",
        description: "Keep your existing management contract. Add Forge Point as your local 24/7 response partner for site visits, emergency coordination, and physical presence when your primary manager can't be there.",
        href:        "/services/property-management",
      },
      {
        label:       "Maintenance Coordination",
        description: "24/7 maintenance intake, vendor dispatch, and resolution follow-up. Vetted relationships across all trades — issues are addressed promptly, not put on a list.",
        href:        "/services/property-management",
      },
    ],
  },

  // ── 3. Custom Interiors ────────────────────────────────────────
  {
    label: "Custom Interiors",
    description:
      "Whole-home renovations, targeted remodels, and precision finish work — all delivered by the same crew from start to finish. No subcontractor roulette. No handoff gaps. Forge Point manages the build the same way we manage the property: with accountability at every stage.",
    cards: SERVICES_DATA.filter((s) =>
      ["renovation-remodel", "framing-finishes", "kitchen-bath-more", "basement-finishing", "additions-expansions", "investment-property-rehab", "flooring-tile"].includes(s.slug)
    ).map((s) => ({
      label:       s.name,
      description: s.tagline,
      href:        `/services/${s.slug}`,
    })),
  },

  // ── 4. Outdoor Living & Grounds ───────────────────────────────
  {
    label: "Outdoor Living & Grounds",
    description:
      "From bespoke landscape design to week-in week-out grounds maintenance, Forge Point handles every inch of your property's exterior. We design it, build it, and maintain it — one company, one standard, one crew that knows your property.",
    cards: [
      {
        label:       "Landscape Design & Install",
        description: "Design through completion — turnkey outdoor transformations for residential and commercial properties across Northern Colorado. We don't hand you a drawing and disappear.",
        href:        "/services/landscape-design-install",
      },
      {
        label:       "Decks, Pergolas & Patios",
        description: "Custom outdoor living structures built for Colorado's climate and your lifestyle. Engineered for the freeze-thaw cycle most contractors ignore.",
        href:        "/services/decks-pergolas-patios",
      },
      {
        label:       "Custom Water Features",
        description: "Ponds, waterfalls, fountains, and pondless systems custom-built for your outdoor space. Low-maintenance design built for Colorado's seasons.",
        href:        "/services/custom-water-features",
      },
      {
        label:       "Fencing & Retaining Walls",
        description: "Supply and install for residential, HOA, and commercial properties. Built to last Colorado's seasons — and to actually hold the grade.",
        href:        "/services/fencing",
      },
      {
        label:       "Full-Service Grounds Maintenance",
        description: "Consistent, reliable care that keeps your property looking its best week after week. Residential, commercial, and HOA community maintenance on a schedule you can count on.",
        href:        "/services/grounds-maintenance",
      },
      {
        label:       "Industrial Property Maintenance",
        description: "Large-scale commercial and industrial exterior upkeep — reliable, consistent, and built for properties where downtime costs real money.",
        href:        "/services/industrial-maintenance",
      },
      {
        label:       "Pressure Washing & Window Cleaning",
        description: "Restore curb appeal fast — driveways, siding, decks, patios, and windows. Commercial and residential.",
        href:        "/services/power-window-washing",
      },
      {
        label:       "Junk Haul Off & Property Cleanouts",
        description: "Fast, professional junk removal and full property cleanouts. We haul it so you don't have to — and we leave the property cleaner than we found it.",
        href:        "/services/junk-haul-off",
      },
    ],
  },

  // ── 5. Concierge & Estate Services ───────────────────────────
  {
    label: "Concierge & Estate Services",
    description:
      "For property owners, executives, and families who want every detail handled — without managing the people handling it. Forge Point's concierge practice covers the services that make a property feel like a home and a home feel like it runs itself. Discreet, consistent, and always a familiar face.",
    cards: [
      {
        label:       "Estate Housekeeping & Cleaning",
        description: "Consistent, thorough home cleaning by a trusted team that knows your home, your preferences, and your schedule. Not a rotation of strangers — the same people, every time.",
        href:        "/services/housekeeping-cleaning",
      },
      {
        label:       "Home Safety & Wellness Checks",
        description: "Scheduled interior and exterior checks with photo reports — water heaters, HVAC filters, security, and anything that shouldn't be ignored between visits.",
        href:        "/services/home-safety-checks",
      },
      {
        label:       "Mobile Auto Detailing",
        description: "Professional vehicle detailing at your door — no drop-off, no waiting, no strangers with your keys. Residential and estate service only.",
        href:        "/services/mobile-auto-detailing",
      },
      {
        label:       "Yard & Pet Waste Management",
        description: "Keep your grounds clean, safe, and odor-free — handled on a regular schedule without you lifting a finger. Available standalone or as part of a grounds maintenance package.",
        href:        "/services/poop-scooping",
      },
      {
        label:       "Concierge Errands & Local Services",
        description: "Trusted local errand service for busy owners and families — deliveries, pickups, property supplies, and the small tasks that accumulate. Available to existing Forge Point clients.",
        href:        "/services/errand-services",
      },
    ],
  },
];

// ── Page ──────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <section className="bg-navy pt-32 pb-16 px-6 border-b border-white/8">
          <div className="max-w-4xl mx-auto">
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-orange mb-4">
              What We Do
            </p>
            <h1 className="font-cinzel font-700 text-white text-3xl md:text-4xl uppercase
                           tracking-wide leading-tight mb-6">
              Our Services
            </h1>
            <p className="font-barlow font-300 text-white/60 text-base leading-relaxed max-w-3xl">
              Forge Point is a full-service property company — from acquisition strategy and
              representation to renovation, grounds, and daily estate management. One team.
              Every scale. Northern Colorado&apos;s property done right.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-navy py-16 px-6">
          <div className="max-w-6xl mx-auto space-y-20">

            {CATEGORIES.map((cat) => (
              <div key={cat.label}>

                {/* Category header */}
                <div className={`mb-6 pb-5 border-b ${cat.accent ? "border-amber/20" : "border-white/8"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className={`font-condensed font-700 text-sm uppercase tracking-[0.2em] ${cat.accent ? "text-amber" : "text-orange"}`}>
                      {cat.label}
                    </h2>
                    <div className="flex-1 border-t border-white/6" />
                  </div>

                  <p className="font-barlow font-300 text-white/55 text-sm leading-relaxed max-w-3xl">
                    {cat.description}
                  </p>

                  {/* RE license disclosure under Advisory */}
                  {cat.disclosure && (
                    <p className="font-barlow font-300 text-white/25 text-[11px] mt-3 leading-relaxed">
                      {RE_DISCLOSURE}
                    </p>
                  )}
                </div>

                {/* Service cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.cards.map((card) => (
                    <Link
                      key={`${card.href}-${card.label}`}
                      href={card.href}
                      className={`group bg-card border p-6 hover:border-orange/40 transition-all duration-200 flex flex-col ${
                        cat.accent ? "border-amber/15 hover:border-amber/40" : "border-white/8"
                      }`}
                    >
                      <h3 className={`font-condensed font-600 text-sm uppercase tracking-wide mb-2 transition-colors ${
                        cat.accent
                          ? "text-amber/90 group-hover:text-amber"
                          : "text-white group-hover:text-orange"
                      }`}>
                        {card.label}
                      </h3>
                      <p className="font-barlow font-300 text-white/50 text-sm leading-relaxed flex-1">
                        {card.description}
                      </p>
                      <span className={`mt-4 font-condensed font-600 text-xs uppercase tracking-widest transition-colors ${
                        cat.accent
                          ? "text-amber/50 group-hover:text-amber"
                          : "text-orange/60 group-hover:text-orange"
                      }`}>
                        Learn more →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Divider />

          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
