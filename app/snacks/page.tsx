import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SnackDisplay {
  snack_id: number;
  name: string;
  primary_image_url: string;
}

interface SnackImage {
  snack_id: number;
  image_id: number;
  image_url: string;
}

const SnackPage = async () => {
  const supabase = await createClient();

  const { data: displaySnack }: { data: SnackDisplay[] | null } = await supabase
    .from("snacks")
    .select("snack_id, name, primary_image_url");

  const { data: snackImages }: { data: SnackImage[] | null } = await supabase
    .from("snack_images")
    .select();
  type AccumulatorType = Record<number, string[]>;

  const snackToImageMapping = snackImages?.reduce<AccumulatorType>(
    (dict, item) => {
      const key: number = item.snack_id;
      const value: string = item.image_url;

      if (dict[key]) {
        if (Array.isArray(dict[key])) {
          dict[key].push(value);
        } else {
          dict[key] = [dict[key], value];
        }
      } else {
        dict[key] = [value];
      }

      return dict;
    },
    {} as AccumulatorType
  );

  return (
    <div className="flex gap-2 flex-wrap">
      {displaySnack?.map((snack) => (
        <Dialog key={snack.snack_id}>
          <DialogTrigger asChild>
            <Card key={snack.snack_id} className="w-44">
              <CardContent className="p-2 max-h-60 max-w-44">
                {snack.primary_image_url ? (
                  <Image
                    src={snack.primary_image_url}
                    alt="snack_image"
                    width={180}
                    height={250}
                    className="w-full h-full rounded-md"
                    style={{
                      width: "160px",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Skeleton
                    style={{
                      width: "160px",
                      height: "220px",
                    }}
                  />
                )}
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-center pt-3">
                {snack.name}
              </CardFooter>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Snack Photos</DialogTitle>
              <DialogDescription>Location</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Carousel className="w-full max-w-xs">
                <CarouselContent>
                  {snackToImageMapping?.[snack.snack_id]?.map((snackUrl) => (
                    <CarouselItem
                      key={snackUrl}
                      className="relative aspect-square w-full"
                    >
                      <Image
                        src={snackUrl}
                        alt="snackImage"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <DialogFooter>
              <Button type="submit">Add new location!</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default SnackPage;
