import React from "react";
import { DialogFooter, DialogHeader, DialogTitle, Skeleton } from "./ui";
import SnackCarouselItemSkeleton from "./skeletons/snack-carousel-item-skeleton";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SnackCarousel } from "./snack-carousel";

type DialogSnackDetailSkeletonProps = {
  isUndefined: boolean;
};

export default function DialogSnackDetailSkeleton({
  isUndefined,
}: DialogSnackDetailSkeletonProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isUndefined ? (
            <Skeleton className="h-[18px] w-[140px]" />
          ) : (
            "Snack Not Found"
          )}
        </DialogTitle>
        <Skeleton className="h-[20px] mt-[6px] w-14" />
        <DialogDescription />
      </DialogHeader>

      <div className="flex justify-center">
        <SnackCarousel images_locations={undefined} />
      </div>

      <DialogFooter>
        <div className="flex items-center justify-center w-full">
          <Skeleton className="w-[248px] sm:w-[320px] h-9" />
        </div>
      </DialogFooter>
    </>
  );
}
