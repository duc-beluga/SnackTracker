import {
  fetchRandomSnackId,
  fetchSnackDetail,
} from "@/app/server-actions/snacks/actions";
import { LinkLink } from "@/components/link-link";
import { SnackCarousel } from "@/components/snack-carousel";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { encodeId } from "@/utils/hashids";
import { Dice5 } from "lucide-react";
import React from "react";

export default async function SnackPage({
  params,
}: {
  params: Promise<{ snackId: string }>;
}) {
  const snackId = (await params).snackId;
  const snackDetails = await fetchSnackDetail(snackId);
  const randomSnackId = await fetchRandomSnackId();
  const encodedSnackId = encodeId(randomSnackId);

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col mt-10 item justify-center gap-10 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center">
              {snackDetails?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <SnackCarousel images_locations={snackDetails?.images_locations} />
          </CardContent>
        </Card>
        {/* This by pass route-intercept but require a full page reload.
            Might need alternative solutions.
        */}
        <LinkLink redirectType={"hard"} href={`/snacks/${encodedSnackId}`}>
          <Button className="w-full">
            Try Another <Dice5 />
          </Button>
        </LinkLink>
      </div>
    </div>
  );
}
