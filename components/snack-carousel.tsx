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
                style={{ objectFit: "cover" }}
              />
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <Skeleton className="aspect-square w-full"></Skeleton>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default SnackCarousel;
