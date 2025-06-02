"use server";

import { createClient } from "@/utils/supabase/server";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { SnackDetail, SnackDisplay } from "../../interfaces/SnackInterfaces";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";

const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

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

export async function addSnackLikeTest(imageLocationId: number) {
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("likes")
    .insert({ image_location_id: imageLocationId, user_id: currentUser?.id });

  if (error) {
    console.error("Error adding like:", error);
    throw error;
  }
}

export async function removeSnackLikeTest(imageLocationId: number) {
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("image_location_id", imageLocationId)
    .eq("user_id", currentUser?.id);

  if (error) {
    console.error("Error removing like:", error);
    throw error;
  }
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
    .select(
      `
      snack_id,
      name,
      primary_image_url,
      snack_images(
        image_id,
        images_locations(
          image_location_id,
          likes(count)
        )
      )
    `
    )
    .order("created_at", { ascending: false })
    .order("snack_id", { ascending: true })
    .range(startRange, endRange);

  if (fetchSnacksError) {
    console.error(fetchSnacksError);
    return null;
  }

  const formattedSnacks = snacks?.map((snack) => {
    let totalLikes = 0;
    const imageCount = snack.snack_images?.length ?? 0;

    // Count total likes
    snack.snack_images?.forEach((image) => {
      image.images_locations?.forEach((location) => {
        const likesCount = location.likes?.[0]?.count ?? 0;
        totalLikes += likesCount;
      });
    });

    return {
      snack_id: snack.snack_id,
      name: snack.name,
      primary_image_url: snack.primary_image_url,
      image_count: imageCount,
      like_count: totalLikes,
    };
  });

  return formattedSnacks as SnackDisplay[] | null;
}

export async function fetchTrendingSnacks(
  startRange: number,
  endRange: number,
  days_back: "7days" | "1month" | "all"
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  // Convert days_back string to integer
  const daysBackMap: Record<typeof days_back, number> = {
    "7days": 7,
    "1month": 30, // Approximate 1 month as 30 days
    all: 9999, // Or another large number to indicate 'all'
  };

  const daysBackInt = daysBackMap[days_back];

  const { data: uploadedSnacks, error: fetchTrendingSnacksError } =
    await supabase.rpc("get_trending_snacks_by_time", {
      start_range: startRange,
      end_range: endRange,
      days_back: daysBackInt,
    });

  if (fetchTrendingSnacksError) {
    console.error(fetchTrendingSnacksError);
    return null;
  }

  return uploadedSnacks as SnackDisplay[] | null;
}

export async function fetchSnackIds(): Promise<number[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("snacks").select("snack_id");

  if (error) throw error;

  return data?.map((row) => row.snack_id) ?? null;
}

export async function fetchSnackDetail(
  snackId: number
): Promise<SnackDetail | null> {
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  let currentUserId;

  if (!currentUser?.id) {
    currentUserId = EMPTY_GUID;
  } else {
    currentUserId = currentUser.id;
  }

  const { data: fetchSnackDetailsData, error: fetchSnackDetailsError } =
    await supabase.rpc("get_snack_details_by_id_v3", {
      p_snack_id: snackId,
      p_user_id: currentUserId,
    });
  if (fetchSnackDetailsError) {
    console.error(fetchSnackDetailsError);
    return null;
  }

  return fetchSnackDetailsData as SnackDetail | null;
}

export async function fetchSearchSnacks(
  startRange: number,
  endRange: number,
  searchQuery: string
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  console.log("fetchSearchSnacks");

  const { data: snacks, error } = await supabase
    .from("snacks")
    .select(
      `
      snack_id,
      name,
      primary_image_url,
      snack_images(
        image_id,
        images_locations(
          image_location_id,
          likes(count)
        )
      )
    `
    )
    .textSearch("name", searchQuery, { type: "websearch", config: "english" })
    .range(startRange, endRange);

  if (error) {
    console.error("Error fetching search snacks:", error);
    return null;
  }

  const formattedSnacks = snacks?.map((snack) => {
    let totalLikes = 0;
    const imageCount = snack.snack_images?.length ?? 0;

    snack.snack_images?.forEach((image) => {
      image.images_locations?.forEach((location) => {
        const likesCount = location.likes?.[0]?.count ?? 0;
        totalLikes += likesCount;
      });
    });

    return {
      snack_id: snack.snack_id,
      name: snack.name,
      primary_image_url: snack.primary_image_url,
      image_count: imageCount,
      like_count: totalLikes,
    };
  });

  return formattedSnacks as SnackDisplay[] | null;
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
      .upload(`${uniqueImageId}.png`, uploadImageFile, {
        cacheControl: "2678400",
        upsert: false,
      });

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
