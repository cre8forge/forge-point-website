import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArticleRenderer } from "@/components/university/ArticleRenderer";
import { ArticleCard } from "@/components/university/ArticleCard";
import { UniversityContentUpgrade } from "@/components/university/UniversityContentUpgrade";
import { User, Calendar } from "lucide-react";
import { EngagementTrigger } from "@/components/EngagementTrigger";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.universityArticle.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, coverImage: true },
  });
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} — Forge Point University`,
    description: article.excerpt ?? undefined,
    openGraph: article.coverImage
      ? { images: [{ url: article.coverImage }] }
      : undefined,
  };
}

export const revalidate = 3600;

function computeReadMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const [article, allCategories] = await Promise.all([
    prisma.universityArticle.findUnique({
      where: { slug },
      include: { category: true },
    }),
    prisma.universityCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { articles: { where: { status: "PUBLISHED" } } } },
      },
    }),
  ]);

  if (!article || article.status !== "PUBLISHED") notFound();

  const related = await prisma.universityArticle.findMany({
    where: {
      categoryId: article.categoryId,
      status: "PUBLISHED",
      NOT: { id: article.id },
    },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    take: 3,
    include: { category: { select: { slug: true } } },
  });

  const publishDate = article.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(article.publishedAt))
    : null;

  const readMinutes = computeReadMinutes(article.content);

  return (
    <>
      <Nav />
      <EngagementTrigger pageType="university" />
      <main className="bg-navy min-h-screen">
        <div className="pt-28 pb-0 px-6 border-b border-white/8">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs font-condensed font-600 uppercase tracking-widest text-white/40 pb-4">
            <Link href="/university" className="hover:text-orange transition-colors">
              University
            </Link>
            <span>/</span>
            <Link
              href={`/university/${article.category.slug}`}
              className="hover:text-orange transition-colors"
            >
              {article.category.name}
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate">{article.title}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-12">
          <article>
            {article.coverImage && (
              <div className="aspect-video overflow-hidden mb-8">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1 className="font-cinzel font-900 text-white text-3xl md:text-4xl uppercase tracking-widest leading-tight mb-5">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-white/8 text-white/40">
              {article.authorName && (
                <div className="flex items-center gap-1.5">
                  <User size={13} />
                  <span className="font-barlow font-300 text-xs">{article.authorName}</span>
                </div>
              )}
              {publishDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span className="font-barlow font-300 text-xs">{publishDate}</span>
                </div>
              )}
              <span className="font-barlow font-300 text-xs">{readMinutes} min read</span>
            </div>

            <ArticleRenderer
                content={article.content}
                upgradePanel={
                  <UniversityContentUpgrade
                    category={article.category.slug}
                    articleSlug={slug}
                  />
                }
              />
          </article>

          <aside className="space-y-8">
            {related.length > 0 && (
              <div>
                <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-orange pl-3">
                  Related Articles
                </h2>
                <div className="space-y-4">
                  {related.map((r) => (
                    <ArticleCard
                      key={r.id}
                      title={r.title}
                      excerpt={r.excerpt}
                      slug={r.slug}
                      categorySlug={r.category.slug}
                      coverImage={r.coverImage}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-orange pl-3">
                Browse Topics
              </h2>
              <nav className="space-y-1">
                {allCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/university/${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2 border border-white/8 hover:border-orange/40 hover:bg-white/3 transition-all group"
                  >
                    <span className="font-barlow font-300 text-sm text-white/70 group-hover:text-white transition-colors">
                      {cat.name}
                    </span>
                    <span className="font-condensed font-600 text-xs text-white/30 group-hover:text-orange transition-colors">
                      {cat._count.articles}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-5 bg-card border border-orange/30">
              <p className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-2">
                Get a Free Estimate
              </p>
              <p className="font-barlow font-300 text-white/60 text-sm mb-4">
                Ready to put this knowledge to work? We serve Erie, Boulder County,
                and Northern Colorado.
              </p>
              <Link
                href="/estimate"
                className="inline-block font-condensed font-600 text-xs uppercase tracking-widest bg-orange text-white px-4 py-2 hover:bg-amber transition-colors"
              >
                Start Estimate →
              </Link>
            </div>
          </aside>
        </div>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
