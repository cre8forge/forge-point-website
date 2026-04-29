import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "About Forge Point | Northern Colorado Property Services & Advisory",
  description:
    "In the field since 2010. $300M+ portfolio managed. Residential and commercial construction at every scale. Built by Midwesterners, earned one project at a time.",
};

const STATS = [
  { value: "2010",   label: "In the field since" },
  { value: "$300M+", label: "Portfolio managed" },
  { value: "$3M+",   label: "Commercial project scope" },
  { value: "15+",    label: "Years on the Front Range" },
];

const SERVICE_ARMS = [
  {
    name:        "Forge Point Advisory",
    description: "Licensed real estate brokerage — buyer rep, seller rep, investment acquisition, commercial leasing, portfolio strategy, and 1031 coordination.",
    href:        "/services/buyer-representation",
    accent:      true,
  },
  {
    name:        "Property & Portfolio Management",
    description: "Commercial, industrial, multifamily, HOA, and single-family management with boots-on-ground field presence.",
    href:        "/services/property-management",
    accent:      false,
  },
  {
    name:        "Custom Interiors",
    description: "Whole-home renovations, kitchen and bath remodels, basement finishing, additions, investment property rehab, framing, and finish carpentry.",
    href:        "/services/renovation-remodel",
    accent:      false,
  },
  {
    name:        "Outdoor Living & Grounds",
    description: "Landscape design, grounds maintenance, fencing, decks and pergolas, custom water features, pressure washing, and property cleanouts.",
    href:        "/services/landscape-design-install",
    accent:      false,
  },
  {
    name:        "Concierge & Estate Services",
    description: "Estate housekeeping, home safety checks, mobile auto detailing, errand services, and pet waste management.",
    href:        "/services/housekeeping-cleaning",
    accent:      false,
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="bg-navy min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-6 border-b border-white/8">
          <div className="max-w-4xl mx-auto">

            {/* Eyebrow */}
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-amber mb-4">
              In the Field Since 2010
            </p>

            <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest leading-tight mb-6">
              About<br />Forge Point
            </h1>

            {/* Decorative rule */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-orange" />
              <span className="text-orange text-xs">◆</span>
            </div>

            <p className="font-cormorant italic font-300 text-white/70 text-xl md:text-2xl leading-relaxed max-w-2xl">
              Built from the ground up. Still showing up every day.
            </p>
          </div>
        </section>

        {/* ── Story + Stats ─────────────────────────────────────────── */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-16 items-start">

            {/* Copy */}
            <div className="space-y-6">
              <p className="font-barlow font-300 text-white/80 text-lg leading-relaxed">
                The portfolio numbers are real. A $300 million book under active management.
                Commercial scopes north of $3 million. Residential remodels at half a million
                and above. Relationships with some of the most prominent developers and
                institutional firms in Colorado and nationally — built over fifteen years,
                earned one project at a time.
              </p>
              <p className="font-barlow font-300 text-white/80 text-lg leading-relaxed">
                We are Midwesterners. We entered this industry in 2010 with no inherited
                advantages, no outside capital, and no shortcuts. Everything Forge Point is,
                we clawed for. That&apos;s not a complaint — it&apos;s the reason we operate
                the way we do.
              </p>
              <p className="font-barlow font-300 text-white/80 text-lg leading-relaxed">
                What it means for you: when Forge Point takes on your property, you&apos;re
                not getting a company that learned this business from a textbook. You&apos;re
                getting a team that has worked at every level of it — from a $15,000 bathroom
                remodel to a multi-million dollar commercial buildout to institutional portfolio
                strategy. We know what things actually cost, what actually goes wrong, and what
                actually moves the needle.
              </p>
              <p className="font-barlow font-300 text-white/80 text-lg leading-relaxed">
                Our focus is the Northern Front Range. That&apos;s where we live, where our
                crews work, and where our market knowledge runs deepest. We operate in multiple
                states when clients need us there — but Northern Colorado is home base, and we
                treat it that way.
              </p>
            </div>

            {/* Stats card */}
            <div
              className="border border-white/10 p-8 space-y-8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="border-b border-white/8 pb-8 last:border-0 last:pb-0">
                  <p className="font-cinzel font-900 text-orange text-3xl md:text-4xl tracking-wide mb-1">
                    {s.value}
                  </p>
                  <p className="font-condensed font-600 text-xs uppercase tracking-widest text-white/50">
                    {s.label}
                  </p>
                </div>
              ))}

              {/* Credentials note */}
              <div className="pt-2 border-t border-white/8">
                <p className="font-barlow font-300 text-white/35 text-xs leading-relaxed">
                  Aaron R. Dolph — Licensed Colorado Real Estate Broker
                  #FA100100755, operating under Triumph Real Estate Corporation
                  #ER1325490. Fully insured and bonded.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What We Do ───────────────────────────────────────────── */}
        <section className="px-6 py-20 border-t border-white/8">
          <div className="max-w-6xl mx-auto">

            <div className="mb-10">
              <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-orange mb-3">
                Five Service Arms
              </p>
              <h2 className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-widest">
                What We Do
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_ARMS.map((arm) => (
                <Link
                  key={arm.name}
                  href={arm.href}
                  className="group block p-6 border transition-all duration-150 hover:border-orange/50 hover:bg-white/3"
                  style={{
                    borderColor: arm.accent ? "rgba(212,152,26,0.4)" : "rgba(255,255,255,0.08)",
                    background:  arm.accent ? "rgba(212,152,26,0.04)" : "transparent",
                  }}
                >
                  {arm.accent && (
                    <p className="font-condensed font-600 text-[10px] uppercase tracking-widest text-amber mb-2">
                      Licensed Advisory
                    </p>
                  )}
                  <h3 className="font-cinzel font-700 text-white text-sm uppercase tracking-wide mb-3 group-hover:text-orange transition-colors">
                    {arm.name}
                  </h3>
                  <p className="font-barlow font-300 text-white/50 text-sm leading-relaxed">
                    {arm.description}
                  </p>
                  <p className="mt-4 font-condensed font-600 text-xs uppercase tracking-widest text-orange/60 group-hover:text-orange transition-colors">
                    Learn more →
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-right">
              <Link
                href="/services"
                className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 hover:text-orange transition-colors"
              >
                View all services →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Service Area ─────────────────────────────────────────── */}
        <section className="px-6 py-16 border-t border-white/8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-orange mb-3">
                Where We Work
              </p>
              <h2 className="font-cinzel font-700 text-white text-xl uppercase tracking-widest mb-4">
                Northern Front Range & Beyond
              </h2>
              <p className="font-barlow font-300 text-white/60 text-base leading-relaxed max-w-2xl">
                Erie is our home base. We serve 15+ communities across Northern Colorado and
                Boulder County — including Longmont, Boulder, Lafayette, Louisville, Broomfield,
                Firestone, Frederick, Windsor, Brighton, and surrounding areas. We operate in
                multiple states for clients who need us there.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/service-area"
                className="inline-block font-condensed font-700 text-sm uppercase tracking-widest bg-transparent border border-orange text-orange px-8 py-4 hover:bg-orange hover:text-white transition-colors"
              >
                View Service Area →
              </Link>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
