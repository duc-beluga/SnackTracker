"use server"

import { createClient } from "@/utils/supabase/server";

export const getSnackNames = async () : Promise<string[] | null> => {
    const supabase = await createClient();
    
    const { data: snackNames }: { data: string[] | null } = await supabase
        .from("snacks")
        .select("snack_id, name, primary_image_url");
        
    return snackNames
}