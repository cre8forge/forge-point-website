import { Button } from "@/components/ui/Button";

export function ServiceAreaHero() {
  return (
    <section className="bg-navy pt-36 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-condensed font-600 text-sm uppercase tracking-[0.2em] text-orange mb-4">
          Service Area
        </p>

        <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest mb-5 leading-tight">
          Where We Work
        </h1>

        <p className="font-cormorant italic font-300 text-amber text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Northern Colorado&apos;s full-service property company — advisory, management, renovation,
          grounds, and estate services across the Front Range.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" href="/estimate">
            Get a Free Estimate
          </Button>
          <Button variant="secondary" href="/contact">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
