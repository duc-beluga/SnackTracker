import React from "react";
import { Card, CardContent } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";

export default function SnackCarouselItemSkeleton() {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-0 space-y-3">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Location Info */}
        <div className="space-y-1">
          <Skeleton className="h-[17px] w-full " />
          {/* 2-line address will make the dialog bigger
          This skeleton below is for dialogs with 1 of its element has 2-line address.*/}
          {/* <Skeleton className="h-[17px] w-3/4" /> */}
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
