import { useState, useEffect } from "react";
import { SnackLike } from "../interfaces/SnackInterfaces";
import {
  addSnackLike,
  removeSnackLike,
} from "../server-actions/snacks/actions";
import { User } from "@supabase/supabase-js";

export function useSnackLike(
  snackId: number,
  userLikeData: SnackLike | null,
  initialLikeCount: number,
  currentUser: User | null
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

  // Update state when props change
  useEffect(() => {
    setIsSnackLiked(userLikeData !== null);
    setUserSnackLikeData(userLikeData);
  }, [userLikeData]);

  // Update like count when initialLikeCount changes
  useEffect(() => {
    setSnackLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  //#region { Event handler }

  const onSnackLike = async () => {
    if (!currentUser) {
      return;
    }
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
