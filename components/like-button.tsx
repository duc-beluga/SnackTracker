"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CookingPot } from "lucide-react";
import {
  addingLike,
  getSnacksLike,
  removingLike,
} from "@/app/server-actions/snacks/actions";
import { SnackLike } from "@/app/interfaces/SnackInterfaces";

interface LikeButtonProps {
  snack_id: number;
}

const LikeButton = ({ snack_id }: LikeButtonProps) => {
  const [isSnackLiked, setIsSnackLiked] = useState<boolean>(false);
  const [snackLikeCount, setSnackLikeCount] = useState<number>(0);
  const [userSnackLikeData, setUserSnackLikeData] = useState<SnackLike | null>(
    null
  );

  useEffect(() => {
    async function fetchLikeDate() {
      const likeData = await getSnacksLike(snack_id);
      const { userSnackLike, likeCount } = likeData;
      setUserSnackLikeData(userSnackLike);
      setIsSnackLiked(!(userSnackLike === null));
      setSnackLikeCount(likeCount);
    }
    fetchLikeDate();
  }, []);

  const handleOnClick = async () => {
    setIsSnackLiked(!isSnackLiked);
    if (isSnackLiked) {
      setSnackLikeCount(snackLikeCount - 1);
      await removingLike(userSnackLikeData);
    } else {
      setSnackLikeCount(snackLikeCount + 1);
      const newLike = await addingLike(snack_id);
      setUserSnackLikeData(newLike);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        onClick={handleOnClick}
        variant={isSnackLiked ? "default" : "outline"}
      >
        <CookingPot />
      </Button>
      <div className="flex flex-col h-full pt-1 font-bold">
        {snackLikeCount}
      </div>
    </div>
  );
};

export default LikeButton;
