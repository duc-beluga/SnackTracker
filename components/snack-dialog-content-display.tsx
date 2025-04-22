import React from "react";
import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import SnackCarousel from "./snack-carousel";
import { Button } from "./ui/button";
import { SnackDetails } from "@/app/interfaces/SnackInterfaces";
import { Plus } from "lucide-react";
import LikeButton from "./like-button";

interface SnackDialogContentDisplayProps {
  snackName: string;
  snackId: number;
  showNewLocationForm: () => void;
  snackDetails: SnackDetails;
}

const SnackDialogContentDisplay = ({
  snackName,
  snackId,
  showNewLocationForm,
  snackDetails,
}: SnackDialogContentDisplayProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{snackName}</DialogTitle>
      </DialogHeader>
      <div className="flex justify-center">
        <SnackCarousel
          snackToImageLocationMap={snackDetails.images_locations}
        />
      </div>
      <DialogFooter>
        <div className="flex flex-row justify-between w-full pl-3 pr-3">
          <LikeButton
            initialLikeCount={snackDetails.like_count}
            userLikeData={snackDetails.like_data}
            snackId={snackId}
          />
          <div>
            <Button onClick={showNewLocationForm}>
              Add new location <Plus />
            </Button>
          </div>
        </div>
      </DialogFooter>
    </>
  );
};

export default SnackDialogContentDisplay;
