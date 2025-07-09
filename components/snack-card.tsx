import React from "react";
import { Card, Skeleton } from "@/components/ui";
import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { encodeId } from "@/utils/hashids";

interface CardProps {
  snack: SnackDisplay;
}

export function SnackCard({ snack }: CardProps) {
  const encodedSnackId = encodeId(snack.snack_id);

  return (
    <Card
      key={snack.snack_id}
      className="relative w-full h-80 rounded-lg overflow-hidden shadow-md snap-center"
    >
      {snack.primary_image_url ? (
        <Link
          href={`/?snackId=${encodedSnackId}`}
          as={`/snacks/${encodedSnackId}`}
          scroll={false}
          className="block w-full h-full relative"
        >
          {/* Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={snack.primary_image_url}
              alt="snack_image"
              fill
              sizes="100%"
              className="object-cover"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

          {/* Footer Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-3 text-white space-y-1.5 z-20">
            <p className="text-xs font-medium opacity-80 uppercase tracking-wide">
              {snack.brand}
            </p>
            <p className="text-base font-semibold leading-tight line-clamp-2 min-h-[2.5rem] drop-shadow-lg">
              {snack.name}
            </p>

            <div className="flex justify-between items-center text-sm pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{snack.location_count}</span>
                <span className="hidden sm:inline">
                  {snack.location_count === 1 ? "location" : "locations"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{snack.like_count}</span>
                <span>{snack.like_count === 1 ? "like" : "likes"}</span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="relative w-full h-full">
          <Skeleton className="w-full h-full" />
        </div>
      )}
    </Card>
  );
}
