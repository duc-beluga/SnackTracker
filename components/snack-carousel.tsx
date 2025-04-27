import React from "react";
import Image from "next/image";

import { SnackImageLocationVal } from "@/app/interfaces/SnackInterfaces";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardDescription } from "./ui/card";

interface CarouselProps {
  snackToImageLocationMap: SnackImageLocationVal[];
}

const SnackCarousel = ({ snackToImageLocationMap }: CarouselProps) => {
  return (
    <Carousel className="w-[calc(100%-52px)] sm:w-full max-w-xs">
      <CarouselContent>
        {snackToImageLocationMap.length > 0 ? (
          snackToImageLocationMap.map((imageLocations) => (
            <CarouselItem key={imageLocations.image_location_id}>
              <Card className="w-full border-none">
                <div className="h-20 sm:h-14 p-2 overflow-y-auto">
                  <CardDescription>
                    {imageLocations.snack_address}
                  </CardDescription>
                </div>
                <CardContent className="p-0 pt-2 relative aspect-square">
                  <div className="relative w-full h-full">
                    <Image
                      src={imageLocations.image_url}
                      alt="snackImage"
                      width={160}
                      height={220}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <Skeleton className="aspect-square w-full" />
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default SnackCarousel;
