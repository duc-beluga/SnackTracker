import { useState } from "react";
import { SnackLike } from "../interfaces/SnackInterfaces";
import {
  addSnackLike,
  removeSnackLike,
} from "../server-actions/snacks/actions";

export function useSnackLike(
  snackId: number,
  userLikeData: SnackLike | null,
  initialLikeCount: number
) {
  //#region { State }

  const [isSnackLiked, setIsSnackLiked] = useState<boolean>(
    userLikeData !== null
  );
  const [snackLikeCount, setSnackLikeCount] =
    useState<number>(initialLikeCount);
  const [userSnackLikeData, setUserSnackLikeData] = useState<SnackLike | null>(
    userLikeData
  );

  //#endregion

  //#region { Event handler }

  const onSnackLike = async () => {
    setIsSnackLiked(!isSnackLiked);
    if (isSnackLiked) {
      setSnackLikeCount(snackLikeCount - 1);
      await removeSnackLike(userSnackLikeData);
    } else {
      setSnackLikeCount(snackLikeCount + 1);
      const newLike = await addSnackLike(snackId);
      setUserSnackLikeData(newLike);
    }
  };

  //#endregion

  return {
    onSnackLike,
    isSnackLiked,
    snackLikeCount,
  };
}
