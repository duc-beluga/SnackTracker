"use client";

import { Location, SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import Snacks from "./snacks";
import { Alert, AlertDescription, AlertTitle, Spinner } from "@/components/ui";
import { Frown } from "lucide-react";

interface MoreSnackProps {
  location: Location;
  snacks: SnackDisplay[] | null | undefined;
  hasMore: boolean;
  ref: (node?: Element | null) => void;
}

export function MoreSnack({ snacks, hasMore, ref }: MoreSnackProps) {
  return (
    <>
      <Snacks snacks={snacks} />
      {hasMore ? (
        <div
          className="p-4 col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-4 xl:col-span-6 2xl:col-span-7"
          ref={ref}
        >
          <Spinner />
        </div>
      ) : (
        <div className="p-4 col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-4 xl:col-span-6 2xl:col-span-7">
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
}
