"use client";

import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import React, { Suspense } from "react";

export default function TrendingPage() {
  return (
    <Suspense fallback={<div>Loading snacks...</div>}>
      <SnackReels location={Location.Trending} />
    </Suspense>
  );
}
