import React from "react";
import { createClient } from "@/utils/supabase/server";

import {
  SnackDisplay,
  SnackImageLocationVal,
} from "../interfaces/SnackInterfaces";

import SnackDialog from "@/components/snack-dialog";
import SnackCard from "@/components/snack-card";

interface SnackImageLocation {
  snack_id: number;
  image_location_id: number;
  image_url: string;
  snack_address: string;
}

const SnackPage = async () => {
  const supabase = await createClient();

  const { data: displaySnack }: { data: SnackDisplay[] | null } = await supabase
    .from("snacks")
    .select("snack_id, name, primary_image_url");

  const { data: snackLocationImages }: { data: SnackImageLocation[] | null } =
    await supabase.rpc("get_snack_images_with_locations");

  type AccumulatorType = Record<number, SnackImageLocationVal[]>;

  const snackToImageLocationMapping =
    snackLocationImages?.reduce<AccumulatorType>((snackImagesById, item) => {
      const snackId: number = item.snack_id;
      const imageLocationId: number = item.image_location_id;
      const imageUrl: string = item.image_url;
      const snackAddress: string = item.snack_address;

      if (!snackImagesById[snackId]) {
        snackImagesById[snackId] = [];
      }

      snackImagesById[snackId].push({
        image_location_id: imageLocationId,
        image_url: imageUrl,
        snack_address: snackAddress,
      });

      return snackImagesById;
    }, {} as AccumulatorType);

  return (
    <div className="flex gap-2 flex-wrap">
      {displaySnack?.map((snack) => (
        <SnackCard snack={snack} key={snack.snack_id}>
          <SnackDialog
            snack={snack}
            snackImages={snackToImageLocationMapping?.[snack.snack_id] || []}
          />
        </SnackCard>
      ))}
    </div>
  );
};

export default SnackPage;
