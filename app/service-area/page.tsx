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
    "Forge Point Property Services serves Erie, Longmont, Boulder, Lafayette, Broomfield, Westminster, Thornton, Arvada, Brighton, and the greater North Denver metro. Colorado natives in property services since 2010.",
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
