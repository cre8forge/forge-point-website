import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceAreaHero } from "@/components/sections/ServiceAreaHero";
import { ServiceAreaStory } from "@/components/sections/ServiceAreaStory";
import { ServiceAreaExpertise } from "@/components/sections/ServiceAreaExpertise";
import { ServiceAreaMapFull } from "@/components/sections/ServiceAreaMapFull";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Service Area",
  description:
    "Forge Point Property Services serves Erie, Longmont, Boulder, Lafayette, Louisville, and 15+ zip codes across Northern Colorado. Colorado natives in landscaping and property maintenance since 2010.",
};

export default function ServiceAreaPage() {
  return (
    <>
      <Nav />

      <main>
        <ServiceAreaHero />
        <ServiceAreaStory />
        <ServiceAreaExpertise />
        <ServiceAreaMapFull />
        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
