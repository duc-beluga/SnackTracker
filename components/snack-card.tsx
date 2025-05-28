import React from "react";
import { Card, CardContent, CardFooter, Skeleton } from "@/components/ui";
import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";

interface CardProps {
  snack: SnackDisplay;
}

const IMAGE_HEIGHT = "220px";
const IMAGE_WIDTH = "160px";

export function SnackCard({ snack }: CardProps) {
  return (
    <Card
      key={snack.snack_id}
      className="w-[370px] sm:w-52 md:w-44 lg:w-44 rounded-lg overflow-hidden shadow-md transition-all duration-300"
    >
      <CardContent className="h-96 md:h-64 lg:h-60 p-0">
        {snack.primary_image_url ? (
          <Link
            href={`/?snackId=${snack.snack_id}`}
            as={`/snacks/${snack.snack_id}`}
            scroll={false}
          >
            <Image
              src={snack.primary_image_url}
              alt="snack_image"
              width={160}
              height={220}
              priority
              className="w-full h-full object-cover rounded-t-lg cursor-pointer"
            />
          </Link>
        ) : (
          <Skeleton
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
            }}
            className="rounded-t-lg"
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center p-3 h-24 text-center gap-2">
        <p className="text-lg sm:text-sm font-semibold leading-snug line-clamp-2 h-10">
          {snack.name}
        </p>
        <div className="flex justify-between items-center w-3/4">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin className="w-6 h-6 sm:w-4 sm:h-4" />
            <span className="text-lg sm:text-sm">{snack.image_count}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Heart className="w-6 h-6 sm:w-4 sm:h-4" />
            <span className="text-lg sm:text-sm">{snack.like_count}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
