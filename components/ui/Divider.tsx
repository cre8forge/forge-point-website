import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div
      className={cn("flex items-center gap-3 w-full my-2", className)}
      role="separator"
    >
      {/* Left arm: transparent → #C85A00 */}
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right, transparent, #C85A00)" }}
      />

      {/* Center diamond */}
      <span
        className="text-amber text-xs leading-none select-none"
        aria-hidden="true"
      >
        ◆
      </span>

      {/* Right arm: #C85A00 → transparent */}
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to left, transparent, #C85A00)" }}
      />
    </div>
  );
}
