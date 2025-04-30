import React from "react";
import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import SnackCarousel from "./snack-carousel";
import { Button } from "./ui/button";
import { SnackDetails } from "@/app/interfaces/SnackInterfaces";
import { Plus } from "lucide-react";
import LikeButton from "./like-button";
import { Skeleton } from "./ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface SnackDialogContentDisplayProps {
  snackName: string;
  snackId: number;
  showNewLocationForm: () => void;
  snackDetails: SnackDetails | null;
}

const SnackDialogContentDisplay = ({
  snackName,
  snackId,
  showNewLocationForm,
  snackDetails,
}: SnackDialogContentDisplayProps) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <>
      <DialogHeader>
        <DialogTitle>{snackName}</DialogTitle>
      </DialogHeader>
      <div className="flex justify-center">
        <SnackCarousel images_locations={snackDetails?.images_locations} />
      </div>

      <DialogFooter>
        <div className="flex flex-row justify-between w-full pl-3 pr-3">
          <LikeButton
            initialLikeCount={snackDetails?.like_count}
            userLikeData={snackDetails?.like_data}
            snackId={snackId}
          />
          <div>
            {snackDetails && currentUser ? (
              <Button onClick={showNewLocationForm}>
                Add new location <Plus />
              </Button>
            ) : (
              currentUser && <Skeleton className="w-44 h-9" />
            )}
          </div>
        </div>
      </DialogFooter>
    </>
  );
};

export default SnackDialogContentDisplay;
