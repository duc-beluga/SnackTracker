"use client";

import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import React, { Suspense } from "react";

const TrendingPage = () => {
  return (
    <Suspense fallback={<div>Loading snacks...</div>}>
      <SnackReels location={Location.Trending} />
    </Suspense>
  );
};

export default TrendingPage;
