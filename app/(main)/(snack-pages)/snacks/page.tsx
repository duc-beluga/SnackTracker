import React from "react";

import {
  getSnackData,
  getSnackLocationsAndImages,
} from "@/app/server-actions/snacks/actions";

import SnackDialog from "@/components/snack-dialog";
import SnackCard from "@/components/snack-card";

const SnackPage = async () => {
  const displaySnack = await getSnackData();

  const snackIdToImageLocationMap = await getSnackLocationsAndImages();

  return (
    // TODO: Find a way to center this wrap flex
    <div className="flex flex-col gap-3">
      <div className="flex justify-start pl-8 pt-4">
        <h1 className="text-3xl font-bold">Discover</h1>
      </div>
      <div className="flex gap-2 flex-wrap ml-6 mr-6">
        {/* <div>
        <h1>Discover</h1>
        </div> */}
        {displaySnack?.map((snack) => (
          <SnackCard snack={snack} key={snack.snack_id}>
            <SnackDialog
              snack={snack}
              snackToImageLocationMap={
                snackIdToImageLocationMap?.[snack.snack_id] || []
              }
            />
          </SnackCard>
        ))}
      </div>
    </div>
  );
};

export default SnackPage;
