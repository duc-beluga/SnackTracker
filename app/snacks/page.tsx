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

const SnackPage = async () => {
  const supabase = await createClient();

  const { data: displaySnack }: { data: SnackDisplay[] | null } = await supabase
    .from("snacks")
    .select("snack_id, name, primary_image_url");

  console.log(displaySnack);

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
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">
                              {index + 1}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
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
