import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { SnackBrand } from "../interfaces/SnackInterfaces";

export function useSnackBrands() {
  const [brands, setBrands] = useState<SnackBrand[] | null>(null);

  useEffect(() => {
    async function fetchSnackBrands() {
      const supabase = createClient();
      const { data } = await supabase.from("brands").select("brand_id, name");
      if (data) setBrands(data);
      console.log(data);
    }

    fetchSnackBrands();
  }, []);

  return brands;
}
