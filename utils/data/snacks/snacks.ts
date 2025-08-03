"server only";

import { SnackDisplay, TrendingType } from "@/app/interfaces/SnackInterfaces";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function fetchSnacks(
  startRange: number,
  endRange: number
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_snacks_in_range", {
    start_range: startRange,
    end_range: endRange,
  });

  if (error) {
    console.error(error);
    return null;
  }
  return data as SnackDisplay[] | null;
}

export async function fetchDrinks(
  startRange: number,
  endRange: number
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_drinks_in_range", {
    start_range: startRange,
    end_range: endRange,
  });

  if (error) {
    console.error(error);
    return null;
  }
  return data as SnackDisplay[] | null;
}

export async function fetchUploadedSnacks(
  startRange: number,
  endRange: number,
  user: User | null
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "get_user_uploaded_snacks_in_range",
    {
      p_user_id: user?.id,
      start_range: startRange,
      end_range: endRange,
    }
  );

  if (error) {
    console.error(error);
    return null;
  }

  return data as SnackDisplay[] | null;
}

export async function fetchLikedSnacks(
  startRange: number,
  endRange: number,
  user: User | null
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_user_liked_snacks_in_range", {
    p_user_id: user?.id,
    start_range: startRange,
    end_range: endRange,
  });
  if (error) {
    console.error(error);
    return null;
  }
  return data as SnackDisplay[] | null;
}

export async function fetchTrendingSnacks(
  startRange: number,
  endRange: number,
  trendingType: TrendingType
): Promise<SnackDisplay[] | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    "get_trending_snacks_by_time_range",
    {
      start_range: startRange,
      end_range: endRange,
      days_back: trendingType,
    }
  );
  if (error) {
    console.error(error);
    return null;
  }
  return data as SnackDisplay[] | null;
}
