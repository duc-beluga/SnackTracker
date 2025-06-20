"use client";

import { useSnackDetail } from "@/app/hooks/useSnackDetail";
import { RootState } from "@/app/store/store";
import { Dialog, DialogContent } from "@/components/ui";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DialogSnackInfo } from "./dialog-snack-info";
import { DialogSnackLocationForm } from "./dialog-snack-location-form";
import DialogSnackDetailSkeleton from "./dialog-snack-detail-skeleton";

type DialogSnackDetailProps = {
  snackId: string;
};

export default function DialogSnackDetail({ snackId }: DialogSnackDetailProps) {
  const [open, setOpen] = useState(true);
  const [isNewLocationSelected, setIsNewLocationSelected] = useState(false);

  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { data: snack, isLoading, isError } = useSnackDetail(snackId);

  function onDialogVisibilityChange(isOpen: boolean) {
    if (!isOpen) {
      handleModalClose();
    } else {
      setOpen(true);
    }
  }

  function handleModalClose() {
    router.back();
    setOpen(false);
    setTimeout(() => setIsNewLocationSelected(false), 300);
  }

  function renderDialogContent() {
    if (isLoading || !snack) {
      return <DialogSnackDetailSkeleton isUndefined={snack === undefined} />;
    }

    if (isNewLocationSelected) {
      return (
        <DialogSnackLocationForm snack={snack} onClose={handleModalClose} />
      );
    }

    return (
      <DialogSnackInfo
        snack={snack}
        user={user}
        onAddLocationClick={() => setIsNewLocationSelected(true)}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onDialogVisibilityChange}>
      <DialogContent className="max-w-[350px] sm:max-w-[425px] rounded-md">
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
}
