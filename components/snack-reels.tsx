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
    handleDialogChange,
    ref,
    hasMore,
  } = useSnackReels(location);

  return (
    // TODO: Find a way to center this wrap flex
    <div className="flex flex-col gap-3">
      <div className="flex justify-center md:justify-start md:pl-8 pt-4">
        <h1 className="text-3xl font-bold">{location.toString()}</h1>
      </div>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ml-6 mr-6">
        <Snacks snacks={snacks?.slice(0, 12)} onSnackClick={onSnackClick} />
        <MoreSnack
          ref={ref}
          hasMore={hasMore}
          location={location}
          onSnackClick={onSnackClick}
          snacks={snacks?.slice(12)}
        />
      </div>
      <Dialog open={dialogState.isDialogOpen} onOpenChange={handleDialogChange}>
        {selectedSnack && snackDetails?.images_locations && (
          <SnackDialogContent
            snack={selectedSnack}
            snackDetails={snackDetails}
            dialogState={dialogState}
          />
        )}
      </Dialog>
    </div>
  );
};

export default SnackReels;
