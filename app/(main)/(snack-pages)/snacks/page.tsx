import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snacks",
};

const SnackPage = () => {
  return (
    <>
      <SnackReels location={Location.Home} />
    </>
  );
};

export default SnackPage;
