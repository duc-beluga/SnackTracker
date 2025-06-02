"use client";

import { useSnackReels } from "@/app/hooks/useSnackReels";
import { Location } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import Snacks from "./snacks";
import { MoreSnack } from "./more-snack";

interface SnackReelsProps {
  location: Location;
  timeRange?: "7days" | "1month" | "all";
  searchQuery?: string;
}

const SnackReels = ({ location, timeRange, searchQuery }: SnackReelsProps) => {
  const { snacks, ref, hasMore } = useSnackReels(
    location,
    timeRange,
    searchQuery
  );

  return (
    <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4 snap-y snap-mandatory sm:snap-none">
      <Snacks snacks={snacks?.slice(0, 12)} />
      <MoreSnack
        ref={ref}
        hasMore={hasMore}
        location={location}
        snacks={snacks?.slice(12)}
      />
    </div>
  );
};

export default SnackReels;
