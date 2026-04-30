import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { resolveImage } from "@/lib/image-utils";

interface ServiceHeroProps {
  name:      string;
  tagline:   string;
  heroImage: string; // local image path (e.g. /images/services/advisory/buyer-rep-hero.jpg)
  category:  string;
}

export function ServiceHero({ name, tagline, heroImage, category }: ServiceHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end pb-16 pt-32 overflow-hidden">
      {/* Background image */}
      <Image
        src={resolveImage(heroImage, 1400)}
        alt={name}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/75" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <Badge variant="outline" className="mb-4">
          {category}
        </Badge>

        <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest mb-4 leading-tight">
          {name}
        </h1>

        <p className="font-cormorant italic font-300 text-amber text-xl md:text-2xl mb-8 max-w-2xl">
          {tagline}
        </p>

        <div className="flex flex-wrap gap-4">
          <Button variant="primary" href="/estimate">
            Get a Free Estimate
          </Button>
          <Button variant="secondary" href="/contact">
            Talk to Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
