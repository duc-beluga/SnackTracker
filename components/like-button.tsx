"use client";

import { Button } from "./ui/button";
import { CookingPot } from "lucide-react";
import { SnackLike } from "@/app/interfaces/SnackInterfaces";
import { useSnackLike } from "@/app/hooks/useSnackLike";

interface LikeButtonProps {
  snackId: number;
  userLikeData: SnackLike | null;
  initialLikeCount: number;
}

const LikeButton = ({
  snackId,
  userLikeData,
  initialLikeCount,
}: LikeButtonProps) => {
  const { onSnackLike, isSnackLiked, snackLikeCount } = useSnackLike(
    snackId,
    userLikeData,
    initialLikeCount
  );

  return (
    <div className="flex flex-row gap-2">
      <Button
        onClick={onSnackLike}
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
