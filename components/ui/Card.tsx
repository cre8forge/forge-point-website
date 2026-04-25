import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardProps {
  /** Small uppercase category label */
  category?: string;
  title: string;
  description?: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Makes the whole card a link */
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  category,
  title,
  description,
  icon,
  href,
  className,
  children,
}: CardProps) {
  const inner = (
    <>
      {/* Top row: icon + category */}
      {(icon || category) && (
        <div className="flex items-center gap-2 mb-3">
          {icon && (
            <span className="text-orange text-xl leading-none">{icon}</span>
          )}
          {category && (
            <span className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-orange">
              {category}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="font-barlow font-600 text-white text-lg mb-2 normal-case">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="font-barlow font-300 text-[15px] text-muted leading-relaxed">
          {description}
        </p>
      )}

      {/* Slot for extra content */}
      {children}
    </>
  );

  const classes = cn(
    // Base
    "relative bg-card border border-card rounded-sm p-6",
    // Left-border accent on hover
    "border-l-[3px] border-l-transparent",
    "transition-all duration-200",
    // Hover state
    href &&
      "hover:border-l-orange hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}
