import Link from "next/link";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  excerpt: string | null;
  slug: string;
  categorySlug: string;
  coverImage: string | null;
  featured?: boolean;
  className?: string;
}

export function ArticleCard({
  title,
  excerpt,
  slug,
  categorySlug,
  coverImage,
  featured = false,
  className,
}: ArticleCardProps) {
  const href = `/university/${categorySlug}/${slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col bg-card border border-white/8 hover:border-orange/40 transition-all duration-200",
        className
      )}
    >
      {/* Cover image */}
      {coverImage ? (
        <div className="overflow-hidden aspect-video">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-navy/60 flex items-center justify-center border-b border-white/8">
          <BookOpen size={32} className="text-white/20" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {featured && (
          <p className="font-condensed font-600 text-xs uppercase tracking-widest text-orange mb-2">
            Featured
          </p>
        )}

        <h3 className="font-cinzel font-700 text-white text-sm uppercase tracking-wide leading-snug mb-3 group-hover:text-orange transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="font-barlow font-300 text-white/60 text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
