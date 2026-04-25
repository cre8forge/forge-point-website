"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SHOWCASE_PROJECTS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function unsplashUrl(id: string, width: number) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}

export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const project = SHOWCASE_PROJECTS[active];

  return (
    <section className="py-24 px-6 bg-navy" id="showcase">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          eyebrow="Our Work"
          heading="Real Projects. Real Results."
          subheading="Before and after — see what Forge Point delivers."
          className="mb-12"
        />

        {/* Tab buttons */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {SHOWCASE_PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={cn(
                "font-condensed font-600 text-sm uppercase tracking-wide px-5 py-2.5 border transition-all duration-200",
                i === active
                  ? "bg-orange border-orange text-white"
                  : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Before / After panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 rounded-sm overflow-hidden">

          {/* Before */}
          <div className="relative aspect-[4/3] group">
            <Image
              src={unsplashUrl(project.before.id, 900)}
              alt={project.before.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-navy/30" />
            <div className="absolute top-4 left-4">
              <span className="font-condensed font-700 text-xs uppercase tracking-[0.2em] text-white bg-navy/70 px-3 py-1.5 backdrop-blur-sm">
                Before
              </span>
            </div>
          </div>

          {/* After */}
          <div className="relative aspect-[4/3] group">
            <Image
              src={unsplashUrl(project.after.id, 900)}
              alt={project.after.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-navy/10" />
            <div className="absolute top-4 left-4">
              <span className="font-condensed font-700 text-xs uppercase tracking-[0.2em] text-white bg-orange px-3 py-1.5">
                After
              </span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center font-barlow font-300 text-sm text-muted mt-4">
          {project.label} — {project.location}
        </p>

      </div>
    </section>
  );
}
