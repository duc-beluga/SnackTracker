"use server";

import { createClient } from "@/utils/supabase/server";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
  SnackDetails,
  SnackDisplay,
  SnackImageLocation,
  SnackImageLocationVal,
  SnackLike,
} from "../../interfaces/SnackInterfaces";
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
};

export const onSnackNameLocationSubmit = async (
  values: z.infer<typeof SnackNameLocationSchemaType>
) => {
  const snackImageUrl = await uploadSnackImage(values.snackImage);

  const supabase = await createClient();

  const { error: addNewSnackError } = await supabase.rpc("add_new_snack", {
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
  });

  if (addNewSnackError) {
    console.error(addNewSnackError?.hint);
    return;
  }
};

export const getSnackData = async (): Promise<SnackDisplay[] | null> => {
  const supabase = await createClient();

  const { data: displaySnack }: { data: SnackDisplay[] | null } = await supabase
    .from("snacks")
    .select("snack_id, name, primary_image_url");

  return displaySnack;
};

export async function addingLike(snack_id: number) {
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const { data: newLike, error } = await supabase
    .from("likes")
    .insert({ user_id: currentUser.id, snack_id: snack_id })
    .select("like_id, user_id, snack_id")
    .single();

  if (error) {
    console.error("Error adding like:", error);
    throw error;
  }

  return newLike as SnackLike | null;
}

export async function removingLike(userLike: SnackLike | null) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("like_id", userLike?.like_id);

  if (error) {
    console.error("Error adding like:", error);
    throw error;
  }
}

export const getSnacksLike = async (snack_id: number) => {
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const { data: userSnackLike }: { data: SnackLike | null } = await supabase
    .from("likes")
    .select("like_id, user_id, snack_id")
    .eq("user_id", currentUser.id || "")
    .eq("snack_id", snack_id)
    .maybeSingle();

  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("snack_id", snack_id);

  return {
    userSnackLike,
    likeCount: count || 0,
  };
};

export async function getImagesAndLocationsBySnackId(snackId: number) {
  const supabase = await createClient();

  const { data: snackLocationsImages, error } = await supabase.rpc(
    "get_images_and_locations_by_snackid",
    {
      p_snack_id: snackId,
    }
  );
  if (error) {
    console.log(error);
  }

  const snackLikeData = await getSnacksLike(snackId);

  const snackDetails: SnackDetails = {
    images_locations: snackLocationsImages,
    like_data: snackLikeData.userSnackLike,
    like_count: snackLikeData.likeCount,
  };

  return snackDetails;
}

export async function getLikedSnacksData(): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data: displaySnack }: { data: SnackDisplay[] | null } =
    await supabase.rpc("get_user_liked_snacks", { p_user_id: currentUser?.id });

  return displaySnack;
}

export async function getUploadedSnacksData(): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  const { data: displaySnack }: { data: SnackDisplay[] | null } =
    await supabase.rpc("get_user_uploaded_snacks");

  return displaySnack;
}
