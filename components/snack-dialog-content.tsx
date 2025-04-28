import React from "react";

// Type imports
import { SnackDetails, SnackDisplay } from "@/app/interfaces/SnackInterfaces";

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

import { addSnackLocation } from "@/app/server-actions/snacks/actions";
import { useSnackDialog } from "@/app/hooks/useSnackDialog";
import SnackDialogContentDisplay from "./snack-dialog-content-display";
import { toast } from "sonner";

interface DialogContentProps {
  snack: SnackDisplay;
  snackDetails: SnackDetails | null;
  dialogState: ReturnType<typeof useSnackDialog>;
  handleCloseDialog: () => void;
}

const SnackDialogContent = ({
  snack,
  snackDetails,
  dialogState,
  handleCloseDialog,
}: DialogContentProps) => {
  const { showNewLocationForm, isNewLocationSelected } = dialogState;
  return (
    <DialogContent className="max-w-[350px] sm:max-w-[425px] rounded-md">
      {/* Used to fix warning with missing description foor DialogContent */}
      <DialogDescription className="hidden"></DialogDescription>
      {!isNewLocationSelected ? (
        <SnackDialogContentDisplay
          snackName={snack.name}
          snackId={snack.snack_id}
          showNewLocationForm={showNewLocationForm}
          snackDetails={snackDetails}
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
          addSnackLocation={async (values) => {
            await addSnackLocation(values);
            handleCloseDialog();
            toast.success("New location successfully added");
          }}
          snackId={snack.snack_id}
        />
      )}
    </DialogContent>
  );
};

export default SnackDialogContent;
