import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drinks",
};

export default function DrinkPage() {
  return (
    <div className="w-full p-4">
      <SnackReels location={Location.Drink} />
    </div>
  );
}
