import { TrendingType } from "@/app/interfaces/SnackInterfaces";
import {
  getSnacks,
  getTrendingSnacks,
} from "@/app/server-actions/snacks/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period");
  const startRange = parseInt(searchParams.get("startRange") ?? "0");
  const endRange = parseInt(searchParams.get("endRange") ?? "11");

  try {
    const trendingType = mapPeriodToTrendingType(period);

    if (trendingType !== null) {
      const results = await getTrendingSnacks(
        startRange,
        endRange,
        trendingType
      );
      return NextResponse.json(results);
    } else {
      // Fallback to regular snacks if invalid period
      const results = await getSnacks(startRange, endRange);
      return NextResponse.json(results);
    }
  } catch (error) {
    console.error("Trending snacks error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending snacks" },
      { status: 500 }
    );
  }
}

function mapPeriodToTrendingType(period: string | null): TrendingType | null {
  switch (period) {
    case "Today":
      return TrendingType.Today;
    case "ThisWeek":
      return TrendingType.ThisWeek;
    case "ThisMonth":
      return TrendingType.ThisMonth;
    case "AllTime":
      return TrendingType.AllTime;
    default:
      return null;
  }
}
