import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { EstimatorHero } from "@/components/sections/EstimatorHero";
import { EstimatorTool } from "@/components/sections/EstimatorTool";
import { Button } from "@/components/ui/Button";
import { CrispHider } from "@/components/analytics/CrispHider";

export const metadata: Metadata = {
  title: "Free Estimates",
  description:
    "Get honest price ranges for renovation, landscape, grounds maintenance, fencing, concierge services, and more — no contact info required for most services. Northern Colorado's Forge Point Property Services.",
};

// ── Advisory callout section ─────────────────────────────────────

function AdvisorySection() {
  return (
    <section className="px-6 py-14 bg-[#0D1B2A] border-b border-amber/10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — copy */}
          <div>
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-amber mb-3">
              Forge Point Real Estate
            </p>
            <h2 className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-wide mb-5 normal-case">
              Real Estate Advisory Isn&apos;t Estimated Online
            </h2>
            <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed mb-4">
              Buying, selling, or evaluating an investment property isn&apos;t a
              quantity-times-rate calculation. The value Forge Point Real Estate delivers is in
              the analysis, the market knowledge, and the judgment built from 15 years managing
              the properties you&apos;re considering.
            </p>
            <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed mb-7">
              There&apos;s no form for that. There&apos;s a conversation.
            </p>
            <Button href="/contact" variant="primary">
              Schedule a No-Obligation Consultation →
            </Button>
            <p className="font-barlow font-300 text-[10px] text-white/22 mt-5 leading-relaxed">
              Aaron R. Dolph · Licensed CO Broker #FA100100755 · Employing Broker: Triumph Real Estate Corporation #ER1325490
            </p>
          </div>

          {/* Right — three quick facts */}
          <div className="space-y-6">
            {[
              {
                title: "Buyer & Seller Representation",
                body:  "Commission-based. No upfront cost to buyers. Competitive seller rates. Ask us.",
              },
              {
                title: "Investment Acquisition Analysis",
                body:  "Flat-fee written report. Cap rate, cash-on-cash, deferred maintenance assessment.",
              },
              {
                title: "Portfolio Strategy & 1031 Coordination",
                body:  "Hourly or flat-fee engagement. Scope defined at first consultation.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="text-amber text-[10px] mt-1.5 flex-shrink-0">◆</span>
                <div>
                  <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-amber mb-1.5">
                    {item.title}
                  </p>
                  <p className="font-barlow font-300 text-sm text-white/55 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Management callout section ───────────────────────────────────

function ManagementSection() {
  return (
    <section className="px-6 py-14 bg-navy border-b border-white/8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — copy + CTA */}
          <div>
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-orange mb-3">
              Property &amp; Portfolio Management
            </p>
            <h2 className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-wide mb-5 normal-case">
              Management Fees Are Scoped to Your Property
            </h2>
            <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed mb-4">
              Management pricing depends on property type, number of units, scope of services,
              and current condition. A single-family rental is priced differently than a 20-unit
              multifamily or a commercial warehouse.
            </p>
            <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed mb-7">
              The fastest path to an accurate number is a 15-minute call. We&apos;ll ask the
              right questions and give you a real figure — not a range that&apos;s useless until
              you call anyway.
            </p>
            <Button href="/contact" variant="primary">
              Request a Management Consultation →
            </Button>
          </div>

          {/* Right — property type breakdown */}
          <div className="space-y-6">
            {[
              {
                title: "Single Family Homes",
                body:  "Typically 8–12% of monthly rent. Covers tenant placement, rent collection, maintenance coordination, and inspections.",
              },
              {
                title: "Multifamily & HOA",
                body:  "Scoped per unit count and service level. Full-service or maintenance-only packages available.",
              },
              {
                title: "Commercial & Industrial",
                body:  "Scoped per square footage and scope of services. Triple-net, gross, and modified gross leases all handled.",
              },
              {
                title: "Boots-on-Ground Response",
                body:  "24-hour field response for any property emergency in our service area — no call centers, no delays.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="text-orange text-[10px] mt-1.5 flex-shrink-0">◆</span>
                <div>
                  <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-orange mb-1.5">
                    {item.title}
                  </p>
                  <p className="font-barlow font-300 text-sm text-white/55 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Estimator section header ─────────────────────────────────────

function EstimatorHeader() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-14 pb-0">
      <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-orange mb-3">
        Instant Estimates
      </p>
      <h2 className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-wide mb-3 normal-case">
        Get a Price Range
      </h2>
      <p className="font-barlow font-300 text-white/55 text-sm leading-relaxed max-w-2xl">
        Select a service category, enter your quantities, and see an instant range. All figures
        are estimates based on typical Northern Colorado pricing. Final pricing requires a site
        visit.
      </p>
    </div>
  );
}

// ── Next Steps section ───────────────────────────────────────────

function NextStepsSection() {
  return (
    <section className="bg-navy px-6 py-16 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <h3 className="font-cinzel font-700 text-white text-lg uppercase tracking-wide mb-8 normal-case">
          What Happens After You Get a Range?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "For Smaller Jobs",
              body:  "For jobs under $5,000, we can often confirm pricing over the phone or via photos.",
              cta:   "Contact us →",
              href:  "/contact",
            },
            {
              title: "For Larger Projects",
              body:  "For renovation, landscape, and management projects, a site visit is required for firm pricing. We'll visit, assess, and return a written proposal within 48 hours.",
              cta:   "Schedule now →",
              href:  "/contact",
            },
            {
              title: "For Advisory & Management",
              body:  "Real estate and management engagements begin with a 15–30 minute consultation. No obligation, no pressure.",
              cta:   "Call (720) 419-1961",
              href:  "tel:+17204191961",
            },
          ].map((col) => (
            <div key={col.title} className="flex items-start gap-4">
              <span className="text-orange text-sm leading-none mt-0.5 flex-shrink-0">◆</span>
              <div>
                <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-white mb-2">
                  {col.title}
                </p>
                <p className="font-barlow font-300 text-sm text-white/55 leading-relaxed mb-3">
                  {col.body}
                </p>
                <Link
                  href={col.href}
                  className="font-condensed font-600 text-xs uppercase tracking-widest text-orange hover:text-amber transition-colors"
                >
                  {col.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Bottom CTA ───────────────────────────────────────────────────

function EstimateBottomCta() {
  return (
    <section className="bg-[#0D1B2A] px-6 py-16 border-t border-white/8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-wide mb-4 normal-case">
          Ready to Move Forward?
        </h2>
        <p className="font-barlow font-300 text-white/60 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
          One call covers everything. We&apos;ll assess your property, answer your questions, and
          tell you exactly what it will cost — in writing, before we start.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/contact" variant="primary">
            Request a Site Visit
          </Button>
          <Button href="tel:+17204191961" variant="secondary">
            Call (720) 419-1961
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default async function EstimatePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; category?: string }>;
}) {
  const { tab, category } = await searchParams;
  const initialCategory = tab ?? category;

  return (
    <>
      <CrispHider />
      <Nav />

      <main>
        {/* Section 1 — Hero */}
        <EstimatorHero />

        {/* Section 2 — Advisory callout */}
        <AdvisorySection />

        {/* Section 3 — Management callout */}
        <ManagementSection />

        {/* Section 4 — Estimator tool */}
        <section className="bg-navy">
          <EstimatorHeader />
          {/* Suspense required because EstimatorTool uses useSearchParams() */}
          <Suspense
            fallback={
              <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                <span className="font-condensed text-xs uppercase tracking-wide text-muted animate-pulse">
                  Loading estimator…
                </span>
              </div>
            }
          >
            <EstimatorTool initialCategory={initialCategory} />
          </Suspense>
        </section>

        {/* Section 5 — Next Steps */}
        <NextStepsSection />

        {/* Section 6 — Bottom CTA */}
        <EstimateBottomCta />
      </main>

      <Footer />
    </>
  );
}
