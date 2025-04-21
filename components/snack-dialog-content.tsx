import React from "react";

// Type imports
import {
  SnackDetails,
  SnackDisplay,
  SnackImageLocationVal,
} from "@/app/interfaces/SnackInterfaces";

// Custom components
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import SnackLocationForm from "./snack-location-form";

// Icons
import { MapPinCheck } from "lucide-react";

import { onSnackLocationSubmit } from "@/app/server-actions/snacks/actions";
import { useSnackDialog } from "@/app/hooks/useSnackDialog";
import SnackDialogContentDisplay from "./snack-dialog-content-display";

interface DialogContentProps {
  snack: SnackDisplay;
  snackDetails: SnackDetails;
  dialogState: ReturnType<typeof useSnackDialog>;
}

const SnackDialogContent = ({
  snack,
  snackDetails,
  dialogState,
}: DialogContentProps) => {
  const {
    showNewLocationForm,
    hideNewLocationForm,
    isNewLocationSelected,
    setIsDialogOpen,
  } = dialogState;
  return (
    <DialogContent className="sm:max-w-[425px]">
      {/* Used to fix warning with missing description foor DialogContent */}
      <DialogDescription className="hidden"></DialogDescription>
      {!isNewLocationSelected ? (
        <SnackDialogContentDisplay
          snackName={snack.name}
          snackToImageLocationMap={snackDetails.images_locations}
          showNewLocationForm={showNewLocationForm}
          snack_id={snack.snack_id}
          like_count={snackDetails.like_count}
          like_data={snackDetails.like_data}
        />
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
              <Button type="submit">
                Put me on the Map <MapPinCheck />
              </Button>
            </DialogFooter>
          }
          onSnackLocationSubmit={async (values) => {
            await onSnackLocationSubmit(values);
            hideNewLocationForm();
            setIsDialogOpen(false);
          }}
          snackId={snack.snack_id}
        />
      )}
    </DialogContent>
  );
};

export default SnackDialogContent;
