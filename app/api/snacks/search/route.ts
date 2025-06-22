// app/api/snacks/search/route.ts
import { fetchSearchSnacks } from "@/app/server-actions/snacks/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const results = await fetchSearchSnacks(0, 6, q);
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
