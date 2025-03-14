"use client";

import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import SnackCarousel from "./snack-carousel";
import { Button } from "./ui/button";
import { MapPinCheck, Plus } from "lucide-react";
import {
  SnackDisplay,
  SnackImageBasic,
} from "@/app/interfaces/SnackInterfaces";
import { Input } from "./ui/input";

const SnackDialogContent = ({
  snack,
  snackImages,
}: {
  snack: SnackDisplay;
  snackImages: SnackImageBasic[];
}) => {
  const [isButtonNewLocationClicked, setIsButtonNewLocationClicked] =
    useState(false);

  return (
    <DialogContent className="sm:max-w-[425px]">
      {!isButtonNewLocationClicked ? (
        <>
          <DialogHeader>
            <DialogTitle>{snack.name}</DialogTitle>
            <DialogDescription>Location</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <SnackCarousel snackImageUrls={snackImages} />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsButtonNewLocationClicked(true)}>
              Add new location <Plus />
            </Button>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>{snack.name}</DialogTitle>
            <DialogDescription>Where did you find it?</DialogDescription>
          </DialogHeader>
          <div>
            <Input type="search" />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsButtonNewLocationClicked(true)}>
              Put Me on the Map <MapPinCheck />
            </Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
};

export default SnackDialogContent;
