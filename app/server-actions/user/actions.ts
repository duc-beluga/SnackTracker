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
