// app/api/snacks/search/route.ts
import {
  fetchSearchSnacks,
  getSnacks,
} from "@/app/server-actions/snacks/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  const startRange = parseInt(searchParams.get("startRange") ?? "0");
  const endRange = parseInt(searchParams.get("endRange") ?? "11");

  if (!q) {
    try {
      const results = await getSnacks(startRange, endRange);
      return NextResponse.json(results);
    } catch (e) {
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
  }

  try {
    const results = await fetchSearchSnacks(startRange, endRange, q);
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
