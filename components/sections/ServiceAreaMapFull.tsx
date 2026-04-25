"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICE_ZIP_CODES } from "@/lib/site-data";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((m) => m.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full flex items-center justify-center bg-card border border-white/8 rounded-sm"
        style={{ height: "500px" }}
      >
        <span className="font-condensed text-xs uppercase tracking-wide text-muted animate-pulse">
          Loading map…
        </span>
      </div>
    ),
  }
);

export function ServiceAreaMapFull() {
  return (
    <section className="bg-navy py-20 px-6 border-t border-white/8" id="map">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Coverage Map"
          heading="Cities We Serve"
          subheading="Northern Colorado & Boulder County — 15 zip codes and growing."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Map — 2/3 */}
          <div className="lg:col-span-2">
            <LeafletMap height="500px" />
          </div>

          {/* ZIP list — 1/3 */}
          <div className="bg-card border border-white/8 rounded-sm p-6">
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-5">
              Service Areas
            </p>

            <ul className="space-y-2.5 mb-7">
              {SERVICE_ZIP_CODES.map((area) => (
                <li key={area.zip} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                    <span className="font-barlow font-300 text-sm text-white">
                      {area.name}
                    </span>
                  </div>
                  <span className="font-condensed text-xs text-muted tracking-wide">
                    {area.zip}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/8 pt-5">
              <p className="font-barlow font-300 text-xs text-muted mb-3">
                Don&apos;t see your zip code? We may still be able to help.
              </p>
              <Link
                href="/contact"
                className="font-condensed font-600 text-xs uppercase tracking-widest text-orange
                           hover:text-amber transition-colors duration-200"
              >
                Contact Us →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
