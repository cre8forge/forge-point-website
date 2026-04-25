export function EstimatorHero() {
  return (
    <section className="bg-navy pt-36 pb-16 px-6 border-b border-white/8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-condensed font-600 text-sm uppercase tracking-[0.2em] text-orange mb-4">
          Free Estimator
        </p>

        <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl uppercase tracking-widest mb-5 leading-tight">
          Get a Price Range
        </h1>

        <p className="font-cormorant italic font-300 text-amber text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
          Honest estimates before you commit — no contact info required.
        </p>

        <p className="font-barlow font-300 text-muted text-sm max-w-xl mx-auto">
          Select a category, enter your quantities, and see an instant price range.
          All figures are estimates. Final pricing depends on site conditions and
          material selection. Want a firm quote?{" "}
          <a href="/contact" className="text-orange hover:text-amber transition-colors underline underline-offset-2">
            Request a site visit.
          </a>
        </p>
      </div>
    </section>
  );
}
