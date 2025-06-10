"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUserTokens() {
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.rpc("get_user_total_coints", {
    p_user_id: currentUser?.id,
  });

  if (error) console.error(error);

  return data as number;
}

export async function getRankByTokenAmount(tokenAmount: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ranks")
    .select("rank_name, rank_icon")
    .lte("min_tokens", tokenAmount)
    .or(`max_tokens.gte.${tokenAmount},max_tokens.is.null`)
    .order("min_tokens", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching rank:", error);
    return null;
  }

  return data?.[0] ?? null;
}
