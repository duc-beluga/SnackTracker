// hooks/useSnacks.ts
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { SnackName } from "../interfaces/SnackInterfaces";

export function useSnackNames() {
  const [names, setNames] = useState<SnackName[] | null>(null);

  useEffect(() => {
    async function fetchSnacks() {
      const supabase = createClient();
      const { data } = await supabase.from("snacks").select("name, snack_id");
      if (data) setNames(data);
    }

    fetchSnacks();
  }, []);

  return names;
}
