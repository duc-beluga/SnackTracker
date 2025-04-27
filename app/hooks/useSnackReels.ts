import { useEffect, useState } from "react";
import {
  Location,
  SnackDetails,
  SnackDisplay,
} from "../interfaces/SnackInterfaces";
import {
  fetchSnacks,
  fetchSnackImagesAndLocations,
  fetchLikedSnacks,
  fetchUploadedSnacks,
  fetchTrendingSnacks,
} from "../server-actions/snacks/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackDialog } from "./useSnackDialog";

import { useInView } from "react-intersection-observer";
import { delay } from "@/utils/utils";

//#region { Constants }

const SNACK_PER_LOAD = 12;
const INITIAL_START_RANGE = 0;
const INITIAL_END_RANGE = SNACK_PER_LOAD - 1;

//#endregion

export function useSnackReels(location: Location) {
  //#region { State }

  const [snacks, setSnacks] = useState<SnackDisplay[] | null>();
  const [selectedSnack, setSelectedSnack] = useState<SnackDisplay | null>(null);
  const [snackDetails, setSnackDetails] = useState<SnackDetails | null>();

  const [startRange, setStartRange] = useState<number>(0);
  const [endRange, setEndRange] = useState<number>(11);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  //#endregion

  //#region { Dependencies }

  const router = useRouter();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();
  const dialogState = useSnackDialog();

  //#endregion

  //#region { Effect }
  useEffect(() => {
    fetchInitialSnacks();
  }, []);

  useEffect(() => {
    fetchSnackDetails();
  }, [searchParams]);

  useEffect(() => {
    if (inView) {
      fetchMoreSnacks();
    }
  }, [inView]);

  // #endregion

  //#region { Effect Callbacks }

  async function fetchInitialSnacks() {
    let snacksData;

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
        INITIAL_END_RANGE
      );
    }

    setSnacks(snacksData);
  }

  async function fetchSnackDetails() {
    const snackIdParam = searchParams.get("snackId");
    const snackId = snackIdParam ? parseInt(snackIdParam, 10) : null;

    if (snackId === null) {
      return;
    }

    const snackDetailsData = await fetchSnackImagesAndLocations(snackId);

    if (snackDetailsData === null) {
      return;
    }

    if (selectedSnack) {
      dialogState.setIsDialogOpen(true);
    }

    setSnackDetails(snackDetailsData);
  }

  async function fetchMoreSnacks() {
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
      newSnacks = (await fetchLikedSnacks(nextStartRange, nextEndRange)) ?? [];
    } else if (location === Location.Uploaded) {
      newSnacks =
        (await fetchUploadedSnacks(nextStartRange, nextEndRange)) ?? [];
    } else {
      newSnacks =
        (await fetchTrendingSnacks(nextStartRange, nextEndRange)) ?? [];
    }
    // newSnack can be null here
    if (newSnacks.length === 0) {
      setHasMore(false);
    }
    setSnacks((prevSnacks: SnackDisplay[] | null | undefined) =>
      prevSnacks ? [...prevSnacks, ...newSnacks] : [...newSnacks]
    );
    setStartRange(nextStartRange);
    setEndRange(nextEndRange);
    setLoading(false);
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

  function onDialogVisibilityChange(isOpen: boolean) {
    if (!isOpen) {
      handleModalClose();
    } else {
      dialogState.setIsDialogOpen(true);
    }
  }

  //#endregion

  //#region { Helper functions }

  function handleModalClose() {
    console.log("Modal closing...");
    router.push(window.location.pathname, { scroll: false });
    dialogState.setIsDialogOpen(false);
    setSelectedSnack(null);
    dialogState.hideNewLocationForm();
  }

  //#endregion

  return {
    snacks,
    onSnackClick,
    selectedSnack,
    snackDetails,
    dialogState,
    onDialogVisibilityChange,
    ref,
    hasMore,
  };
}
