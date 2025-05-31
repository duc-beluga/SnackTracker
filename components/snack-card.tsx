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
      className="w-full rounded-lg overflow-hidden shadow-md  snap-center"
    >
      <CardContent className="h-64 sm:h-56 md:h-52 p-0">
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
              className="w-full h-full object-cover"
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

      <CardFooter className="flex flex-col sm:flex-col items-start sm:items-center justify-between p-4 h-28 sm:h-24 text-left gap-2 sm:gap-1">
        <p className="text-base sm:text-sm font-semibold leading-relaxed line-clamp-2">
          {snack.name}
        </p>

        <div className="flex justify-between items-center w-full  mt-auto">
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <MapPin className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="text-base sm:text-sm">{snack.image_count}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Heart className="w-5 h-5 sm:w-4 sm:h-4 " />
            <span className="text-base sm:text-sm">{snack.like_count}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
