"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

/**
 * Drop into any server-rendered service page to fire a semantic
 * service_viewed event once on mount.  Invisible — renders nothing.
 */
export function ServiceViewTracker({ name, slug }: { name: string; slug: string }) {
  useEffect(() => {
    analytics.serviceViewed(name, slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // fire once on mount only

  return null;
}
