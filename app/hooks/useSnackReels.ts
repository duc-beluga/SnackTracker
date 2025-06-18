import { useEffect, useState } from "react";
import { Location, SnackDisplay } from "../interfaces/SnackInterfaces";
import {
  fetchSnacks,
  fetchLikedSnacks,
  fetchUploadedSnacks,
  fetchTrendingSnacks,
  fetchSearchSnacks,
  fetchSnackByLocation,
  fetchSnackDetail,
} from "../server-actions/snacks/actions";
import { useRouter } from "next/navigation";

import { useInView } from "react-intersection-observer";
import { delay } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import { encodeId } from "@/utils/hashids";

//#region { Constants }

const SNACK_PER_LOAD = 12;
const INITIAL_START_RANGE = 0;
const INITIAL_END_RANGE = SNACK_PER_LOAD - 1;

//#endregion

export function useSnackReels(
  location: Location,
  timeRange?: "7days" | "1month" | "all",
  searchString?: string,
  state?: string,
  city?: string
) {
  //#region { State }

  const [snacks, setSnacks] = useState<SnackDisplay[] | null>();
  const [selectedSnack, setSelectedSnack] = useState<SnackDisplay | null>(null);

  const [startRange, setStartRange] = useState<number>(0);
  const [endRange, setEndRange] = useState<number>(11);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNone, setHasNone] = useState<boolean>(false);

  //#endregion

  //#region { Dependencies }

  const router = useRouter();
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  //#endregion

  //#region { Effect }
  useEffect(() => {
    fetchInitialSnacks();
  }, [location, timeRange, searchString]);

  useEffect(() => {
    fetchInitialSnacks();
  }, [state, city]);

  useEffect(() => {
    if (inView) {
      fetchMoreSnacks();
    }
  }, [inView]);

  // #endregion

  //#region { Effect Callbacks }

  async function fetchInitialSnacks() {
    setSnacks([]);
    setStartRange(INITIAL_START_RANGE);
    setEndRange(INITIAL_END_RANGE);
    setHasMore(true);
    setLoading(false);
    setHasNone(false);

    let snacksData: SnackDisplay[] | null;

    if (location === Location.Home) {
      snacksData = await fetchSnacks(INITIAL_START_RANGE, INITIAL_END_RANGE);
    } else if (location === Location.Liked) {
      snacksData = await fetchLikedSnacks(
        INITIAL_START_RANGE,
        INITIAL_END_RANGE
      );
    } else if (location === Location.Uploaded) {
      snacksData = await fetchUploadedSnacks(
        INITIAL_START_RANGE,
        INITIAL_END_RANGE
      );
    } else if (location === Location.Trending) {
      snacksData = await fetchTrendingSnacks(
        INITIAL_START_RANGE,
        INITIAL_END_RANGE,
        timeRange ?? "all"
      );
    } else if (location === Location.Search) {
      const query = searchString?.trim() ?? "";
      snacksData = !query
        ? await fetchSnacks(INITIAL_START_RANGE, INITIAL_END_RANGE)
        : await fetchSearchSnacks(
            INITIAL_START_RANGE,
            INITIAL_END_RANGE,
            query
          );
    } else if (location === Location.Location) {
      if (!state) {
        snacksData = [];
      } else {
        snacksData = await fetchSnackByLocation(
          INITIAL_START_RANGE,
          INITIAL_END_RANGE,
          city ?? "",
          state
        );
      }
    } else {
      snacksData = [];
    }

    if (!snacksData || snacksData.length === 0) {
      setHasNone(true);
    } else if (snacksData.length < SNACK_PER_LOAD) {
      setHasMore(false);
    }

    setSnacks(snacksData);
    if (snacksData) {
      prefetchSnackDetails(snacksData);
    }
  }

  async function fetchMoreSnacks() {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    await delay(2000);
    const nextStartRange = startRange + SNACK_PER_LOAD;
    const nextEndRange = endRange + SNACK_PER_LOAD;

    let newSnacks: SnackDisplay[] | null;

    if (location === Location.Home) {
      newSnacks = (await fetchSnacks(nextStartRange, nextEndRange)) ?? [];
    } else if (location === Location.Liked) {
      newSnacks = (await fetchLikedSnacks(nextStartRange, nextEndRange)) ?? [];
    } else if (location === Location.Uploaded) {
      newSnacks =
        (await fetchUploadedSnacks(nextStartRange, nextEndRange)) ?? [];
    } else if (location === Location.Trending) {
      newSnacks =
        (await fetchTrendingSnacks(
          nextStartRange,
          nextEndRange,
          timeRange ?? "all"
        )) ?? [];
    } else if (location === Location.Search) {
      const query = searchString?.trim() ?? "";
      newSnacks =
        (!query
          ? await fetchSnacks(nextStartRange, nextEndRange)
          : await fetchSearchSnacks(nextStartRange, nextEndRange, query)) ?? [];
    } else {
      if (!city || !state) {
        newSnacks = [];
      } else {
        newSnacks =
          (await fetchSnackByLocation(
            nextStartRange,
            nextEndRange,
            city,
            state
          )) ?? [];
      }
    }

    // newSnack can be null here
    if (newSnacks.length === 0 || newSnacks.length < SNACK_PER_LOAD) {
      setHasMore(false);
    }
    setSnacks((prevSnacks: SnackDisplay[] | null | undefined) =>
      prevSnacks ? [...prevSnacks, ...newSnacks] : [...newSnacks]
    );
    setStartRange(nextStartRange);
    setEndRange(nextEndRange);
    setLoading(false);

    prefetchSnackDetails(newSnacks);
  }

  //#endregion

  //#region { Event handler }

  function onSnackClick(snackId: number) {
    router.push(`?snackId=${snackId}`, { scroll: false });
    if (snackId && snacks) {
      const foundSnack = snacks.find((snack) => snack.snack_id === snackId);
      if (foundSnack) {
        setSelectedSnack(foundSnack);
      }
    }
  }

  function prefetchSnackDetails(snacks: SnackDisplay[]) {
    for (const snack of snacks) {
      queryClient.prefetchQuery({
        queryKey: ["snackDetail", encodeId(snack.snack_id)],
        queryFn: async () => {
          return await fetchSnackDetail(snack.snack_id);
        },
        staleTime: 5 * 60 * 1000,
      });
    }
  }

  //#endregion

  //#region { Helper functions }

  //#endregion

  return {
    snacks,
    onSnackClick,
    selectedSnack,
    ref,
    hasMore,
    hasNone,
  };
}
