import { NextRequest, NextResponse } from "next/server";
import { SERVICES_DATA } from "@/lib/services-data";
import { FAQ_CATEGORIES } from "@/lib/faq-data";
import { prisma } from "@/lib/prisma";

export interface SearchResult {
  type: "service" | "faq" | "university";
  title: string;
  description: string;
  href: string;
  badge: string;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (q.length < 2) return NextResponse.json({ results: [] });

  const results: SearchResult[] = [];

  // ── Services ────────────────────────────────────────────────────
  for (const s of SERVICES_DATA) {
    if (
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.metaDescription.toLowerCase().includes(q) ||
      s.includes.some(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      )
    ) {
      results.push({
        type:        "service",
        title:       s.name,
        description: s.tagline,
        href:        `/services/${s.slug}`,
        badge:       s.category,
      });
      if (results.filter((r) => r.type === "service").length >= 5) break;
    }
  }

  // ── FAQ ─────────────────────────────────────────────────────────
  let faqCount = 0;
  outer: for (const cat of FAQ_CATEGORIES) {
    for (const item of cat.questions) {
      if (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      ) {
        results.push({
          type:        "faq",
          title:       item.question,
          description: item.answer.slice(0, 110).trimEnd() + "…",
          href:        `/faq#${cat.slug}`,
          badge:       cat.label,
        });
        faqCount++;
        if (faqCount >= 3) break outer;
      }
    }
  }

  // ── University articles ──────────────────────────────────────────
  try {
    const articles = await prisma.universityArticle.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title:   { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        title:    true,
        slug:     true,
        excerpt:  true,
        category: { select: { name: true } },
      },
      take: 3,
    });
    for (const a of articles) {
      results.push({
        type:        "university",
        title:       a.title,
        description: a.excerpt ?? "",
        href:        `/university/${a.slug}`,
        badge:       a.category?.name ?? "University",
      });
    }
  } catch {
    // DB unavailable — skip university results
  }

  return NextResponse.json({ results: results.slice(0, 10) });
}
