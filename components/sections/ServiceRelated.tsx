import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import type { ServiceData } from "@/lib/services-data";

interface ServiceRelatedProps {
  services: ServiceData[];
}

export function ServiceRelated({ services }: ServiceRelatedProps) {
  if (!services.length) return null;

  return (
    <section className="bg-navy py-20 px-6 border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Explore More"
          heading="Related Services"
          subheading="Forge Point handles every aspect of your property — inside and out."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block bg-card border border-white/8 rounded-sm overflow-hidden
                         hover:border-orange/40 transition-colors duration-200"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-${service.heroImage}?auto=format&fit=crop&w=600&q=75`}
                  alt={service.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/30 transition-colors duration-300" />
              </div>

              {/* Card body */}
              <div className="p-5">
                <Badge variant="outline" className="mb-3 text-xs">
                  {service.category}
                </Badge>
                <h3 className="font-cinzel font-700 text-white text-sm uppercase tracking-wide mb-2
                               group-hover:text-orange transition-colors duration-200">
                  {service.name}
                </h3>
                <p className="font-barlow font-300 text-muted text-sm leading-relaxed line-clamp-2">
                  {service.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
