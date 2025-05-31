import { Location } from "@/app/interfaces/SnackInterfaces";
import NavTopBar from "@/components/nav-topbar";
import SnackReels from "@/components/snack-reels";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snacks",
};

export default function SnackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <NavTopBar />

      <div className="w-full py-6">
        <SnackReels location={Location.Home} />
      </div>
    </div>
  );
}
