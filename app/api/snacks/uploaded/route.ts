import { getUploadedSnacks } from "@/app/server-actions/snacks/actions";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startRange = parseInt(searchParams.get("startRange") ?? "0");
  const endRange = parseInt(searchParams.get("endRange") ?? "11");

  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (!user || error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const snacks = await getUploadedSnacks(startRange, endRange, user); // Call to server action / DAL

    return NextResponse.json(snacks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch uploaded snacks" },
      { status: 500 }
    );
  }
}
