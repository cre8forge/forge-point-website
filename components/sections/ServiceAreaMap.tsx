"use client";

import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SERVICE_ZIP_CODES } from "@/lib/site-data";

// Leaflet requires the browser — load it only on the client, never SSR
const LeafletMap = dynamic(
  () => import("./LeafletMap").then((m) => m.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full flex items-center justify-center bg-card border border-card rounded-sm"
        style={{ height: "420px" }}
      >
        <span className="font-condensed text-xs uppercase tracking-wide text-muted animate-pulse">
          Loading map…
        </span>
      </div>
    ),
  }
);

export function ServiceAreaMap() {
  const half = Math.ceil(SERVICE_ZIP_CODES.length / 2);
  const col1 = SERVICE_ZIP_CODES.slice(0, half);
  const col2 = SERVICE_ZIP_CODES.slice(half);

  return (
    <section className="py-24 px-6 bg-navy" id="service-area">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          eyebrow="Where We Work"
          heading="We Serve Your Area"
          subheading="Northern Colorado & Boulder County — 15 zip codes and growing."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Map — 2/3 width */}
          <div className="lg:col-span-2">
            <LeafletMap />
          </div>

          {/* ZIP list — 1/3 width */}
          <div className="bg-card border border-card rounded-sm p-7">
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-5">
              15 Service Areas
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-7">
              {col1.map((area) => (
                <div key={area.zip} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span className="font-barlow font-300 text-sm text-muted">
                    {area.name}
                  </span>
                </div>
              ))}
              {col2.map((area) => (
                <div key={area.zip} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span className="font-barlow font-300 text-sm text-muted">
                    {area.name}
                  </span>
                </div>
              ))}
            </div>

            <Button
              href="/service-area"
              variant="secondary"
              size="sm"
              className="w-full justify-center"
            >
              View Full Service Area
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
