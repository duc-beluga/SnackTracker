// app/api/snacks/route.ts
import {
  addSnackLocation,
  getSnacks,
} from "@/app/server-actions/snacks/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startRange = parseInt(searchParams.get("startRange") ?? "0");
  const endRange = parseInt(searchParams.get("endRange") ?? "11");

  try {
    const snacks = await getSnacks(startRange, endRange); // Call to server action / DAL
    return NextResponse.json(snacks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch snacks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newSnack = await addSnackLocation(data);
    return NextResponse.json(newSnack, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create snack" },
      { status: 500 }
    );
  }
}
