"use client";

import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";

const SnackPage = () => {
  return <SnackReels location={Location.Home} />;
};

export default SnackPage;
