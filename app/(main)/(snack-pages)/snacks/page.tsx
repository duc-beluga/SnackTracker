import { Location } from "@/app/interfaces/SnackInterfaces";
import NavTopBar from "@/components/nav-topbar";
import SnackReels from "@/components/snack-reels";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snacks",
};

export default function SnackPage() {
  return (
    <div className="w-full py-6">
      <SnackReels location={Location.Home} />
    </div>
  );
}
