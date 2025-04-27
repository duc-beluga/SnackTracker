import { useSnackReels } from "@/app/hooks/useSnackReels";
import { Location } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import { Dialog } from "./ui/dialog";
import SnackDialogContent from "./snack-dialog-content";
import Snacks from "./snacks";
import MoreSnack from "./more-snack";

interface SnackReelsProps {
  location: Location;
}

const SnackReels = ({ location }: SnackReelsProps) => {
  const {
    snacks,
    onSnackClick,
    selectedSnack,
    snackDetails,
    dialogState,
    onDialogVisibilityChange,
    ref,
    hasMore,
  } = useSnackReels(location);

  return (
    // TODO: Find a way to center this wrap flex
    <div className="flex flex-col gap-3 my-2">
      <div className="flex justify-center md:justify-start md:pl-4 pt-4">
        <h1 className="text-3xl font-bold">{location.toString()}</h1>
      </div>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-4">
        <Snacks snacks={snacks?.slice(0, 12)} onSnackClick={onSnackClick} />
        <MoreSnack
          ref={ref}
          hasMore={hasMore}
          location={location}
          onSnackClick={onSnackClick}
          snacks={snacks?.slice(12)}
        />
      </div>
      <Dialog
        open={dialogState.isDialogOpen}
        onOpenChange={onDialogVisibilityChange}
      >
        {selectedSnack && snackDetails?.images_locations && (
          <SnackDialogContent
            snack={selectedSnack}
            snackDetails={snackDetails}
            dialogState={dialogState}
            handleCloseDialog={() => onDialogVisibilityChange(false)}
          />
        )}
      </Dialog>
    </div>
  );
};

export default SnackReels;
