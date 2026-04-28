import Image from "next/image";
import Link from "next/link";
import type { UniversityArticle, UniversityCategory } from "@prisma/client";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

type ArticleWithCategory = UniversityArticle & {
  category: UniversityCategory;
};

interface UniversityPreviewProps {
  articles: ArticleWithCategory[];
}

export function UniversityPreview({ articles }: UniversityPreviewProps) {
  // Section is hidden if fewer than 3 published articles exist (checked in page.tsx)
  return (
    <section className="py-24 px-6 bg-navy" id="university">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          eyebrow="Forge Point University"
          heading="Learn From the Pros"
          subheading="Free guides, market insights, and expert advice from 15 years on the ground in Northern Colorado."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/university/${article.slug}`}
              className="group bg-card border border-card rounded-sm overflow-hidden hover:border-orange/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              {/* Cover image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-navy/50">
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-orange/40 text-4xl">◆</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-orange mb-2">
                  {article.category.name}
                </p>
                <h3 className="font-cinzel font-700 text-white text-base leading-snug mb-3 normal-case group-hover:text-amber transition-colors">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="font-barlow font-300 text-sm text-muted leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
                <p className="font-condensed text-xs uppercase tracking-wide text-orange mt-4 group-hover:text-amber transition-colors">
                  Read Article →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button href="/university" variant="secondary" size="md">
            Visit Forge Point University
          </Button>
        </div>

      </div>
    </section>
  );
}
