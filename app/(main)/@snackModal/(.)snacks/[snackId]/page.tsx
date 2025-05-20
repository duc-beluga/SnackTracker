"use client";

import { SnackDetailsTest } from "@/app/interfaces/SnackInterfaces";
import { getCurrentUser } from "@/app/server-actions/auth/actions";
import { fetchSnackImagesAndLocationsTest } from "@/app/server-actions/snacks/actions";
import { DialogNewSnack } from "@/components/dialog-new-snack";
import LikeButton from "@/components/like-button";
import SnackCarousel from "@/components/snack-carousel";
import SnackLocationFormTest from "@/components/snack-location-form-test";
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
import { User } from "@supabase/supabase-js";
import { MapPinCheck, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Modal({
  params,
}: {
  params: Promise<{ snackId: string }>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState<User | null>();
  const [currentSnack, setCurrentSnack] = useState<
    SnackDetailsTest | undefined
  >();
  const [isNewLocationSelected, setIsNewLocationSelected] = useState(false);
  const [isUploadSnack, setIsUploadSnack] = useState<boolean>(false);

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
      const snackDetailsTask = fetchSnackImagesAndLocationsTest(snackId);
      const userDataTask = getCurrentUser();

      const [snackDetailsData, userData] = await Promise.all([
        snackDetailsTask,
        userDataTask,
      ]);

      setCurrentSnack(snackDetailsData);
      setUser(userData);
    }

    fetchSnackDetails();
  }, []);

  if (isUploadSnack) {
    return <DialogNewSnack />;
  }

  return (
    <Dialog open={open} onOpenChange={onDialogVisibilityChange}>
      <DialogContent className="max-w-[350px] sm:max-w-[425px] rounded-md">
        {currentSnack === undefined || user === undefined ? (
          <>
            <DialogDescription className="hidden"></DialogDescription>
            <DialogHeader>
              <DialogTitle>
                <Skeleton className="h-[18px] w-12" />
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <SnackCarousel
                images_locations={currentSnack?.images_locations}
              />
            </div>
            <DialogFooter>
              <div className="flex flex-row justify-between w-full pl-3 pr-3">
                <Skeleton className="w-[50px] h-9" />
                <div>
                  <Skeleton className="w-44 h-9" />
                </div>
              </div>
            </DialogFooter>
          </>
        ) : !isNewLocationSelected ? (
          <>
            <DialogDescription className="hidden"></DialogDescription>
            <DialogHeader>
              <DialogTitle>{currentSnack?.name}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <SnackCarousel
                images_locations={currentSnack?.images_locations}
              />
            </div>
            <DialogFooter>
              <div className="flex flex-row justify-between w-full pl-3 pr-3">
                <LikeButton
                  initialLikeCount={currentSnack?.like_count}
                  userLikeData={currentSnack?.like_data}
                  snackId={currentSnack?.snack_id}
                />
                <div>
                  {user !== null ? (
                    <Button onClick={showNewLocationForm}>
                      Add new location <Plus />
                    </Button>
                  ) : (
                    user && <Skeleton className="w-44 h-9" />
                  )}
                </div>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{currentSnack?.name}</DialogTitle>
              <DialogDescription>Where did you find it?</DialogDescription>
            </DialogHeader>
            <SnackLocationFormTest snackId={currentSnack.snack_id} />
            <DialogFooter>
              <DialogClose asChild>
                <Button form="addSnackLocationForm" type="submit">
                  Put me on the Map <MapPinCheck />
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
