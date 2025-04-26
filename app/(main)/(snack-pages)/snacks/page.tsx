"use client";

import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import { Suspense } from "react";

const SnackPage = () => {
  return (
    <Suspense fallback={<div>Loading snacks...</div>}>
      <SnackReels location={Location.Home} />
    </Suspense>
  );
};

export default SnackPage;
