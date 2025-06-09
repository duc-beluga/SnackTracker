import React from "react";
import Image from "next/image";

import { ImageLocation } from "@/app/interfaces/SnackInterfaces";

import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import SnackCarouselItemSkeleton from "./skeletons/snack-carousel-item-skeleton";
import LikeButton from "./like-button";

interface SnackCarouselProps {
  images_locations: ImageLocation[] | undefined;
}

export function SnackCarousel({ images_locations }: SnackCarouselProps) {
  return (
    <Carousel className="w-full max-w-sm mx-auto">
      <CarouselContent className="-ml-2 md:-ml-4">
        {images_locations !== undefined && images_locations.length > 0 ? (
          images_locations.map((image_location) => (
            <CarouselItem
              key={image_location.image_location_id}
              className="pl-2 md:pl-4"
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0 space-y-3">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={image_location.image_url}
                      alt="Snack location"
                      fill
                      sizes="(max-width: 640px) 280px, 320px"
                      className="object-cover"
                      priority={
                        image_location.image_location_id ===
                        images_locations[0]?.image_location_id
                      }
                      loading={
                        image_location.image_location_id ===
                        images_locations[0]?.image_location_id
                          ? "eager"
                          : "lazy"
                      }
                    />

                    {/* Like Button Overlay */}
                    <div className="absolute bottom-3 right-3">
                      <LikeButton
                        like_count={image_location.like_count}
                        like_id={image_location.like_id}
                        image_location_id={image_location.image_location_id}
                      />
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm leading-tight line-clamp-2">
                      {image_location.address}
                    </h3>

                    {image_location.aisle && (
                      <p className="text-xs text-muted-foreground font-medium">
                        Aisle {image_location.aisle}
                      </p>
                    )}

                    {(image_location.city || image_location.state) && (
                      <p className="text-xs text-muted-foreground">
                        {[image_location.city, image_location.state]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}

                    {image_location.uploaded_at && (
                      <p className="text-xs text-muted-foreground/70">
                        {new Date(
                          image_location.uploaded_at
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="pl-2 md:pl-4">
            <SnackCarouselItemSkeleton />
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
