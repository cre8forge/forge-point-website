import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceGallery } from "@/components/sections/ServiceGallery";
import { ServiceEstimatorCallout } from "@/components/sections/ServiceEstimatorCallout";
import { ServiceRelated } from "@/components/sections/ServiceRelated";
import { getRelatedServices } from "@/lib/services-data";
import { ServiceViewTracker } from "@/components/analytics/ServiceViewTracker";
import { GoogleReviewBadge } from "@/components/ui/GoogleReviewBadge";

export const metadata: Metadata = {
  title: "Property & Portfolio Management | Forge Point Property Services",
  description:
    "Professional property management in Northern Colorado and Denver metro. Commercial and industrial facilities, multifamily communities, and single-family homes managed by a team with 15 years and millions of square feet of real experience.",
};

// ── Sub-service definitions ──────────────────────────────────────

const SUB_SERVICES = [
  {
    slug:  "commercial-industrial-management",
    label: "Commercial Management",
    name:  "Commercial & Industrial Management",
    photo: "1486325212027-8081e485255e",
    desc:  "Office parks, retail centers, warehouses, and industrial facilities — managed by a team with 4M+ square feet of real commercial experience across Northern Colorado and the Denver metro.",
  },
  {
    slug:  "multifamily-hoa-management",
    label: "Multifamily & HOA",
    name:  "Multifamily & HOA Management",
    photo: "1560185893-a55b8a6f7e89",
    desc:  "Community management for properties up to 115 units — board-ready reporting, consistent vendor oversight, and documented systems that make board transitions manageable.",
  },
  {
    slug:  "single-family-management",
    label: "Single Family",
    name:  "Single Family Home Management",
    photo: "1560518883-ce09059eeffa",
    desc:  "Personalized management with a dedicated contact who knows your property, your tenants, and your preferences — not a work order queue.",
  },
  {
    slug:  "boots-on-ground-response",
    label: "On-Call Response",
    name:  "Boots-on-Ground Response",
    photo: "1504307651254-35680f356dbe",
    desc:  "Keep your existing property manager. Add Forge Point as your local 24/7 response and emergency coordination partner — monthly retainer, no long-term contract.",
  },
  {
    slug:  "maintenance-coordination",
    label: "Maintenance",
    name:  "Maintenance Coordination",
    photo: "1558981403-c5f9899a28bc",
    desc:  "24/7 maintenance intake, vetted contractor dispatch, and resolution follow-up. Nothing sits in a queue — and nothing falls into a black box.",
  },
] as const;

// ── Gallery ──────────────────────────────────────────────────────

const GALLERY = [
  { id: "1560185893-a55b8a6f7e89", alt: "Property management oversight of a multifamily community in Northern Colorado" },
  { id: "1486325212027-8081e485255e", alt: "Commercial office park property managed by Forge Point" },
  { id: "1560518883-ce09059eeffa",   alt: "Single family rental home under professional management" },
];

// ── Page ─────────────────────────────────────────────────────────

export default function PropertyManagementPage() {
  const related = getRelatedServices([
    "grounds-maintenance",
    "investment-property-rehab",
    "buyer-representation",
  ]);

  return (
    <>
      <Nav />
      <ServiceViewTracker name="Property & Portfolio Management" slug="property-management" />
      <main>

        {/* ── Hero ── */}
        <ServiceHero
          name="Property & Portfolio Management"
          tagline="Full-spectrum property management built on 15 years and millions of square feet of real experience."
          heroImage="1560185893-a55b8a6f7e89"
          category="Management"
        />

        {/* ── Overview ── */}
        <section className="bg-navy py-16 px-6 border-b border-white/8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-cinzel font-700 text-white text-2xl md:text-3xl mb-6 normal-case border-l-[3px] border-orange pl-5 leading-snug">
                One Management Practice.<br />Every Property Type.
              </h2>
              <div className="space-y-4 font-barlow font-300 text-white/65 text-base leading-relaxed">
                <p>
                  Forge Point&apos;s property management practice spans three distinct property types — commercial and industrial facilities, multifamily communities, and individual single-family rentals — managed under the same disciplined approach: documented systems, vetted vendor relationships, and real physical presence.
                </p>
                <p>
                  Over 4 million square feet of commercial space managed. Portfolios of up to 115 tenants. And single-family homes handled with the personal attention that individual owners and their tenants deserve. That range of experience isn&apos;t incidental — it&apos;s the infrastructure behind every management decision we make.
                </p>
                <p>
                  We also serve property owners who already have a management contract but need a trusted local response partner — someone who answers the phone, drives to the property, and coordinates the solution. No conflict. No contract requirement. Just presence.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-navy/50">
              <Image
                src="https://images.unsplash.com/photo-1558618047-6e3b4b1ae965?auto=format&fit=crop&w=900&q=80"
                alt="Property management documentation and oversight"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* ── Sub-service card grid ── */}
        <section className="bg-[#0D1B2A] py-16 px-6 border-b border-white/8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-10 border-l-2 border-orange pl-4">
              Management Programs
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUB_SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-navy border border-white/8 hover:border-orange/40 transition-all duration-200 overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-navy/50">
                    <Image
                      src={`https://images.unsplash.com/photo-${s.photo}?auto=format&fit=crop&w=600&q=75`}
                      alt={s.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-orange mb-2">
                      {s.label}
                    </p>
                    <h3 className="font-cinzel font-700 text-white text-sm leading-snug mb-3 normal-case group-hover:text-amber transition-colors">
                      {s.name}
                    </h3>
                    <p className="font-barlow font-300 text-sm text-white/55 leading-relaxed flex-1">
                      {s.desc}
                    </p>
                    <p className="font-condensed text-xs uppercase tracking-wide text-orange mt-4 group-hover:text-amber transition-colors">
                      Learn More →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <ServiceGallery images={GALLERY} />

        {/* ── Google review badge ── */}
        <GoogleReviewBadge />

        {/* ── Estimator callout ── */}
        <ServiceEstimatorCallout
          serviceName="Property & Portfolio Management"
          estimatorCategory="property-management"
        />

        {/* ── Related services ── */}
        <ServiceRelated services={related} />

      </main>
      <Footer />
    </>
  );
}
