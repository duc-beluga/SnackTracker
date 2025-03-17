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
  SnackImageBasic,
} from "@/app/interfaces/SnackInterfaces";

import { getSnackLocationForm } from "@/utils/zod/forms/SnackLocationForm";
import SnackLocationForm from "./snack-location-form";
import { onSnackLocationSubmit } from "@/app/snacks/actions";

const SnackDialogContent = ({
  snack,
  snackImages,
  isButtonNewLocationClicked,
  setIsButtonNewLocationClicked,
}: {
  snack: SnackDisplay;
  snackImages: SnackImageBasic[];
  isButtonNewLocationClicked: boolean;
  setIsButtonNewLocationClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const reactHookSnackLocationForm = getSnackLocationForm(snack.snack_id);

  return (
    <DialogContent className="sm:max-w-[425px]">
      {!isButtonNewLocationClicked ? (
        <>
          <DialogHeader>
            <DialogTitle>{snack.name}</DialogTitle>
            <DialogDescription>Location</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <SnackCarousel snackImageUrls={snackImages} />
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
