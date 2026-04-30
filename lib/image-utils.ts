/**
 * lib/image-utils.ts
 *
 * Resolves service image sources.
 *
 * services-data.ts stores heroImage, overviewImage, and gallery id fields in
 * two formats that accumulated over time:
 *   - Local paths:      "/images/services/advisory/buyer-rep-hero.jpg"
 *   - Unsplash photo IDs: "1560185893-a55b8a6f7e89"
 *
 * Next.js <Image> requires a fully-qualified URL or an absolute local path.
 * Bare photo IDs were being passed as-is, causing Next.js to treat them as
 * local routes (e.g. /1560185893-a55b8a6f7e89) which 404 immediately.
 *
 * This function normalises both formats into a valid src string.
 */

const UNSPLASH_BASE = "https://images.unsplash.com/photo-";
const UNSPLASH_PARAMS = "auto=format&fit=crop&q=80";

export function resolveImage(src: string, width: number = 900): string {
  // Already a full URL (https://...) or an absolute local path (/images/...)
  if (src.startsWith("http") || src.startsWith("/")) {
    return src;
  }

  // Bare Unsplash photo ID — construct the full delivery URL
  return `${UNSPLASH_BASE}${src}?${UNSPLASH_PARAMS}&w=${width}`;
}
