import { fetchSnackImagesAndLocationsTest } from "@/app/server-actions/snacks/actions";
import SnackCarousel from "@/components/snack-carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import React from "react";

const SnackPage = async ({
  params,
}: {
  params: Promise<{ snackId: string }>;
}) => {
  const snackId = parseInt((await params).snackId);
  const snackDetails = await fetchSnackImagesAndLocationsTest(snackId);

  return (
    <div className="flex mt-32 justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center">
            {snackDetails.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <SnackCarousel images_locations={snackDetails.images_locations} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SnackPage;
