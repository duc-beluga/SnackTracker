import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

export async function POST(req: Request) {
  const { input } = await req.json();

  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0];

  let location;
  if (ip) {
    try {
      const geo = await fetch(`https://ipapi.co/${ip}/json`).then((r) =>
        r.json()
      );
      if (geo.latitude && geo.longitude) {
        location = { lat: geo.latitude, lng: geo.longitude };
      }
    } catch (error) {
      console.error(error);
    }
  }

  const response = await client.placeAutocomplete({
    params: {
      input,
      key: process.env.GOOGLE_PLACE_AUTOCOMPLETE_API_KEY!,
      components: ["country:us"],
      ...(location && { location, radius: 200000 }),
    },
  });

  return NextResponse.json(response.data.predictions);
}
