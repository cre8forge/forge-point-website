const STATS = [
  { value: "Since 2010",  label: "In the Field" },
  { value: "20+",         label: "Cities Served" },
  { value: "Colorado",    label: "Native Team" },
  { value: "Maintenance", label: "First & Foremost" },
] as const;

export function ServiceAreaStory() {
  return (
    <section className="bg-navy py-20 px-6 border-t border-white/8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Text */}
        <div>
          <h2
            className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-wide mb-6
                       border-l-2 border-orange pl-4"
          >
            We Know This Ground
          </h2>

          <div className="space-y-4 font-barlow font-300 text-muted text-base leading-relaxed">
            <p>
              Forge Point was built by Colorado natives who have been managing properties and
              landscapes on the Front Range since 2010. This isn&apos;t a franchise or a crew that
              relocated here — we grew up in Northern Colorado and we&apos;ve watched this region grow
              around us.
            </p>
            <p>
              That matters because Northern Colorado is genuinely different. Clay-heavy soils,
              intense UV, freeze-thaw cycles that destroy under-built fence posts, and water
              restrictions that make the wrong grass selection an expensive mistake. We&apos;ve seen
              what works and what fails on hundreds of local properties.
            </p>
            <p>
              Our core business is property and grounds maintenance — reliable, recurring service
              that keeps properties looking sharp year-round. We&apos;re now expanding into full
              landscape design and installation for clients who want a single trusted team to
              handle both the build and the ongoing care.
            </p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-white/8 rounded-sm p-6 flex flex-col gap-1
                         hover:border-orange/40 transition-colors duration-200"
            >
              <span className="font-cinzel font-700 text-orange text-2xl md:text-3xl leading-none">
                {stat.value}
              </span>
              <span className="font-condensed font-600 text-white text-xs uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
