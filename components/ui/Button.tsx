import { cn } from "@/lib/utils";
import Link from "next/link";

// ── Shared styles ─────────────────────────────────────────────────

const base =
  "inline-flex items-center justify-center font-condensed font-700 uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-orange text-white border border-orange hover:shadow-orange-glow hover:brightness-110 active:brightness-95",
  secondary:
    "bg-transparent text-amber border border-amber hover:bg-amber/10 hover:shadow-amber-glow active:brightness-95",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

// ── Types ─────────────────────────────────────────────────────────

type SharedProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = SharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: never;
  };

type LinkProps = SharedProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string;
  };

// ── Component ─────────────────────────────────────────────────────

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps | LinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href !== undefined) {
    const { ...linkProps } = props as Omit<LinkProps, "href" | "children" | "variant" | "size" | "className">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
