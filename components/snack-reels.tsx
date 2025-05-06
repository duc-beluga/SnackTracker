import { useSnackReels } from "@/app/hooks/useSnackReels";
import { Location } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import { Dialog } from "./ui/dialog";
import SnackDialogContent from "./snack-dialog-content";
import Snacks from "./snacks";
import MoreSnack from "./more-snack";
import { Button } from "./ui/button";
import Link from "next/link";
import { Upload } from "lucide-react";

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
      <div className="flex justify-start pt-4 md:px-4">
        {location === Location.Home && (
          <Button variant="outline" className="hidden md:inline-flex" asChild>
            <Link href="snacks/new">
              Upload <Upload />
            </Link>
          </Button>
        )}
      </div>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mx-4">
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
        {selectedSnack && (
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
