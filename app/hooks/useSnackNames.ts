// hooks/useSnacks.ts
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { SnackName } from "../interfaces/SnackInterfaces";

export function useSnackNames() {
  const [names, setNames] = useState<SnackName[] | null>(null);

  useEffect(() => {
    async function fetchSnackNames() {
      const supabase = createClient();
      const { data } = await supabase
        .from("v_snack_summary")
        .select("name, snack_id, brand");
      if (data) setNames(data);
    }

    fetchSnackNames();
  }, []);

  return names;
}
