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
import { Card, CardContent, CardDescription } from "./ui/card";
import SnackCarouselItemSkeleton from "./skeletons/snack-carousel-item-skeleton";

interface SnackCarouselProps {
  images_locations: SnackImageLocationVal[] | undefined;
}

const SnackCarousel = ({ images_locations }: SnackCarouselProps) => {
  return (
    <Carousel className="w-[calc(100%-52px)] sm:w-full max-w-xs">
      <CarouselContent>
        {images_locations !== undefined && images_locations.length > 0 ? (
          images_locations.map((image_location) => (
            <CarouselItem key={image_location.image_location_id}>
              <Card className="w-full border-none">
                <div className="h-14 sm:h-14 p-2 overflow-y-auto">
                  <CardDescription>
                    {image_location.snack_address}
                  </CardDescription>
                </div>
                <CardContent className="p-0 pt-2 relative aspect-square">
                  <div className="relative w-full h-full">
                    <Image
                      src={image_location.image_url}
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
          <SnackCarouselItemSkeleton />
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default SnackCarousel;
