import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArticleCard } from "@/components/university/ArticleCard";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await prisma.universityCategory.findUnique({
    where: { slug: category },
  });
  if (!cat) return { title: "Not Found" };
  return {
    title: `${cat.name} — Forge Point University`,
    description: cat.description ?? undefined,
  };
}

// force-dynamic: page is DB-driven, render on demand rather than at build time
export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const cat = await prisma.universityCategory.findUnique({
    where: { slug: category },
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { publishedAt: "desc" }],
      },
    },
  });

  if (!cat) notFound();

  return (
    <>
      <Nav />
      <main>
        <section className="bg-navy pt-36 pb-16 px-6 border-b border-white/8">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/university"
              className="font-condensed font-600 text-xs uppercase tracking-widest text-orange hover:text-amber transition-colors mb-6 inline-block"
            >
              ← University
            </Link>
            <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl uppercase tracking-widest mb-4 leading-tight">
              {cat.name}
            </h1>
            {cat.description && (
              <p className="font-cormorant italic font-300 text-amber text-xl max-w-2xl">
                {cat.description}
              </p>
            )}
          </div>
        </section>

        <section className="bg-navy py-16 px-6">
          <div className="max-w-5xl mx-auto">
            {cat.articles.length === 0 ? (
              <p className="font-barlow font-300 text-white/50 text-sm">
                No articles published yet. Check back soon.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    slug={article.slug}
                    categorySlug={cat.slug}
                    coverImage={article.coverImage}
                    featured={article.featured}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
