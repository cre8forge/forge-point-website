import { Suspense } from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { EstimatorHero } from "@/components/sections/EstimatorHero";
import {
  EstimatorTool,
  type EstimatorCategory,
  type PricingSettings,
} from "@/components/sections/EstimatorTool";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Free Estimator",
  description:
    "Get instant price ranges for landscaping, fencing, grounds maintenance, power washing, and more — no contact info required. Serving Northern Colorado since 2010.",
};

// Revalidate every hour so admin pricing changes go live without a full redeploy
export const revalidate = 3600;

async function getEstimatorData(): Promise<{
  categories: EstimatorCategory[];
  settings: PricingSettings;
}> {
  const [rawCategories, rawSettings] = await Promise.all([
    prisma.estimateCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        services: {
          where:   { active: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    }),
    prisma.adminSetting.findMany(),
  ]);

  // Parse settings into typed object with defaults
  const settingMap = Object.fromEntries(rawSettings.map((s) => [s.key, parseFloat(s.value)]));
  const settings: PricingSettings = {
    MATERIAL_MARKUP:   settingMap["MATERIAL_MARKUP"]   ?? 1.50,
    LABOR_RATE:        settingMap["LABOR_RATE"]        ?? 85.00,
    MARKET_MULTIPLIER: settingMap["MARKET_MULTIPLIER"] ?? 1.10,
  };

  // Serialize Decimal fields to plain numbers for the client component
  const categories: EstimatorCategory[] = rawCategories.map((cat) => ({
    id:   cat.id,
    name: cat.name,
    slug: cat.slug,
    services: cat.services.map((svc) => ({
      id:          svc.id,
      name:        svc.name,
      unit:        svc.unit,
      description: svc.description,
      override_low:  svc.override_low  ? parseFloat(svc.override_low.toString())  : null,
      override_high: svc.override_high ? parseFloat(svc.override_high.toString()) : null,
      homewyse_material_low:     svc.homewyse_material_low     ? parseFloat(svc.homewyse_material_low.toString())     : null,
      homewyse_material_high:    svc.homewyse_material_high    ? parseFloat(svc.homewyse_material_high.toString())    : null,
      homewyse_labor_hours_low:  svc.homewyse_labor_hours_low  ? parseFloat(svc.homewyse_labor_hours_low.toString())  : null,
      homewyse_labor_hours_high: svc.homewyse_labor_hours_high ? parseFloat(svc.homewyse_labor_hours_high.toString()) : null,
    })),
  }));

  return { categories, settings };
}

export default async function EstimatePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ categories, settings }, { category }] = await Promise.all([
    getEstimatorData(),
    searchParams,
  ]);

  return (
    <>
      <Nav />

      <main>
        <EstimatorHero />

        {/* Suspense required because EstimatorTool uses useSearchParams() */}
        <Suspense fallback={<div className="bg-navy py-16 px-6 text-center">
          <span className="font-condensed text-xs uppercase tracking-wide text-muted animate-pulse">
            Loading estimator…
          </span>
        </div>}>
          <section className="bg-navy">
            <EstimatorTool
              categories={categories}
              settings={settings}
              initialCategory={category}
            />
          </section>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
