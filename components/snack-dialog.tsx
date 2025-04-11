"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  SnackDisplay,
  SnackImageLocationVal,
} from "@/app/interfaces/SnackInterfaces";

import { Dialog, DialogTrigger } from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";
import SnackDialogContent from "./snack-dialog-content";
import { useSnackDialog } from "@/app/hooks/useSnackDialog";

const IMAGE_HEIGHT = "220px";
const IMAGE_WIDTH = "160px";

interface DialogProps {
  snack: SnackDisplay;
  snackToImageLocationMap: SnackImageLocationVal[];
}

const SnackDialog = ({ snack, snackToImageLocationMap }: DialogProps) => {
  const dialogState = useSnackDialog();
  const { isDialogOpen, setIsDialogOpen, hideNewLocationForm } = dialogState;

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          hideNewLocationForm();
        }
      }}
    >
      <DialogTrigger asChild>
        {snack.primary_image_url ? (
          <Image
            src={snack.primary_image_url}
            alt="snack_image"
            width={700}
            height={300}
            className="w-full h-full rounded-md cursor-pointer"
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
              objectFit: "cover",
            }}
          />
        ) : (
          <Skeleton
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
            }}
          />
        )}
      </DialogTrigger>
      <SnackDialogContent
        snack={snack}
        snackToImageLocationMap={snackToImageLocationMap}
        dialogState={dialogState}
      />
    </Dialog>
  );
};

export default SnackDialog;
