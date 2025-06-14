import React from "react";
import { DialogFooter, DialogHeader, DialogTitle, Skeleton } from "./ui";
import SnackCarouselItemSkeleton from "./skeletons/snack-carousel-item-skeleton";

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
      </DialogHeader>

      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <SnackCarouselItemSkeleton />
        </div>
      </div>

      <DialogFooter>
        <div className="flex items-center justify-center w-full">
          <Skeleton className="w-[248px] sm:w-[320px] h-9" />
        </div>
      </DialogFooter>
    </>
  );
}
