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
import { GoogleReviewBadge } from "@/components/ui/GoogleReviewBadge";
import { EngagementTrigger } from "@/components/EngagementTrigger";

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
      <EngagementTrigger pageType="service" />
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
          learnMoreLinks={service.learnMoreLinks}
        />
        <ServiceIncludes items={service.includes} />

        {/* Pull quote — rendered when present */}
        {service.pullQuote && (
          <section className="bg-[#0D1B2A] px-6 py-14 border-y border-white/8">
            <div className="max-w-4xl mx-auto">
              <blockquote className="border-l-4 border-orange pl-6">
                <p className="font-barlow font-300 text-white/80 text-lg md:text-xl leading-relaxed italic">
                  &ldquo;{service.pullQuote}&rdquo;
                </p>
              </blockquote>
            </div>
          </section>
        )}

        {/* Mid-page CTA panel — rendered when present */}
        {service.ctaPanel && (
          <section className="bg-navy px-6 py-14 border-b border-white/8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <h3 className="font-cinzel font-700 text-white text-xl mb-3 normal-case">
                  {service.ctaPanel.heading}
                </h3>
                <p className="font-barlow font-300 text-white/60 text-base leading-relaxed">
                  {service.ctaPanel.body}
                </p>
              </div>
              <a
                href={service.ctaPanel.ctaHref}
                className="flex-shrink-0 bg-orange hover:bg-orange/90 text-white font-condensed font-700 text-sm uppercase tracking-widest px-8 py-4 transition-colors"
              >
                {service.ctaPanel.ctaLabel}
              </a>
            </div>
          </section>
        )}

        <ServiceGallery images={service.gallery} />
        <GoogleReviewBadge />
        <ServiceEstimatorCallout
          serviceName={service.name}
          estimatorCategory={service.estimatorCategory}
        />
        <ServiceRelated services={related} />

        {/* RE license disclosure — Advisory services only */}
        {service.disclaimer && (
          <div className="bg-navy px-6 pb-12">
            <div className="max-w-4xl mx-auto border-t border-white/8 pt-6">
              <p className="font-barlow font-300 text-white/30 text-xs leading-relaxed italic">
                {service.disclaimer}
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
