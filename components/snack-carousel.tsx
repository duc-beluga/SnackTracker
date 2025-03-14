import React from "react";
import Image from "next/image";

import { SnackImageBasic } from "@/app/interfaces/SnackInterfaces";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";

const SnackCarousel = ({
  snackImageUrls,
}: {
  snackImageUrls: SnackImageBasic[];
}) => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {snackImageUrls.length > 0 ? (
          snackImageUrls.map((snackUrl) => (
            <CarouselItem
              key={snackUrl.image_id}
              className="relative aspect-square w-full"
            >
              <Image
                src={snackUrl.image_url}
                alt="snackImage"
                fill
                // Need to adjust these values for image optimization
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                style={{ objectFit: "cover" }}
              />
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
