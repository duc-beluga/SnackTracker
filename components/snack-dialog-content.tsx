import React, { Dispatch, SetStateAction } from "react";

// Type imports
import {
  SnackDisplay,
  SnackImageLocationVal,
} from "@/app/interfaces/SnackInterfaces";

// Custom components
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import SnackLocationForm from "./snack-location-form";
import SnackCarousel from "./snack-carousel";

// Icons
import { MapPinCheck, Plus } from "lucide-react";

import { getSnackLocationFormWithDefaultId } from "@/utils/zod/forms/SnackLocationForm";
import { onSnackLocationSubmit } from "@/app/server-actions/snacks/actions";

interface DialogContentProps {
  snack: SnackDisplay;
  snackToImageLocationMap: SnackImageLocationVal[];
  isButtonNewLocationClicked: boolean;
  setIsButtonNewLocationClicked: Dispatch<SetStateAction<boolean>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const SnackDialogContent = ({
  snack,
  snackToImageLocationMap,
  isButtonNewLocationClicked,
  setIsButtonNewLocationClicked,
  setIsDialogOpen,
}: DialogContentProps) => {
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
              {/* <DialogClose asChild> */}
              <Button type="submit">
                Put me on the Map <MapPinCheck />
              </Button>
              {/* </DialogClose> */}
            </DialogFooter>
          }
          onSnackLocationSubmit={async (values) => {
            await onSnackLocationSubmit(values);
            setIsButtonNewLocationClicked(false);
            setIsDialogOpen(false);
          }}
          snackId={snack.snack_id}
        />
      )}
    </DialogContent>
  );
};

export default SnackDialogContent;
