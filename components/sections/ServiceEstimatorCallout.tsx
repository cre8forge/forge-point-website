import { Button } from "@/components/ui/Button";

interface ServiceEstimatorCalloutProps {
  serviceName:       string;
  estimatorCategory: string;
}

export function ServiceEstimatorCallout({
  serviceName,
  estimatorCategory,
}: ServiceEstimatorCalloutProps) {
  return (
    <section className="bg-orange py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Diamond accent */}
        <span className="text-white/60 text-lg block mb-4">◆</span>

        <h2 className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-wide mb-4">
          Get a Price Range for {serviceName}
        </h2>

        <p className="font-cormorant italic font-300 text-white/85 text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Use our estimator to get an honest price range before you commit — no contact info required.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="primary"
            href={`/estimate?category=${estimatorCategory}`}
            className="bg-white text-orange hover:bg-white/90 border-white shadow-none"
          >
            Open Estimator
          </Button>
          <Button
            variant="secondary"
            href="/contact"
            className="border-white text-white hover:bg-white/10"
          >
            Request a Site Visit
          </Button>
        </div>
      </div>
    </section>
  );
}
