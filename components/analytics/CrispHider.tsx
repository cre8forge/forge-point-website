"use client";

import { useEffect } from "react";

/**
 * When mounted, hides the Crisp chat widget so it doesn't compete with
 * conversion-focused pages like /contact and /estimate.
 * Restores the widget when unmounted (navigating away).
 */
export function CrispHider() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).$crisp) {
      (window as any).$crisp.push(["do", "chat:hide"]);
    }
    return () => {
      if (typeof window !== "undefined" && (window as any).$crisp) {
        (window as any).$crisp.push(["do", "chat:show"]);
      }
    };
  }, []);

  return null;
}
