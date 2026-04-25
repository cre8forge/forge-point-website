export function ContactHero() {
  return (
    <section className="bg-navy pt-36 pb-16 px-6 border-b border-white/8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-condensed font-600 text-sm uppercase tracking-[0.2em] text-orange mb-4">
          Get In Touch
        </p>

        <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl uppercase tracking-widest mb-5 leading-tight">
          Contact Us
        </h1>

        <p className="font-cormorant italic font-300 text-amber text-xl md:text-2xl max-w-2xl mx-auto mb-8">
          Tell us about your property. We respond within one business day.
        </p>

        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <div className="text-center">
            <p className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 mb-1">
              Phone
            </p>
            <a
              href="tel:+13039003230"
              className="font-barlow font-300 text-white hover:text-orange transition-colors"
            >
              (303) 900-3230
            </a>
          </div>
          <div className="text-center">
            <p className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 mb-1">
              Email
            </p>
            <a
              href="mailto:Hello@Cre8Forge.com"
              className="font-barlow font-300 text-white hover:text-orange transition-colors"
            >
              Hello@Cre8Forge.com
            </a>
          </div>
          <div className="text-center">
            <p className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 mb-1">
              Location
            </p>
            <span className="font-barlow font-300 text-white">
              Erie, CO 80516
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
