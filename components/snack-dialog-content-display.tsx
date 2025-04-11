import React from "react";
import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import SnackCarousel from "./snack-carousel";
import { Button } from "./ui/button";
import { SnackImageLocationVal } from "@/app/interfaces/SnackInterfaces";
import { Plus } from "lucide-react";

interface SnackDialogContentDisplayProps {
  snackName: string;
  snackToImageLocationMap: SnackImageLocationVal[];
  showNewLocationForm: () => void;
}

const SnackDialogContentDisplay = ({
  snackName,
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
        <Button onClick={showNewLocationForm}>
          Add new location <Plus />
        </Button>
      </DialogFooter>
    </>
  );
};

export default SnackDialogContentDisplay;
