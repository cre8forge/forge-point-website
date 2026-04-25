import Image from "next/image";

interface ServiceOverviewProps {
  heading:      string;
  body:         readonly string[];
  overviewImage: string; // Unsplash photo ID
}

export function ServiceOverview({ heading, body, overviewImage }: ServiceOverviewProps) {
  return (
    <section className="bg-navy py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Text */}
        <div>
          <h2
            className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-wide mb-6
                       border-l-2 border-orange pl-4"
          >
            {heading}
          </h2>

          <div className="space-y-4">
            {body.map((paragraph, i) => (
              <p key={i} className="font-barlow font-300 text-muted text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/8">
          <Image
            src={`https://images.unsplash.com/photo-${overviewImage}?auto=format&fit=crop&w=900&q=80`}
            alt={heading}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-navy/10" />
        </div>
      </div>
    </section>
  );
}
