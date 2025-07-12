"use client";

import { Location, TrendingType } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import React, { useState } from "react";

export default function TrendingPage() {
  const [trendingType, setTrendingType] = useState<TrendingType>(
    TrendingType.ThisWeek
  );

  const trendingTypeOptions = [
    { value: TrendingType.ThisWeek, label: "7 Days" },
    { value: TrendingType.ThisMonth, label: "1 Month" },
    { value: TrendingType.AllTime, label: "All Time" },
  ];

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {trendingTypeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setTrendingType(option.value)}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              trendingType === option.value
                ? "bg-black text-white shadow"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <SnackReels location={Location.Trending} trendingType={trendingType} />
    </div>
  );
}
