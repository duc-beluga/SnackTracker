import { SnackDetail } from "@/app/interfaces/SnackInterfaces";
import { User } from "@supabase/supabase-js";
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "./ui";
import { SnackCarousel } from "./snack-carousel";
import { Plus } from "lucide-react";

export function DialogSnackInfo({
  snack,
  user,
  onAddLocationClick,
}: {
  snack: SnackDetail;
  user: User | null | undefined;
  onAddLocationClick: () => void;
}) {
  function renderActionContent() {
    if (user === undefined) {
      return <Skeleton className="w-[248px] sm:w-[320px] h-9" />;
    }

    return (
      <Button onClick={onAddLocationClick} className="w-[248px] sm:w-[320px]">
        Add new location <Plus />
      </Button>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{snack.name}</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <div className="flex justify-center">
        <SnackCarousel images_locations={snack.images_locations} />
      </div>
      <DialogFooter>
        <div className="flex items-center justify-center w-full">
          {renderActionContent()}
        </div>
      </DialogFooter>
    </>
  );
}
