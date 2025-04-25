"use client";

import { Location, SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import {
  fetchSnacks,
  fetchLikedSnacks,
  fetchUploadedSnacks,
} from "@/app/server-actions/snacks/actions";
import Snacks from "./snacks";
import Spinner from "./ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Frown, Terminal } from "lucide-react";

interface MoreSnackProps {
  location: Location;
  onSnackClick: (snackId: number) => void;
}

const SNACK_PER_LOAD = 12;

const MoreSnack = ({ onSnackClick, location }: MoreSnackProps) => {
  const [snacks, setSnacks] = useState<SnackDisplay[] | null>();
  const [startRange, setStartRange] = useState<number>(0);
  const [endRange, setEndRange] = useState<number>(11);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreSnacks = async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    await delay(2000);
    const nextStartRange = startRange + SNACK_PER_LOAD;
    const nextEndRange = endRange + SNACK_PER_LOAD;

    let newSnacks: SnackDisplay[];
    if (location === Location.Home) {
      newSnacks = (await fetchSnacks(nextStartRange, nextEndRange)) ?? [];
    } else if (location === Location.Liked) {
      const { data } =
        (await fetchLikedSnacks(nextStartRange, nextEndRange)) ?? [];

      newSnacks = data ?? [];
    } else {
      newSnacks =
        (await fetchUploadedSnacks(nextStartRange, nextEndRange)) ?? [];
    }
    if (newSnacks.length === 0) {
      setHasMore(false);
    }
    setSnacks((prevSnacks: SnackDisplay[] | null | undefined) =>
      prevSnacks ? [...prevSnacks, ...newSnacks] : [...newSnacks]
    );
    setStartRange(nextStartRange);
    setEndRange(nextEndRange);
    setLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMoreSnacks();
    }
  }, [inView]);

  return (
    <>
      <Snacks snacks={snacks} onSnackClick={onSnackClick} />
      {hasMore ? (
        <div
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-6"
          ref={ref}
        >
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-3 md:col-span-6">
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
