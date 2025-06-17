import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export const uploadSnackImage = async (
  uploadImageFile: File | Blob
): Promise<string> => {
  const supabase = await createClient();

  const uniqueImageId = uuidv4();

  const { error } = await supabase.storage
    .from("snacks_pics")
    .upload(`${uniqueImageId}.png`, uploadImageFile, {
      cacheControl: "2678400",
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("snacks_pics").getPublicUrl(`${uniqueImageId}.png`);

  return publicUrl;
};
