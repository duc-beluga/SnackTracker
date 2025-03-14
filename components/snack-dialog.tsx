import React from "react";
import Image from "next/image";

import {
  SnackDisplay,
  SnackImageBasic,
} from "@/app/interfaces/SnackInterfaces";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

import SnackCarousel from "./snack-carousel";
import { Plus } from "lucide-react";
import SnackDialogContent from "./snack-dialog-content";

const SnackDialog = ({
  snack,
  snackImages,
}: {
  snack: SnackDisplay;
  snackImages: SnackImageBasic[];
}) => {
  return (
    <Card key={snack.snack_id} className="w-44">
      <CardContent className="p-2 max-h-60 max-w-44">
        <Dialog>
          <DialogTrigger asChild>
            {snack.primary_image_url ? (
              <Image
                src={snack.primary_image_url}
                alt="snack_image"
                width={180}
                height={250}
                className="w-full h-full rounded-md cursor-pointer"
                style={{
                  width: "160px",
                  height: "220px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Skeleton
                style={{
                  width: "160px",
                  height: "220px",
                }}
              />
            )}
          </DialogTrigger>
          <SnackDialogContent snack={snack} snackImages={snackImages} />
        </Dialog>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center pt-3">
        {snack.name}
      </CardFooter>
    </Card>
  );
};

export default SnackDialog;
