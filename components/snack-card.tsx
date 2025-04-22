import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface CardProps {
  snack: SnackDisplay;
  onSnackImageClicked: (snackId: number) => void;
}

const IMAGE_HEIGHT = "220px";
const IMAGE_WIDTH = "160px";

const SnackCard = ({ snack, onSnackImageClicked }: CardProps) => {
  return (
    <Card key={snack.snack_id} className="w-44">
      <CardContent className="p-2 max-h-60 max-w-44">
        {snack.primary_image_url ? (
          <Image
            src={snack.primary_image_url}
            alt="snack_image"
            width={700}
            height={300}
            priority
            className="w-full h-full rounded-md cursor-pointer"
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
              objectFit: "cover",
            }}
            onClick={() => onSnackImageClicked(snack.snack_id)}
          />
        ) : (
          <Skeleton
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
            }}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center pt-3">
        {snack.name}
      </CardFooter>
    </Card>
  );
};

export default SnackCard;
