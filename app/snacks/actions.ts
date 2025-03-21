"use server"

import { createClient } from "@/utils/supabase/server";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { SnackDisplay, SnackImageLocation, SnackImageLocationVal } from "../interfaces/SnackInterfaces";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";

const uploadSnackImage = async (uploadImageFile: File): Promise<string> => {
    const supabase = await createClient();
    const emptyString = "";

    if (!uploadImageFile) {
      console.error("No file selected!");
      return emptyString;
    }

    try {
      const uniqueImageId = uuidv4();

      const { error: uploadImageError } = await supabase.storage
        .from("snacks_pics")
        .upload(`${uniqueImageId}.png`, uploadImageFile);

      if (uploadImageError) {
        console.error(uploadImageError.message);
        return emptyString;
      }
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("snacks_pics")
        .getPublicUrl(`${uniqueImageId}.png`);

      return publicUrl;
    } catch (unexpectedError) {
        console.error(`Unexpected Error: ${unexpectedError}`);

      return emptyString;
    }
  };

export const onSnackLocationSubmit = async (
    values: z.infer<typeof SnackLocationSchemaType>
  ) => {
    const snackImageUrl = await uploadSnackImage(values.snackImage);
    
    const supabase = await createClient();

    const { error: addNewSnackLocationError } = await supabase.rpc(
      "handle_add_new_image_location_for_snack",
      {
        snack_data: {
          snack_id: values.snackId,
        },
        location_data: {
          google_place_id: values.snackLocation.place_id,
          address: values.snackLocation.address,
        },
        image_data: {
          image_url: snackImageUrl,
        },
      }
    );
    if (addNewSnackLocationError) {
        console.error(addNewSnackLocationError?.hint);
      return;
    }

    console.log("New snack location added!");
  };

export const onSnackNameLocationSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    const snackImageUrl = await uploadSnackImage(values.snackImage);
    
    const supabase = await createClient();

    const { error: addNewSnackError } = await supabase.rpc(
      "add_new_snack", {
        new_snack_data: {
          name: values.snackName,
        },
        location_data: {
          google_place_id: values.snackLocation.place_id,
          address: values.snackLocation.address,
        },
        image_data: {
          image_url: snackImageUrl,
        },
      })

      if (addNewSnackError) {
        console.error(addNewSnackError?.hint);
      return;
    }

    console.log("New snack added!");
  }

export const getSnackData = async () : Promise<SnackDisplay[] | null> => {
  const supabase = await createClient();

  const { data: displaySnack }: { data: SnackDisplay[] | null } = await supabase
      .from("snacks")
      .select("snack_id, name, primary_image_url");
    
  return displaySnack
}

export const getSnackLocationsAndImages = async (): Promise<Record<number, SnackImageLocationVal[]> | undefined> => {
  const supabase = await createClient();
  
  const { data: snackLocationImages }: { data: SnackImageLocation[] | null } =
    await supabase.rpc("get_snack_images_with_locations");

  type AccumulatorType = Record<number, SnackImageLocationVal[]>;
  
  const snackToImageLocationMapping =
    snackLocationImages?.reduce<AccumulatorType>((snackImagesById, item) => {
      const snackId: number = item.snack_id;
      const imageLocationId: number = item.image_location_id;
      const imageUrl: string = item.image_url;
      const snackAddress: string = item.snack_address;

      if (!snackImagesById[snackId]) {
        snackImagesById[snackId] = [];
      }

      snackImagesById[snackId].push({
        image_location_id: imageLocationId,
        image_url: imageUrl,
        snack_address: snackAddress,
      });

      return snackImagesById;
    }, {} as AccumulatorType);

  return snackToImageLocationMapping;
}