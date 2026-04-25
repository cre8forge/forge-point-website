import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArticleCard } from "@/components/university/ArticleCard";

export const metadata: Metadata = {
  title: "Forge Point University",
  description:
    "Free how-to guides, tutorials, and property care knowledge from the Forge Point team. Learn landscaping, fencing, irrigation, and more.",
};

export const revalidate = 3600;

export default async function UniversityHubPage() {
  const [categories, featured] = await Promise.all([
    prisma.universityCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { articles: { where: { status: "PUBLISHED" } } } },
      },
    }),
    prisma.universityArticle.findMany({
      where: { status: "PUBLISHED", featured: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { category: { select: { slug: true } } },
    }),
  ]);

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-navy pt-36 pb-16 px-6 border-b border-white/8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="font-condensed font-600 text-sm uppercase tracking-[0.2em] text-orange mb-4">
              Knowledge Center
            </p>
            <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl uppercase tracking-widest mb-5 leading-tight">
              Forge Point University
            </h1>
            <p className="font-cormorant italic font-300 text-amber text-xl md:text-2xl max-w-2xl mx-auto">
              Pro knowledge for Colorado property owners — free, practical, and straight from the field.
            </p>
          </div>
        </section>

        {/* Featured articles */}
        {featured.length > 0 && (
          <section className="bg-navy py-16 px-6 border-b border-white/8">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-8 border-l-2 border-orange pl-4">
                Featured Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    slug={article.slug}
                    categorySlug={article.category.slug}
                    coverImage={article.coverImage}
                    featured
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category grid */}
        <section className="bg-navy py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-8 border-l-2 border-orange pl-4">
              Browse by Topic
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/university/${cat.slug}`}
                  className="group p-6 bg-card border border-white/8 hover:border-orange/40 transition-all duration-200"
                >
                  <h3 className="font-cinzel font-700 text-white text-sm uppercase tracking-wide mb-2 group-hover:text-orange transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="font-barlow font-300 text-white/50 text-sm leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  )}
                  <p className="font-condensed font-600 text-xs uppercase tracking-widest text-orange">
                    {cat._count.articles} {cat._count.articles === 1 ? "article" : "articles"} →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
