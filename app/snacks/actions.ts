"use server"

import { createClient } from "@/utils/supabase/server";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const uploadSnackImage = async (uploadImageFile: File): Promise<string> => {
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
    const supabase = await createClient();
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
        console.error(addNewLocationError?.hint);
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

    if (uploadNewSnackImageError) {
      console.error(uploadNewSnackImageError.hint);
      return;
    }

    console.log("Cha ching!");
  };