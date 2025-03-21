import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import SnackCarousel from "./snack-carousel";
import { Button } from "./ui/button";
import { MapPinCheck, Plus } from "lucide-react";
import {
  SnackDisplay,
  SnackImageLocationVal,
} from "@/app/interfaces/SnackInterfaces";

import { getSnackLocationForm } from "@/utils/zod/forms/SnackLocationForm";
import SnackLocationForm from "./snack-location-form";
import { onSnackLocationSubmit } from "@/app/snacks/actions";

interface DialogContentProps {
  snack: SnackDisplay;
  snackToImageLocationMap: SnackImageLocationVal[];
  isButtonNewLocationClicked: boolean;
  setIsButtonNewLocationClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnackDialogContent = ({
  snack,
  snackToImageLocationMap,
  isButtonNewLocationClicked,
  setIsButtonNewLocationClicked,
}: DialogContentProps) => {
  const reactHookSnackLocationForm = getSnackLocationForm(snack.snack_id);

  return (
    <DialogContent className="sm:max-w-[425px]">
      {!isButtonNewLocationClicked ? (
        <>
          <DialogHeader>
            <DialogTitle>{snack.name}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <SnackCarousel snackToImageLocationMap={snackToImageLocationMap} />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsButtonNewLocationClicked(true)}>
              Add new location <Plus />
            </Button>
          </DialogFooter>
        </>
      ) : (
        <SnackLocationForm
          headerSlot={
            <DialogHeader>
              <DialogTitle>{snack.name}</DialogTitle>
              <DialogDescription>Where did you find it?</DialogDescription>
            </DialogHeader>
          }
          footerSlot={
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">
                  Put me on the Map <MapPinCheck />
                </Button>
              </DialogClose>
            </DialogFooter>
          }
          reactHookSnackLocationForm={reactHookSnackLocationForm}
          onSnackLocationSubmit={onSnackLocationSubmit}
        />
      )}
    </DialogContent>
  );
};

export default SnackDialogContent;
