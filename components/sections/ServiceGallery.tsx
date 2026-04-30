import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { resolveImage } from "@/lib/image-utils";

interface GalleryImage {
  id:  string; // local image path
  alt: string;
}

interface ServiceGalleryProps {
  images: readonly GalleryImage[];
}

export function ServiceGallery({ images }: ServiceGalleryProps) {
  if (!images.length) return null;

  return (
    <section className="bg-navy py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Our Work"
          heading="Project Gallery"
          subheading="Real results from real projects across Northern Colorado."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={`${img.id}-${i}`}
              className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/8
                         group"
            >
              <Image
                src={resolveImage(img.id, 800)}
                alt={img.alt}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
