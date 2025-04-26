"use server";

import { createClient } from "@/utils/supabase/server";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
  SnackDetails,
  SnackDisplay,
  SnackLike,
} from "../../interfaces/SnackInterfaces";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";

//#region { Snack Detail Operations }

export const addSnackLocation = async (
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

export async function addSnackLike(snack_id: number) {
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

export async function removeSnackLike(userLike: SnackLike | null) {
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

export const fetchSnackLikeInfo = async (snack_id: number) => {
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

export async function fetchSnackImagesAndLocations(snackId: number) {
  const supabase = await createClient();

  const { data: snackLocationsImages, error } = await supabase.rpc(
    "get_images_and_locations_by_snackid",
    {
      p_snack_id: snackId,
    }
  );
  if (error) {
    console.error(error);
  }

  const snackLikeData = await fetchSnackLikeInfo(snackId);

  const snackDetails: SnackDetails = {
    images_locations: snackLocationsImages,
    like_data: snackLikeData.userSnackLike,
    like_count: snackLikeData.likeCount,
  };

  return snackDetails;
}

//#endregion

//#region { Snack Collection Operations }

export const createSnack = async (
  values: z.infer<typeof SnackNameLocationSchemaType>
) => {
  const snackImageUrl = await uploadSnackImage(values.snackImage);

  const supabase = await createClient();

  const { error: snackAddError } = await supabase.rpc("add_new_snack", {
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

  if (snackAddError) {
    console.error(snackAddError);
    return;
  }
};

export async function fetchLikedSnacks(
  startRange: number,
  endRange: number
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data: likedSnacks, error: fetchLikedSnacksError } =
    await supabase.rpc("get_user_liked_snacks_with_range", {
      p_user_id: currentUser?.id,
      start_range: startRange,
      end_range: endRange,
    });

  if (fetchLikedSnacksError) {
    console.error(fetchLikedSnacksError);
    return null;
  }

  return likedSnacks as SnackDisplay[] | null;
}

export async function fetchUploadedSnacks(
  startRange: number,
  endRange: number
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  const { data: uploadedSnacks, error: fetchUploadedSnacksError } =
    await supabase.rpc("get_user_uploaded_snacks_with_range", {
      start_range: startRange,
      end_range: endRange,
    });
  if (fetchUploadedSnacksError) {
    console.error(fetchUploadedSnacksError);
    return null;
  }

  return uploadedSnacks as SnackDisplay[] | null;
}

export async function fetchSnacks(startRange: number, endRange: number) {
  const supabase = await createClient();

  const { data: snacks, error: fetchSnacksError } = await supabase
    .from("snacks")
    .select("snack_id, name, primary_image_url")
    .order("created_at", { ascending: false })
    .order("snack_id", { ascending: true })
    .range(startRange, endRange);

  if (fetchSnacksError) {
    console.error(fetchSnacksError);
    return null;
  }

  return snacks as SnackDisplay[] | null;
}

//#endregion

//#region { Helper functions }

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

//#endregion
