import { SectionHeader } from "@/components/ui/SectionHeader";

const EXPERTISE = [
  {
    title:       "Clay Soils & Drainage",
    description:
      "Front Range soil is notorious for poor drainage and compaction. We grade, amend, and plant with Colorado's soil profile in mind — not a generic national standard.",
  },
  {
    title:       "Freeze-Thaw Cycles",
    description:
      "Post depth, concrete mix, hardware selection, and plant choices all change when the ground freezes and thaws hard every winter. We build and plant accordingly.",
  },
  {
    title:       "High Altitude UV",
    description:
      "At 5,000+ feet, UV exposure degrades materials and stresses plants faster than lower elevations. We factor that into every material and species recommendation.",
  },
  {
    title:       "HOA Familiarity",
    description:
      "We work regularly with HOA boards and community managers across Northern Colorado and know the common requirements, approval processes, and documentation expectations.",
  },
  {
    title:       "Colorado Water Restrictions",
    description:
      "Turf restrictions, odd-even watering schedules, and drought designations are part of life here. Our irrigation designs and plant selections are built around Colorado's water reality.",
  },
  {
    title:       "Front Range Wind",
    description:
      "From Longmont to Brighton, sustained wind is a constant. Fence hardware, tree staking, and windbreak plantings are sized and positioned to hold up — not just look good at install.",
  },
] as const;

export function ServiceAreaExpertise() {
  return (
    <section className="bg-navy py-20 px-6 border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Why It Matters"
          heading="Built for Colorado Conditions"
          subheading="Fifteen years on Front Range properties teaches you things no national franchise manual covers."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTISE.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-white/8 rounded-sm p-6
                         hover:border-orange/40 transition-colors duration-200"
            >
              <span className="text-orange text-sm block mb-3">◆</span>
              <h3 className="font-condensed font-600 text-white text-sm uppercase tracking-widest mb-2">
                {item.title}
              </h3>
              <p className="font-barlow font-300 text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
