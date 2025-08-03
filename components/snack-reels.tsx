"use client";

import { useSnackReels } from "@/app/hooks/useSnackReels";
import { Location, TrendingType } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import { Snacks } from "./snacks";
import { MoreSnack } from "./more-snack";
import Image from "next/image";
import { SearchParams } from "@/app/interfaces/PropsInterface";

interface SnackReelsProps {
  location: Location;
  trendingType?: TrendingType;
  searchQuery?: SearchParams;
  state?: string;
  city?: string;
}

const SnackReels = ({
  location,
  trendingType,
  searchQuery,
  state,
  city,
}: SnackReelsProps) => {
  const { snacks, ref, hasMore, hasNone } = useSnackReels(
    location,
    trendingType,
    searchQuery,
    state,
    city
  );

  if (hasNone) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <Image
          src="/illustrations/not-found.svg"
          alt="Not Found"
          width={240}
          height={240}
          className="opacity-80"
        />
        <h2 className="text-lg font-semibold text-gray-700">No snacks found</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Try adjusting your filters or uploading the first snack!
        </p>
      </div>
    );
  }

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
