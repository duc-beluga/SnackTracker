import React from "react";
import { Card, CardContent, CardFooter, Skeleton } from "@/components/ui";
import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  snack: SnackDisplay;
}

const IMAGE_HEIGHT = "220px";
const IMAGE_WIDTH = "160px";

export function SnackCard({ snack }: CardProps) {
  return (
    <Card key={snack.snack_id} className="w-80 sm:w-52 md:w-44 lg:w-44">
      <CardContent className="p-2 h-96 md:h-64 lg:h-60">
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
              className="w-full h-full rounded-md cursor-pointer object-cover"
            />
          </Link>
        ) : (
          <Skeleton
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
            }}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center pt-2 h-14 md:h-24 lg:h-24">
        {snack.name}
      </CardFooter>
    </Card>
  );
}
