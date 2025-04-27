"use client";

import { Location, SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import Snacks from "./snacks";
import Spinner from "./ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Frown } from "lucide-react";

interface MoreSnackProps {
  location: Location;
  onSnackClick: (snackId: number) => void;
  snacks: SnackDisplay[] | null | undefined;
  hasMore: boolean;
  ref: (node?: Element | null) => void;
}

const MoreSnack = ({ onSnackClick, snacks, hasMore, ref }: MoreSnackProps) => {
  return (
    <>
      <Snacks snacks={snacks} onSnackClick={onSnackClick} />
      {hasMore ? (
        <div
          className="p-4 col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-4 xl:col-span-6"
          ref={ref}
        >
          <Spinner />
        </div>
      ) : (
        <div className="p-4 col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-4 xl:col-span-6">
          <Alert>
            <Frown className="h-4 w-4" />
            <AlertTitle>Uh oh!</AlertTitle>
            <AlertDescription>
              You have reached the end of the feed.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default MoreSnack;
