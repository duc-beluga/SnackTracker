"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { CookingPot } from "lucide-react";
import { addingLike, removingLike } from "@/app/server-actions/snacks/actions";
import { SnackLike } from "@/app/interfaces/SnackInterfaces";

interface LikeButtonProps {
  snack_id: number;
  like_data: SnackLike | null;
  like_count: number;
}

const LikeButton = ({ snack_id, like_data, like_count }: LikeButtonProps) => {
  const [isSnackLiked, setIsSnackLiked] = useState<boolean>(like_data !== null);
  const [snackLikeCount, setSnackLikeCount] = useState<number>(like_count);
  const [userSnackLikeData, setUserSnackLikeData] = useState<SnackLike | null>(
    like_data
  );

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
