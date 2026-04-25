import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-condensed font-600 uppercase tracking-wide text-xs px-3 py-1",
        variant === "primary" && "bg-orange text-white",
        variant === "outline" && "border border-amber text-amber bg-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
