export const runtime = "edge";

import { NextResponse } from "next/server";

interface GeoRequest extends Request {
  geo?: {
    city?: string;
    country?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
  };
}

export async function POST(req: GeoRequest) {
  const { input } = await req.json();

  const geo = req.geo;
  console.log("Geo info:", geo);

  const params = new URLSearchParams({
    input: geo?.region ? `${input}, ${geo.region}` : input,
    key: process.env.GOOGLE_PLACE_AUTOCOMPLETE_API_KEY!,
    components: "country:us",
    sessiontoken: crypto.randomUUID(),
  });

  if (geo?.latitude && geo?.longitude) {
    params.append("location", `${geo.latitude},${geo.longitude}`);
    params.append("radius", "50000"); // 50 km bias
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error("Google API error:", data);
    }

    return NextResponse.json(data.predictions ?? []);
  } catch (error) {
    console.error("Autocomplete fetch failed:", error);
    return NextResponse.json([], { status: 500 });
  }
}
