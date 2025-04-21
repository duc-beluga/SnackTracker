"use client";

import React, { useEffect, useState } from "react";

import {
  getImagesAndLocationsBySnackId,
  getSnackData,
} from "@/app/server-actions/snacks/actions";

import { Dialog } from "@/components/ui/dialog";
import {
  SnackDetails,
  SnackDisplay,
  SnackImageLocationVal,
} from "@/app/interfaces/SnackInterfaces";
import { useRouter, useSearchParams } from "next/navigation";
import SnackCardTwo from "@/components/snack-card-two";
import SnackDialogContent from "@/components/snack-dialog-content";
import { useSnackDialog } from "@/app/hooks/useSnackDialog";

const SnackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [snacks, setSnacks] = useState<SnackDisplay[] | null>();
  const [selectedSnack, setSelectedSnack] = useState<SnackDisplay | null>(null);
  const [snackDetails, setSnackDetails] = useState<SnackDetails | null>();
  const dialogState = useSnackDialog();

  useEffect(() => {
    async function fetchInitialSnacks() {
      const snacksData = await getSnackData();

      setSnacks(snacksData);
    }
    fetchInitialSnacks();
  }, []);

  useEffect(() => {
    async function fetchSnackDetails() {
      console.log("Getting the snack details");
      const snackIdParam = searchParams.get("snackId");
      const snackId = snackIdParam ? parseInt(snackIdParam, 10) : null;

      if (snackId === null) {
        return;
      }

      const snackDetailsData = await getImagesAndLocationsBySnackId(snackId);

      console.log("snackDetailsData", snackDetailsData);

      if (snackDetailsData === null) {
        return;
      }

      if (selectedSnack) {
        dialogState.setIsDialogOpen(true);
      }

      setSnackDetails(snackDetailsData);
    }
    fetchSnackDetails();
  }, [searchParams]);
  function onSnackClick(snackId: number) {
    router.push(`?snackId=${snackId}`, { scroll: false });
    if (snackId && snacks) {
      const foundSnack = snacks.find((snack) => snack.snack_id === snackId);
      if (foundSnack) {
        setSelectedSnack(foundSnack);
      }
    }
  }

  function handleModalClose() {
    dialogState.setIsDialogOpen(false);
    router.push(window.location.pathname, { scroll: false });
    setSelectedSnack(null);
    dialogState.hideNewLocationForm();
  }

  return (
    // TODO: Find a way to center this wrap flex
    <div className="flex flex-col gap-3">
      <div className="flex justify-start pl-8 pt-4">
        <h1 className="text-3xl font-bold">Discover</h1>
      </div>
      <div className="flex gap-2 flex-wrap ml-6 mr-6">
        {snacks?.map((snack) => (
          <SnackCardTwo
            snack={snack}
            onSnackImageClicked={onSnackClick}
            key={snack.snack_id}
          />
        ))}
        <Dialog
          open={dialogState.isDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              handleModalClose();
            } else {
              dialogState.setIsDialogOpen(true);
            }
          }}
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
