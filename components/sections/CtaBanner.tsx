import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="bg-orange py-20 px-6" id="cta">
      <div className="max-w-4xl mx-auto text-center">

        {/* Decorative top line */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="flex-1 max-w-[120px] h-px bg-white/30" />
          <span className="text-white/60 text-xs">◆</span>
          <div className="flex-1 max-w-[120px] h-px bg-white/30" />
        </div>

        <h2 className="font-cinzel font-900 text-white text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.15em] mb-5 leading-tight">
          Ready to Elevate
          <br />
          Your Property?
        </h2>

        <p className="font-cormorant italic font-300 text-white/90 text-xl md:text-2xl mb-10 leading-relaxed">
          One conversation covers everything — advisory, management, renovation, grounds, or concierge. Get a free estimate with no obligation and no pressure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="/estimate"
            variant="secondary"
            size="lg"
            className="border-white text-white hover:bg-white/15 hover:shadow-none"
          >
            Get a Free Estimate
          </Button>
          <Button
            href="tel:+17204191961"
            variant="secondary"
            size="lg"
            className="border-white/50 text-white/80 hover:border-white hover:text-white hover:bg-white/10 hover:shadow-none"
          >
            Call (720) 419-1961
          </Button>
        </div>

        {/* Decorative bottom line */}
        <div className="flex items-center gap-3 justify-center mt-8">
          <div className="flex-1 max-w-[120px] h-px bg-white/30" />
          <span className="text-white/60 text-xs">◆</span>
          <div className="flex-1 max-w-[120px] h-px bg-white/30" />
        </div>

      </div>
    </section>
  );
}
