"server only";

import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import { createClient } from "@/utils/supabase/server";

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
