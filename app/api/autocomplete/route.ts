export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  // 🔍 Extract Vercel geo headers
  const headers = req.headers;
  const region = headers.get("x-vercel-ip-country-region");
  const lat = headers.get("x-vercel-ip-latitude");
  const lng = headers.get("x-vercel-ip-longitude");

  console.log("Geo from headers:", { region, lat, lng });

  const params = new URLSearchParams({
    input: region ? `${input}, ${region}` : input,
    key: process.env.GOOGLE_PLACE_AUTOCOMPLETE_API_KEY!,
    components: "country:us",
    sessiontoken: crypto.randomUUID(),
  });

  if (lat && lng) {
    params.append("location", `${lat},${lng}`);
    params.append("radius", "50000");
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data.predictions ?? []);
  } catch (error) {
    console.error("Autocomplete fetch failed:", error);
    return NextResponse.json([], { status: 500 });
  }
}
