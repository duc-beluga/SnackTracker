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
} from "../server-actions/snacks/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackDialog } from "./useSnackDialog";

import { useInView } from "react-intersection-observer";

const SNACK_PER_LOAD = 12;
const INITIAL_START_RANGE = 0;
const INITIAL_END_RANGE = SNACK_PER_LOAD - 1;

export function useSnackReels(location: Location) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [snacks, setSnacks] = useState<SnackDisplay[] | null>();
  const [selectedSnack, setSelectedSnack] = useState<SnackDisplay | null>(null);
  const [snackDetails, setSnackDetails] = useState<SnackDetails | null>();

  const [startRange, setStartRange] = useState<number>(0);
  const [endRange, setEndRange] = useState<number>(11);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { ref, inView } = useInView();

  const dialogState = useSnackDialog();

  useEffect(() => {
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
      }

      setSnacks(snacksData);
    }
    fetchInitialSnacks();
  }, []);

  useEffect(() => {
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
    fetchSnackDetails();
  }, [searchParams]);

  useEffect(() => {
    if (inView) {
      loadMoreSnacks();
    }
  }, [inView]);

  function onSnackClick(snackId: number) {
    router.push(`?snackId=${snackId}`, { scroll: false });
    if (snackId && snacks) {
      const foundSnack = snacks.find((snack) => snack.snack_id === snackId);
      if (foundSnack) {
        setSelectedSnack(foundSnack);
      }
    }
  }

  function handleModalClose() {
    dialogState.setIsDialogOpen(false);
    router.push(window.location.pathname, { scroll: false });
    setSelectedSnack(null);
    dialogState.hideNewLocationForm();
  }

  function handleDialogChange(isOpen: boolean) {
    if (!isOpen) {
      handleModalClose();
    } else {
      dialogState.setIsDialogOpen(true);
    }
  }

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
      newSnacks = (await fetchLikedSnacks(nextStartRange, nextEndRange)) ?? [];
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

  return {
    snacks,
    onSnackClick,
    selectedSnack,
    snackDetails,
    dialogState,
    handleDialogChange,
    ref,
    hasMore,
  };
}
