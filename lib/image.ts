import SupabaseClient from "@supabase/supabase-js/dist/module/SupabaseClient";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export const uploadSnackImage = async (
    uploadImageFile: File,
    supabaseClient: SupabaseClient
  ): Promise<string> => {
    const emptyString = "";

    if (!uploadImageFile) {
      toast("No file selected!");
      return emptyString;
    }

    try {
      const uniqueImageId = uuidv4();

      const { error: uploadImageError } = await supabaseClient.storage
        .from("snacks_pics")
        .upload(`${uniqueImageId}.png`, uploadImageFile);

      if (uploadImageError) {
        toast(uploadImageError.message);
        return emptyString;
      }
      const {
        data: { publicUrl },
      } = supabaseClient.storage
        .from("snacks_pics")
        .getPublicUrl(`${uniqueImageId}.png`);

      return publicUrl;
    } catch (unexpectedError) {
      toast.error(`Unexpected Error: ${unexpectedError}`);

      return emptyString;
    }
  };