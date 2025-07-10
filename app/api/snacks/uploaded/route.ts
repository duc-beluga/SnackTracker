import { fetchUploadedSnacks } from "@/app/server-actions/snacks/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startRange = parseInt(searchParams.get("startRange") ?? "0");
  const endRange = parseInt(searchParams.get("endRange") ?? "11");

  try {
    const snacks = await fetchUploadedSnacks(startRange, endRange); // Call to server action / DAL
    return NextResponse.json(snacks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch uploaded snacks" },
      { status: 500 }
    );
  }
}
