"use client";

import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import React, { useEffect, useState } from "react";

export default function TrendingPage() {
  const [timeRange, setTimeRange] = useState<"7days" | "1month" | "all">(
    "7days"
  );

  useEffect(() => {
    console.log(timeRange);
  }, [timeRange]);
  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {["7days", "1month", "all"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range as typeof timeRange)}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              timeRange === range
                ? "bg-black text-white shadow"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {range === "7days"
              ? "7 Days"
              : range === "1month"
                ? "1 Month"
                : "All Time"}
          </button>
        ))}
      </div>

      <SnackReels location={Location.Trending} timeRange={timeRange} />
    </div>
  );
}
