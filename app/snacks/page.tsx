import React from "react";
import { createClient } from "@/utils/supabase/server";

import { SnackDisplay, SnackImageBasic } from "../interfaces/SnackInterfaces";

import SnackDialog from "@/components/snack-dialog";

interface SnackImage {
  snack_id: number;
  image_id: number;
  image_url: string;
}

const SnackPage = async () => {
  const supabase = await createClient();

  const { data: displaySnack }: { data: SnackDisplay[] | null } = await supabase
    .from("snacks")
    .select("snack_id, name, primary_image_url");

  const { data: snackImages }: { data: SnackImage[] | null } = await supabase
    .from("snack_images")
    .select("snack_id, image_id, image_url")
    .order("upload_date", { ascending: true });

  type AccumulatorType = Record<number, SnackImageBasic[]>;

  const snackToImageMapping = snackImages?.reduce<AccumulatorType>(
    (snackImagesById, item) => {
      const snackId: number = item.snack_id;
      const snackImageId: number = item.image_id;
      const snackImageUrl: string = item.image_url;

      if (!snackImagesById[snackId]) {
        snackImagesById[snackId] = [];
      }

      snackImagesById[snackId].push({
        image_id: snackImageId,
        image_url: snackImageUrl,
      });

      return snackImagesById;
    },
    {} as AccumulatorType
  );

  return (
    <div className="flex gap-2 flex-wrap">
      {displaySnack?.map((snack) => (
        <SnackDialog
          snack={snack}
          snackImages={snackToImageMapping?.[snack.snack_id] || []}
          key={snack.snack_id}
        />
      ))}
    </div>
  );
};

export default SnackPage;
