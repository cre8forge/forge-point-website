import { SectionHeader } from "@/components/ui/SectionHeader";

interface IncludesItem {
  title:       string;
  description: string;
}

interface ServiceIncludesProps {
  items: readonly IncludesItem[];
}

export function ServiceIncludes({ items }: ServiceIncludesProps) {
  return (
    <section className="bg-navy py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="What's Included"
          heading="Everything Covered"
          subheading="Every service we offer — no hidden scope, no surprise add-ons."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-white/8 rounded-sm p-6
                         hover:border-orange/40 transition-colors duration-200"
            >
              {/* Orange diamond accent */}
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
