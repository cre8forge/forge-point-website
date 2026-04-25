import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/site-data";

export function ServicesSection() {
  return (
    <section className="py-24 px-6 bg-navy" id="services">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          eyebrow="What We Do"
          heading="Our Services"
          subheading="Full-service property care for homeowners, HOAs, and commercial clients across Northern Colorado."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* 7 service cards */}
          {SERVICES.map((service) => (
            <Card
              key={service.href}
              category={service.category}
              title={service.title}
              description={service.description}
              href={service.href}
            />
          ))}

          {/* 8th card — CTA (orange fill) */}
          <div className="relative bg-orange border border-orange/80 rounded-sm p-6 flex flex-col justify-between group overflow-hidden">
            {/* Subtle texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#fff_0%,_transparent_60%)]" />

            <div className="relative">
              <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-white/70 mb-3">
                Ready to Start?
              </p>
              <h3 className="font-cinzel font-700 text-white text-xl leading-snug mb-3 normal-case">
                Get a Free Estimate
              </h3>
              <p className="font-barlow font-300 text-sm text-white/80 leading-relaxed">
                No obligation. No pressure. Just an honest range for your project within 24 hours.
              </p>
            </div>

            <div className="relative mt-6">
              <Button
                href="/estimate"
                variant="secondary"
                size="sm"
                className="border-white text-white hover:bg-white/15 hover:shadow-none w-full justify-center"
              >
                Start Your Estimate
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
