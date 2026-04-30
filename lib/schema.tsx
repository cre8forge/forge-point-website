/**
 * lib/schema.tsx
 *
 * Typed JSON-LD builder functions for structured data markup.
 * All schema is JSON-LD (not Microdata or RDFa).
 * All URLs are absolute.
 *
 * Usage:
 *   import { SchemaScript, buildLocalBusinessSchema } from "@/lib/schema";
 *   <SchemaScript schema={buildLocalBusinessSchema()} />
 */

const BASE_URL = "https://cre8forge.com";

const BUSINESS_INFO = {
  name:        "Forge Point Property Services",
  legalName:   "Forge Point Real Estate, LLC",
  alternateName: "Forge Point",
  description:
    "Property management, real estate advisory, custom interiors, outdoor living, and concierge services across Northern Colorado's Front Range.",
  phone:      "+1-720-419-1961",
  email:      "hello@cre8forge.com",
  city:       "Erie",
  state:      "CO",
  postalCode: "80516",
  country:    "US",
  latitude:   40.0505,
  longitude:  -105.0419,
  url:        BASE_URL,
  logo:       `${BASE_URL}/logo.png`,
  image:      `${BASE_URL}/logo.png`,
  priceRange: "$$",
  // GBP URL omitted — profile pending verification
  sameAs: [
    "https://instagram.com/cre8forge",
    "https://facebook.com/forgepointproperty",
  ],
};

const SERVICE_AREAS = [
  "Erie", "Longmont", "Boulder", "Lafayette", "Louisville", "Broomfield",
  "Westminster", "Arvada", "Thornton", "Northglenn", "Brighton",
  "Commerce City", "Firestone", "Frederick", "Dacono", "Gunbarrel",
];

// Maps service page `category` badge values → schema.org serviceType strings
const CATEGORY_TO_SERVICE_TYPE: Record<string, string> = {
  "Advisory":          "Real Estate Service",
  "Management":        "Property Management",
  "HOA":               "Property Management",
  "Landscaping":       "Landscaping",
  "Grounds":           "Grounds Maintenance",
  "Grounds & Estates": "Grounds Maintenance",
  "Fencing":           "Fencing",
  "Washing":           "Pressure Washing",
  "Industrial":        "Property Maintenance",
  "Custom Living":     "Home Improvement",
  "Outdoor Living":    "Landscaping",
  "Domestic Services": "Home Services",
};

// ── LocalBusiness (site-wide, injected in root layout) ────────────────────────
// aggregateRating omitted — Google Business Profile pending verification.
// Add it once the GBP profile is live and has verified reviews.

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    "HomeAndConstructionBusiness",
    "@id":      `${BASE_URL}/#business`,
    name:          BUSINESS_INFO.name,
    legalName:     BUSINESS_INFO.legalName,
    alternateName: BUSINESS_INFO.alternateName,
    description:   BUSINESS_INFO.description,
    url:           BUSINESS_INFO.url,
    logo:          BUSINESS_INFO.logo,
    image:         BUSINESS_INFO.image,
    telephone:     BUSINESS_INFO.phone,
    email:         BUSINESS_INFO.email,
    priceRange:    BUSINESS_INFO.priceRange,
    address: {
      "@type":          "PostalAddress",
      addressLocality:  BUSINESS_INFO.city,
      addressRegion:    BUSINESS_INFO.state,
      postalCode:       BUSINESS_INFO.postalCode,
      addressCountry:   BUSINESS_INFO.country,
    },
    geo: {
      "@type":    "GeoCoordinates",
      latitude:   BUSINESS_INFO.latitude,
      longitude:  BUSINESS_INFO.longitude,
    },
    areaServed: SERVICE_AREAS.map((city) => ({
      "@type": "City",
      name:    city,
      containedInPlace: {
        "@type": "State",
        name:    "Colorado",
      },
    })),
    sameAs: BUSINESS_INFO.sameAs,
  };
}

// ── WebSite (site-wide, injected in root layout) ──────────────────────────────
// SearchAction omitted — no /search route exists yet.

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    "WebSite",
    "@id":      `${BASE_URL}/#website`,
    url:        BASE_URL,
    name:       BUSINESS_INFO.name,
    publisher:  { "@id": `${BASE_URL}/#business` },
  };
}

// ── Service (one per service page) ───────────────────────────────────────────

export function buildServiceSchema(service: {
  slug:            string;
  name:            string;
  metaDescription: string;
  category:        string;
}) {
  return {
    "@context":   "https://schema.org",
    "@type":      "Service",
    "@id":        `${BASE_URL}/services/${service.slug}#service`,
    name:         service.name,
    description:  service.metaDescription,
    serviceType:  CATEGORY_TO_SERVICE_TYPE[service.category] ?? "Service",
    url:          `${BASE_URL}/services/${service.slug}`,
    provider:     { "@id": `${BASE_URL}/#business` },
    areaServed:   SERVICE_AREAS.map((city) => ({ "@type": "City", name: city })),
  };
}

// ── Article (one per University article) ─────────────────────────────────────

export function buildArticleSchema(article: {
  slug:         string;
  title:        string;
  excerpt:      string;
  content:      string;
  coverImage?:  string | null;
  publishedAt?: Date | null;
  updatedAt?:   Date | null;
  authorName?:  string | null;
  categorySlug: string;
}) {
  const url = `${BASE_URL}/university/${article.categorySlug}/${article.slug}`;
  return {
    "@context":  "https://schema.org",
    "@type":     "Article",
    "@id":       `${url}#article`,
    headline:    article.title,
    description: article.excerpt,
    url,
    image:         article.coverImage ?? BUSINESS_INFO.image,
    datePublished: article.publishedAt?.toISOString(),
    dateModified:
      article.updatedAt?.toISOString() ??
      article.publishedAt?.toISOString(),
    author: {
      "@type": "Organization",
      name:    BUSINESS_INFO.name,
      url:     BASE_URL,
    },
    publisher: { "@id": `${BASE_URL}/#business` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":   url,
    },
    wordCount: article.content.split(/\s+/).length,
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type":    "ListItem",
      position:   index + 1,
      name:       item.name,
      item:       item.url,
    })),
  };
}

// ── FAQPage ───────────────────────────────────────────────────────────────────

export function buildFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context":  "https://schema.org",
    "@type":     "FAQPage",
    mainEntity:  faqs.map((faq) => ({
      "@type": "Question",
      name:    faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:    faq.answer,
      },
    })),
  };
}

// ── JSX helper ────────────────────────────────────────────────────────────────

export function SchemaScript({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
