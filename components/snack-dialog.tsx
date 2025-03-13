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

const SnackDialog = ({
  snack,
  snackImages,
}: {
  snack: SnackDisplay;
  snackImages: SnackImageBasic[];
}) => {
  return (
    <Dialog key={snack.snack_id}>
      <Card key={snack.snack_id} className="w-44">
        <DialogTrigger asChild>
          <CardContent className="p-2 max-h-60 max-w-44">
            {snack.primary_image_url ? (
              <Image
                src={snack.primary_image_url}
                alt="snack_image"
                width={180}
                height={250}
                className="w-full h-full rounded-md"
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
          </CardContent>
        </DialogTrigger>
        <CardFooter className="flex flex-wrap items-center justify-center pt-3">
          {snack.name}
        </CardFooter>
      </Card>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{snack.name}</DialogTitle>
          <DialogDescription>Location</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <SnackCarousel snackImageUrls={snackImages} />
        </div>
        <DialogFooter>
          <Button type="submit">
            Add new location <Plus />{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SnackDialog;
