"use client";

import { SnackDetail } from "@/app/interfaces/SnackInterfaces";
import { fetchSnackDetail } from "@/app/server-actions/snacks/actions";
import { RootState } from "@/app/store/store";
import { DialogNewSnack } from "@/components/dialog-new-snack";
import { SnackCarousel } from "@/components/snack-carousel";
import { SnackLocationForm } from "@/components/snack-location-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "@/components/ui";
import { DialogClose } from "@radix-ui/react-dialog";
import { MapPinCheck, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Modal({
  params,
}: {
  params: Promise<{ snackId: string }>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [currentSnack, setCurrentSnack] = useState<
    SnackDetail | undefined | null
  >();
  const [isNewLocationSelected, setIsNewLocationSelected] = useState(false);
  const [isUploadSnack, setIsUploadSnack] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user.currentUser);

  const showNewLocationForm = () => setIsNewLocationSelected(true);
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
    setTimeout(() => setIsNewLocationSelected(false), 200);
  }

  useEffect(() => {
    async function fetchSnackDetails() {
      const snackId = parseInt((await params).snackId);
      if (isNaN(snackId)) {
        setIsUploadSnack(true);
        return;
      }

      const snackDetailsData = await fetchSnackDetail(snackId);

      setCurrentSnack(snackDetailsData);
    }

    fetchSnackDetails();
  }, []);

  if (isUploadSnack) {
    return <DialogNewSnack />;
  }

  return (
    <Dialog open={open} onOpenChange={onDialogVisibilityChange}>
      <DialogContent className="max-w-[350px] sm:max-w-[425px] rounded-md">
        {!isNewLocationSelected ? (
          <>
            <DialogDescription className="hidden"></DialogDescription>
            <DialogHeader>
              <DialogTitle>
                {currentSnack === undefined ? (
                  <Skeleton className="h-[18px] w-12" />
                ) : currentSnack === null ? (
                  "Snack Not Found"
                ) : (
                  currentSnack.name
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <SnackCarousel
                images_locations={currentSnack?.images_locations}
              />
            </div>
            <DialogFooter>
              <div className="flex items-center justify-center w-full">
                {user === undefined ? (
                  <Skeleton className="w-[248px] sm:w-[320px] h-9" />
                ) : (
                  user !== null && (
                    <Button
                      onClick={showNewLocationForm}
                      className="w-[248px] sm:w-[320px]"
                    >
                      Add new location <Plus />
                    </Button>
                  )
                )}
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{currentSnack?.name}</DialogTitle>
              <DialogDescription>Where did you find it?</DialogDescription>
            </DialogHeader>
            {currentSnack && (
              <SnackLocationForm
                snackId={currentSnack.snack_id}
                closeDialog={handleModalClose}
              />
            )}
            <DialogFooter>
              <Button form="addSnackLocationForm" type="submit">
                Put me on the Map <MapPinCheck />
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
