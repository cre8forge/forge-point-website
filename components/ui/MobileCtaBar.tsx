"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Pages where the sticky bar should NOT appear (user is already in a conversion flow)
const HIDDEN_PATHS = ["/contact", "/estimate"];

export function MobileCtaBar() {
  const pathname = usePathname();

  if (HIDDEN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{ height: "56px" }}
    >
      <Link
        href="/contact"
        className="flex items-center justify-center w-full h-full
                   bg-[#C85A00] text-white
                   font-condensed font-600 text-sm uppercase"
        style={{ letterSpacing: "0.08em" }}
      >
        GET A FREE ESTIMATE →
      </Link>
    </div>
  );
}
