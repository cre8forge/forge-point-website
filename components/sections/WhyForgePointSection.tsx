import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DIFFERENTIATORS } from "@/lib/site-data";

export function WhyForgePointSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" id="why-us">

      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80&auto=format&fit=crop"
        alt="Professionally landscaped garden in Northern Colorado"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/88" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Commitment"
          heading="Why Forge Point"
          subheading="We don't just maintain properties — we protect your investment."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-card rounded-sm p-8 group hover:border-orange/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-orange text-lg leading-none mt-0.5 flex-shrink-0">◆</span>
                <div>
                  <h3 className="font-cinzel font-700 text-white text-base mb-3 normal-case">
                    {item.title}
                  </h3>
                  <p className="font-barlow font-300 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
