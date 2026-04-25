import { SectionHeader } from "@/components/ui/SectionHeader";
import { HOW_IT_WORKS } from "@/lib/site-data";

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-navy" id="how-it-works">
      {/* Subtle top border */}
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="The Process"
          heading="How It Works"
          subheading="Simple process. No surprises. Just results."
          className="mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">

          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-[3.25rem] left-[calc(16.6%+2rem)] right-[calc(16.6%+2rem)] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #C85A00 20%, #C85A00 80%, transparent)",
            }}
          />

          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center px-8">

              {/* Step number circle */}
              <div className="relative z-10 w-[4.5rem] h-[4.5rem] rounded-full border border-orange/40 bg-navy flex items-center justify-center mb-6">
                <span className="font-cinzel font-900 text-2xl text-orange">
                  {step.number}
                </span>
              </div>

              {/* Mobile connector */}
              {i < HOW_IT_WORKS.length - 1 && (
                <div
                  className="md:hidden w-px h-10 mb-6"
                  style={{
                    background: "linear-gradient(to bottom, #C85A00, transparent)",
                  }}
                />
              )}

              <h3 className="font-cinzel font-700 text-white text-base uppercase tracking-wide mb-4 normal-case">
                {step.title}
              </h3>
              <p className="font-barlow font-300 text-sm text-muted leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
