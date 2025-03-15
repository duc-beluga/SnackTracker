import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

import React from "react";
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
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { toast } from "sonner";

import SnackLocationSearch from "./snack-location-search";
import { Input } from "./ui/input";

const addNewLocationFormSchema = z.object({
  snackId: z.number(),
  snackLocation: z.object({
    address: z.string(),
    place_id: z.string(),
  }),
  snackImage: z.instanceof(File),
});

const supabase = createClient();

const SnackDialogContent = ({
  snack,
  snackImages,
  isButtonNewLocationClicked,
  setIsButtonNewLocationClicked,
}: {
  snack: SnackDisplay;
  snackImages: SnackImageBasic[];
  isButtonNewLocationClicked: boolean;
  setIsButtonNewLocationClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const newLocationSnackForm = useForm<
    z.infer<typeof addNewLocationFormSchema>
  >({
    resolver: zodResolver(addNewLocationFormSchema),
    defaultValues: {
      snackId: snack.snack_id,
      snackLocation: { address: "", place_id: "0o0000000" },
    },
  });

  const uploadSnackImage = async (uploadImageFile: File): Promise<string> => {
    const emptyString = "";

    if (!uploadImageFile) {
      toast("No file selected!");
      return emptyString;
    }

    try {
      const uniqueImageId = uuidv4();

      const { error: uploadImageError } = await supabase.storage
        .from("snacks_pics")
        .upload(`${uniqueImageId}.png`, uploadImageFile);

      if (uploadImageError) {
        toast(uploadImageError.message);
        return emptyString;
      }
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("snacks_pics")
        .getPublicUrl(`${uniqueImageId}.png`);

      return publicUrl;
    } catch (unexpectedError) {
      toast.error(`Unexpected Error: ${unexpectedError}`);

      return emptyString;
    }
  };

  const onSubmit = async (values: z.infer<typeof addNewLocationFormSchema>) => {
    const { error: addNewLocationError } = await supabase.rpc(
      "handle_add_new_location_for_snack",
      {
        snack_data: {
          snack_id: values.snackId,
        },
        location_data: {
          google_place_id: values.snackLocation.place_id,
          address: values.snackLocation.address,
        },
      }
    );
    if (addNewLocationError) {
      toast.error(addNewLocationError?.hint);
      return;
    }

    const snackImageUrl = await uploadSnackImage(values.snackImage);

    const { error: uploadNewSnackImageError } = await supabase.rpc(
      "handle_add_new_image_url_for_snack",
      {
        snack_data: {
          snack_id: values.snackId,
        },
        image_data: {
          image_url: snackImageUrl,
        },
      }
    );

    console.log(uploadNewSnackImageError);
    if (uploadNewSnackImageError) {
      toast.error(uploadNewSnackImageError.hint);
      return;
    }

    toast.success("Cha ching!");
  };

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
                      <SnackLocationSearch field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={newLocationSnackForm.control}
                name="snackImage"
                render={({ field: { onChange, value, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Upload image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                        }}
                        {...fieldProps}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">
                    Put me on the Map <MapPinCheck />
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
