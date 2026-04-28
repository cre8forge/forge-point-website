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
    "Forge Point Property Services offers full-service property management, landscape design, grounds maintenance, fencing, renovation, power washing, and domestic services across Northern Colorado and the Denver metro.",
};

// ── Group services by nav category ───────────────────────────────

const GROUPS = [
  {
    label: "Custom Interiors",
    slugs: ["renovation-remodel", "framing-finishes", "kitchen-bath-more"],
  },
  {
    label: "Outdoor Living",
    slugs: ["landscape-design-install", "decks-pergolas-patios", "fencing", "custom-water-features"],
  },
  {
    label: "Grounds & Estates",
    slugs: [
      "grounds-maintenance",
      "property-management",
      "power-window-washing",
      "industrial-maintenance",
      "junk-haul-off",
    ],
  },
  {
    label: "Domestic Services",
    slugs: [
      "mobile-auto-detailing",
      "housekeeping-cleaning",
      "poop-scooping",
      "home-safety-checks",
      "errand-services",
    ],
  },
];

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
            <p className="font-barlow font-300 text-white/60 text-base leading-relaxed max-w-2xl">
              From grounds maintenance and property management to custom renovations and domestic
              services — Forge Point handles what your property needs, at any scale, with the same
              crew on the job every time.
            </p>
          </div>
        </section>

        {/* Service groups */}
        <section className="bg-navy py-16 px-6">
          <div className="max-w-6xl mx-auto space-y-16">

            {GROUPS.map((group) => {
              const services = group.slugs
                .map((slug) => SERVICES_DATA.find((s) => s.slug === slug))
                .filter(Boolean) as typeof SERVICES_DATA;

              return (
                <div key={group.label}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-orange">
                      {group.label}
                    </h2>
                    <div className="flex-1 border-t border-white/8" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className="group bg-card border border-white/8 p-6
                                   hover:border-orange/40 transition-all duration-200
                                   flex flex-col"
                      >
                        <h3 className="font-condensed font-600 text-sm uppercase tracking-wide
                                       text-white group-hover:text-orange transition-colors mb-2">
                          {svc.name}
                        </h3>
                        <p className="font-barlow font-300 text-white/50 text-sm leading-relaxed flex-1">
                          {svc.tagline}
                        </p>
                        <span className="mt-4 font-condensed font-600 text-xs uppercase
                                         tracking-widest text-orange/60 group-hover:text-orange
                                         transition-colors">
                          Learn more →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            <Divider />

          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
