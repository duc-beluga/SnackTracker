"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import SnackCarousel from "./snack-carousel";
import { Button } from "./ui/button";
import { MapPinCheck, Plus } from "lucide-react";
import {
  SnackDisplay,
  SnackImageBasic,
} from "@/app/interfaces/SnackInterfaces";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

const addNewLocationFormSchema = z.object({
  snackId: z.number(),
  snackLocation: z.string(),
});

const SnackDialogContent = ({
  snack,
  snackImages,
}: {
  snack: SnackDisplay;
  snackImages: SnackImageBasic[];
}) => {
  const [isButtonNewLocationClicked, setIsButtonNewLocationClicked] =
    useState(false);

  const newLocationSnackForm = useForm<
    z.infer<typeof addNewLocationFormSchema>
  >({
    resolver: zodResolver(addNewLocationFormSchema),
    defaultValues: {
      snackId: snack.snack_id,
      snackLocation: "Not found",
    },
  });

  function onSubmit(values: z.infer<typeof addNewLocationFormSchema>) {
    setIsButtonNewLocationClicked(false);
    console.log(values);
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      {!isButtonNewLocationClicked ? (
        <>
          <DialogHeader>
            <DialogTitle>{snack.name}</DialogTitle>
            <DialogDescription>Location</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <SnackCarousel snackImageUrls={snackImages} />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsButtonNewLocationClicked(true)}>
              Add new location <Plus />
            </Button>
          </DialogFooter>
        </>
      ) : (
        <>
          <Form {...newLocationSnackForm}>
            <form
              onSubmit={newLocationSnackForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle>{snack.name}</DialogTitle>
                <DialogDescription>Where did you find it?</DialogDescription>
              </DialogHeader>

              <FormField
                control={newLocationSnackForm.control}
                name="snackLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search location</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">
                    Put Me on the Map <MapPinCheck />
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </>
      )}
    </DialogContent>
  );
};

export default SnackDialogContent;
