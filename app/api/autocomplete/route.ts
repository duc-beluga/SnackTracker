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
  const state = req.geo?.region;

  const params = new URLSearchParams({
    input: state ? `${input}, ${state}` : input,
    key: process.env.GOOGLE_PLACE_AUTOCOMPLETE_API_KEY!,
    components: "country:us",
  });

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`;

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(data.predictions ?? []);
}
