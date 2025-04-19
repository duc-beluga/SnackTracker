import React from "react";
import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import SnackCarousel from "./snack-carousel";
import { Button } from "./ui/button";
import { SnackImageLocationVal } from "@/app/interfaces/SnackInterfaces";
import { Plus } from "lucide-react";
import LikeButton from "./like-button";

interface SnackDialogContentDisplayProps {
  snackName: string;
  snack_id: number;
  snackToImageLocationMap: SnackImageLocationVal[];
  showNewLocationForm: () => void;
}

const SnackDialogContentDisplay = ({
  snackName,
  snack_id,
  snackToImageLocationMap,
  showNewLocationForm,
}: SnackDialogContentDisplayProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{snackName}</DialogTitle>
      </DialogHeader>
      <div className="flex justify-center">
        <SnackCarousel snackToImageLocationMap={snackToImageLocationMap} />
      </div>
      <DialogFooter>
        <div className="flex flex-row justify-between w-full pl-3 pr-3">
          <LikeButton snack_id={snack_id} />
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
