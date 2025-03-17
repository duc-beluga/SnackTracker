"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  SnackDisplay,
  SnackImageBasic,
} from "@/app/interfaces/SnackInterfaces";

import { Dialog, DialogTrigger } from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";
import SnackDialogContent from "./snack-dialog-content";

const IMAGE_HEIGHT = "220px";
const IMAGE_WIDTH = "160px";

const SnackDialog = ({
  snack,
  snackImages,
}: {
  snack: SnackDisplay;
  snackImages: SnackImageBasic[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isButtonNewLocationClicked, setIsButtonNewLocationClicked] =
    useState(false);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setTimeout(() => setIsButtonNewLocationClicked(false), 200);
        }
      }}
    >
      <DialogTrigger asChild>
        {snack.primary_image_url ? (
          <Image
            src={snack.primary_image_url}
            alt="snack_image"
            width={180}
            height={250}
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
        snackImages={snackImages}
        isButtonNewLocationClicked={isButtonNewLocationClicked}
        setIsButtonNewLocationClicked={setIsButtonNewLocationClicked}
      />
    </Dialog>
  );
};

export default SnackDialog;
