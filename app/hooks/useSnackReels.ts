import { useEffect, useState } from "react";
import {
  Location,
  SnackDetails,
  SnackDisplay,
} from "../interfaces/SnackInterfaces";
import {
  fetchSnacks,
  getImagesAndLocationsBySnackId,
  getLikedSnacksData,
  getUploadedSnacksData,
} from "../server-actions/snacks/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackDialog } from "./useSnackDialog";

const INITIAL_START_RANGE = 0;
const INITIAL_END_RANGE = 11;

export function useSnackReels(location: Location) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [snacks, setSnacks] = useState<SnackDisplay[] | null>();
  const [selectedSnack, setSelectedSnack] = useState<SnackDisplay | null>(null);
  const [snackDetails, setSnackDetails] = useState<SnackDetails | null>();

  const dialogState = useSnackDialog();

  useEffect(() => {
    async function fetchInitialSnacks() {
      let snacksData;

      if (location === Location.Home) {
        snacksData = await fetchSnacks(INITIAL_START_RANGE, INITIAL_END_RANGE);
      } else if (location === Location.Liked) {
        snacksData = await getLikedSnacksData(
          INITIAL_START_RANGE,
          INITIAL_END_RANGE
        );
      } else if (location === Location.Uploaded) {
        snacksData = await getUploadedSnacksData(
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

      const snackDetailsData = await getImagesAndLocationsBySnackId(snackId);

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

  return {
    snacks,
    onSnackClick,
    selectedSnack,
    snackDetails,
    dialogState,
    handleDialogChange,
  };
}
