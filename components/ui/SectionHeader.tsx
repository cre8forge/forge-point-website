import { cn } from "@/lib/utils";
import { Divider } from "./Divider";

interface SectionHeaderProps {
  /** Small uppercase label above the heading */
  eyebrow?: string;
  /** Main heading — rendered as h2 */
  heading: string;
  /** Cormorant italic subheading below */
  subheading?: string;
  /** Whether to show dividers above and below */
  dividers?: boolean;
  /** Center or left-align — defaults to center */
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  dividers = true,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "w-full space-y-4",
        align === "center" && "text-center",
        className
      )}
    >
      {dividers && <Divider />}

      <div className="space-y-2">
        {eyebrow && (
          <p className="font-condensed font-600 text-sm uppercase tracking-[0.2em] text-orange">
            {eyebrow}
          </p>
        )}

        <h2
          className={cn(
            "font-cinzel font-700 text-white text-3xl md:text-4xl",
            align === "left" &&
              "border-l-[3px] border-orange pl-4 leading-snug"
          )}
        >
          {heading}
        </h2>

        {subheading && (
          <p className="font-cormorant italic font-300 text-lg text-muted">
            {subheading}
          </p>
        )}
      </div>

      {dividers && <Divider />}
    </div>
  );
}
