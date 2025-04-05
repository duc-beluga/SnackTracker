import React from "react";

import {
  getSnackData,
  getSnackLocationsAndImages,
} from "../../server-actions/snacks/actions";

import SnackDialog from "@/components/snack-dialog";
import SnackCard from "@/components/snack-card";

const SnackPage = async () => {
  const displaySnack = await getSnackData();

  const snackToImageLocationMap = await getSnackLocationsAndImages();

  return (
    <div className="flex gap-2 flex-wrap">
      {displaySnack?.map((snack) => (
        <SnackCard snack={snack} key={snack.snack_id}>
          <SnackDialog
            snack={snack}
            snackToImageLocationMap={
              snackToImageLocationMap?.[snack.snack_id] || []
            }
          />
        </SnackCard>
      ))}
    </div>
  );
};

export default SnackPage;
