import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui";
import { SnackDetail } from "@/app/interfaces/SnackInterfaces";
import { SnackLocationForm } from "@/components/snack-location-form";

export function DialogSnackLocationForm({
  snack,
  onClose,
}: {
  snack: SnackDetail;
  onClose: () => void;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{snack.name}</DialogTitle>
        <DialogDescription>Where did you find it?</DialogDescription>
      </DialogHeader>

      <SnackLocationForm snackId={snack.snack_id} closeDialog={onClose} />
    </>
  );
}
