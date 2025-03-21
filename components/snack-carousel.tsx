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
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

interface CarouselProps {
  snackImageUrls: SnackImageLocationVal[];
}

const SnackCarousel = ({ snackImageUrls }: CarouselProps) => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {snackImageUrls.length > 0 ? (
          snackImageUrls.map((snackUrl) => (
            <CarouselItem key={snackUrl.image_location_id}>
              <Card className="w-full border-none">
                <div className="h-14 p-2 overflow-y-auto">
                  <CardDescription>{snackUrl.snack_address}</CardDescription>
                </div>
                <CardContent className="p-0 pt-2 relative aspect-square">
                  <div className="relative w-full h-full">
                    <Image
                      src={snackUrl.image_url}
                      alt="snackImage"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      style={{ objectFit: "cover" }}
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
