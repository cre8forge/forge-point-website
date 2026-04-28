import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { ServiceIncludes } from "@/components/sections/ServiceIncludes";
import { ServiceGallery } from "@/components/sections/ServiceGallery";
import { ServiceEstimatorCallout } from "@/components/sections/ServiceEstimatorCallout";
import { ServiceRelated } from "@/components/sections/ServiceRelated";
import { SERVICES_DATA, getServiceBySlug, getRelatedServices } from "@/lib/services-data";
import { ServiceViewTracker } from "@/components/analytics/ServiceViewTracker";

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.metaDescription,
    openGraph: {
      title: `${service.name} | Forge Point Property Services`,
      description: service.metaDescription,
      images: [
        {
          url: `https://images.unsplash.com/photo-${service.heroImage}?auto=format&fit=crop&w=1200&q=80`,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.related);

  return (
    <>
      <Nav />
      <ServiceViewTracker name={service.name} slug={service.slug} />
      <main>
        <ServiceHero
          name={service.name}
          tagline={service.tagline}
          heroImage={service.heroImage}
          category={service.category}
        />
        <ServiceOverview
          heading={service.overviewHeading}
          body={service.overviewBody}
          overviewImage={service.overviewImage}
        />
        <ServiceIncludes items={service.includes} />
        <ServiceGallery images={service.gallery} />
        <ServiceEstimatorCallout
          serviceName={service.name}
          estimatorCategory={service.estimatorCategory}
        />
        <ServiceRelated services={related} />
      </main>
      <Footer />
    </>
  );
}
