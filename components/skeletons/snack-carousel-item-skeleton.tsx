import React from "react";
import { CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const SnackCarouselItemSkeleton = () => {
  return (
    <CarouselItem>
      <Card className="w-full border-none">
        <div className="h-20 sm:h-14 p-2 overflow-y-auto">
          <CardDescription>
            <Skeleton className="w-52 sm:w-64 h-5" />
          </CardDescription>
        </div>
        <CardContent className="p-0 pt-2 relative aspect-square">
          <div className="relative w-full h-full">
            <Skeleton className="w-full h-full" />
          </div>
        </CardContent>
      </Card>
      {/* <Skeleton className="aspect-square w-full" /> */}
    </CarouselItem>
  );
};

export default SnackCarouselItemSkeleton;
