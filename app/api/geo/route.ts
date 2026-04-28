import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/geo
 *
 * Returns visitor IP + geolocation. Called once per session by AnalyticsProvider.
 * API key is server-side only — never exposed to the client.
 *
 * Free tier: ipgeolocation.io — 1,000 req/day (plenty for this traffic level).
 * Set IPGEOLOCATION_API_KEY in Vercel environment variables to activate.
 * Without the key the route still returns the IP address.
 */
export async function GET(req: NextRequest) {
  // Vercel sets x-forwarded-for; local dev falls back to x-real-ip
  const forwarded = req.headers.get("x-forwarded-for");
  const ip        = (forwarded ? forwarded.split(",")[0] : null)
                 ?? req.headers.get("x-real-ip")
                 ?? "unknown";

  const apiKey = process.env.IPGEOLOCATION_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ ip }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const res  = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}&fields=city,state_prov,country_name,country_code2,zipcode,latitude,longitude`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();

    return NextResponse.json(
      {
        ip,
        city:         data.city          || null,
        region:       data.state_prov    || null,
        country:      data.country_name  || null,
        country_code: data.country_code2 || null,
        zip:          data.zipcode       || null,
        lat:          data.latitude      || null,
        lng:          data.longitude     || null,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ ip }, { headers: { "Cache-Control": "no-store" } });
  }
}
