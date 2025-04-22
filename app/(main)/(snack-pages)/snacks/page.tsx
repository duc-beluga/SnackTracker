"use client";

import { Dialog } from "@/components/ui/dialog";
import SnackCard from "@/components/snack-card";
import SnackDialogContent from "@/components/snack-dialog-content";
import { useSnackReels } from "@/app/hooks/useSnackReels";

const SnackPage = () => {
  const {
    snacks,
    onSnackClick,
    selectedSnack,
    snackDetails,
    dialogState,
    handleDialogChange,
  } = useSnackReels();

  return (
    // TODO: Find a way to center this wrap flex
    <div className="flex flex-col gap-3">
      <div className="flex justify-start pl-8 pt-4">
        <h1 className="text-3xl font-bold">Discover</h1>
      </div>
      <div className="flex gap-2 flex-wrap ml-6 mr-6">
        {snacks?.map((snack) => (
          <SnackCard
            snack={snack}
            onSnackImageClicked={onSnackClick}
            key={snack.snack_id}
          />
        ))}
        <Dialog
          open={dialogState.isDialogOpen}
          onOpenChange={handleDialogChange}
        >
          {selectedSnack && snackDetails?.images_locations && (
            <SnackDialogContent
              snack={selectedSnack}
              snackDetails={snackDetails}
              dialogState={dialogState}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default SnackPage;
