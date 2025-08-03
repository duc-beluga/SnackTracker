"use server";

import { createClient } from "@/utils/supabase/server";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { z } from "zod";
import {
  ItemCategory,
  SnackDetail,
  SnackDisplay,
  TrendingType,
} from "../../interfaces/SnackInterfaces";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { uploadSnackImage } from "@/lib/image";
import {
  fetchDrinks,
  fetchLikedSnacks,
  fetchSnacks,
  fetchTrendingSnacks,
  fetchUploadedSnacks,
} from "@/utils/data/snacks/snacks";
import { User } from "@supabase/supabase-js";

//#region { Snack Detail Operations }

export const addSnackLocation = async (
  values: z.infer<typeof SnackLocationSchemaType>
) => {
  const snackImageUrl = await uploadSnackImage(values.image);

  const supabase = await createClient();

  const formatedAddress = formatAddress(values.location.address);

  const { error } = await supabase.rpc("add_snack_image_location", {
    snack_data: {
      snack_id: values.snackId,
    },
    location_data: {
      google_place_id: values.location.place_id,
      address: formatedAddress.address,
      city: formatedAddress.city,
      state: formatedAddress.state,
      aisle: values.aisle,
    },
    image_data: {
      image_url: snackImageUrl,
    },
  });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
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
  const snackImageUrl = await uploadSnackImage(values.image);

  const formattedAddress = formatAddress(values.location.address);

  const supabase = await createClient();

  const { error: snackAddError } = await supabase.rpc("add_snack", {
    new_snack_data: {
      name: values.name.trim(),
      brand: values.brand.trim(),
      category: values.category,
    },
    location_data: {
      google_place_id: values.location.place_id,
      address: formattedAddress.address,
      city: formattedAddress.city,
      state: formattedAddress.state,
      aisle: values.aisle,
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

export async function getLikedSnacks(
  startRange: number,
  endRange: number,
  user?: User | null
): Promise<SnackDisplay[] | null> {
  let currentUser = user;

  if (!currentUser) {
    const supabase = await createClient();
    const {
      data: { user: fetched },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !fetched) {
      // no session → bail out
      return null;
    }
    currentUser = fetched;
  }
  const likedSnacks = await fetchLikedSnacks(startRange, endRange, currentUser);

  return likedSnacks as SnackDisplay[] | null;
}

export async function getUploadedSnacks(
  startRange: number,
  endRange: number,
  user?: User | null
): Promise<SnackDisplay[] | null> {
  let currentUser = user;

  if (!currentUser) {
    const supabase = await createClient();
    const {
      data: { user: fetched },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !fetched) {
      // no session → bail out
      return null;
    }
    currentUser = fetched;
  }
  const uploadedSnacks = await fetchUploadedSnacks(
    startRange,
    endRange,
    currentUser
  );

  return uploadedSnacks as SnackDisplay[] | null;
}

export async function getSnacks(startRange: number, endRange: number) {
  if (startRange < 0 || endRange < 0) {
    throw new Error("Range values must be non-negative");
  }

  if (startRange > endRange) {
    throw new Error("Start range cannot be greater than end range");
  }

  if (endRange - startRange > 50) {
    throw new Error("Range too large, maximum 50 items");
  }

  return fetchSnacks(startRange, endRange);
}

export async function getDrinks(startRange: number, endRange: number) {
  if (startRange < 0 || endRange < 0) {
    throw new Error("Range values must be non-negative");
  }

  if (startRange > endRange) {
    throw new Error("Start range cannot be greater than end range");
  }

  if (endRange - startRange > 50) {
    throw new Error("Range too large, maximum 50 items");
  }

  return fetchDrinks(startRange, endRange);
}

export async function getTrendingSnacks(
  startRange: number,
  endRange: number,
  trendingType: TrendingType
): Promise<SnackDisplay[] | null> {
  const uploadedSnacks = await fetchTrendingSnacks(
    startRange,
    endRange,
    trendingType
  );

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

  const { data: fetchSnackDetailsData, error: fetchSnackDetailsError } =
    await supabase.rpc("get_snack_details_by_id", {
      p_snack_id: snackId,
    });
  if (fetchSnackDetailsError) {
    console.error(fetchSnackDetailsError);
    return null;
  }

  return fetchSnackDetailsData as SnackDetail | null;
}

export async function fetchSnackDetailByIds(
  snackIds: number[]
): Promise<SnackDetail[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_snack_details_by_ids", {
    p_snack_ids: snackIds,
  });
  if (error) {
    console.error(error);
    return null;
  }

  return data as SnackDetail[] | null;
}

export async function fetchSearchSnacks(
  startRange: number,
  endRange: number,
  searchQuery: string,
  category?: string
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  let query = supabase
    .from("v_snack_summary")
    .select(
      `
      snack_id,
      name,
      brand,
      primary_image_url,
      location_count,
      like_count
    `
    )
    .or(`name.wfts.${searchQuery},brand.wfts.${searchQuery}`)
    .range(startRange, endRange);

  // Map the incoming category to Supabase enum values
  if (category && category !== "all") {
    let supabaseCategory: ItemCategory;

    switch (category.toLowerCase()) {
      case "snacks":
        supabaseCategory = ItemCategory.Snack;
        break;
      case "drinks":
        supabaseCategory = ItemCategory.Drink;
        break;
      default:
        supabaseCategory = ItemCategory.Other;
        break;
    }

    query = query.eq("category", supabaseCategory);
  }

  const { data: snacks, error } = await query;

  if (error) {
    console.error("Error fetching search snacks:", error);
    return null;
  }

  return snacks as SnackDisplay[] | null;
}

export async function fetchRandomSnackId() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_random_snack_id");

  if (error || !data || data.length === 0) {
    console.error("Error fetching random snack ID:", error);
    return null;
  }
  return data;
}

export async function fetchSnackByLocation(
  startRange: number,
  endRange: number,
  city: string,
  state: string
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  let query = supabase
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
      ),
      snacks_locations!inner(
        locations!inner(
          city,
          state
        )
      )
    `
    )
    .eq("snacks_locations.locations.state", state);

  // Add city filter if provided and not empty
  if (city && city.trim() !== "") {
    query = query.eq("snacks_locations.locations.city", city);
  }

  // Apply range and execute query
  const { data: snacks, error } = await query.range(startRange, endRange);

  if (error) {
    console.error("Error fetching snacks by location:", error);
    return null;
  }

  // Format the results exactly like fetchSearchSnacks
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
      location_count: imageCount,
      like_count: totalLikes,
    };
  });

  return formattedSnacks as SnackDisplay[] | null;
}

//#endregion

//#region { Helper functions }

function formatAddress(description: string) {
  // Split by commas and trim whitespace
  const parts = description.split(",").map((part) => part.trim());

  // Remove the last element (USA)
  const withoutUSA = parts.slice(0, -1);

  const state = withoutUSA[withoutUSA.length - 1] || "";
  const city = withoutUSA[withoutUSA.length - 2] || "";
  const address =
    withoutUSA.length > 2 ? withoutUSA.slice(0, -2).join(", ") : "";

  return {
    address,
    city,
    state,
  };
}

//#endregion
