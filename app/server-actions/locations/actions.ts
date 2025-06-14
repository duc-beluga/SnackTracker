"use server";

import { SnackCityAndState } from "@/app/interfaces/SnackInterfaces";
import { createClient } from "@/utils/supabase/server";

export async function fetchCityAndStateFrequencies(): Promise<
  SnackCityAndState[] | null
> {
  const supabase = await createClient();

  const { data: uploadedSnacks, error: fetchSnackCitiesAndStates } =
    await supabase.rpc("get_snack_counts_by_city_state");
  if (fetchSnackCitiesAndStates) {
    console.error(fetchSnackCitiesAndStates);
    return null;
  }

  return uploadedSnacks as SnackCityAndState[] | null;
}
