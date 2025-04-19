"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CookingPot } from "lucide-react";
import {
  getSnacksLike,
  handleLikeSnackPost,
} from "@/app/server-actions/snacks/actions";

interface LikeButtonProps {
  snack_id: number;
}

const LikeButton = ({ snack_id }: LikeButtonProps) => {
  const [isSnackLiked, setIsSnackLiked] = useState<boolean>(false);
  const [snackLikeCount, setSnackLikeCount] = useState<number>(0);

  useEffect(() => {
    async function fetchLikeDate() {
      const likeData = await getSnacksLike(snack_id);
      const { isLiked, likeCount } = likeData;
      setIsSnackLiked(isLiked);
      setSnackLikeCount(likeCount);
    }
    fetchLikeDate();
  }, []);

  const handleOnClick = () => {
    handleLikeSnackPost(snack_id);
    setIsSnackLiked(!isSnackLiked);
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
