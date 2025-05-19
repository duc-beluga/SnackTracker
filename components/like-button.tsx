"use client";

import { Button } from "@/components/ui";
import { ChevronUp } from "lucide-react";
import { SnackLike } from "@/app/interfaces/SnackInterfaces";
import { useSnackLike } from "@/app/hooks/useSnackLike";
import LikeButtonSkeleton from "./skeletons/like-button-skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface LikeButtonProps {
  snackId: number;
  userLikeData: SnackLike | null | undefined;
  initialLikeCount: number | undefined;
}

const LikeButton = ({
  snackId,
  userLikeData,
  initialLikeCount,
}: LikeButtonProps) => {
  // Move all hooks to the top level - before any conditional returns
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  // Only call useSnackLike if we have the required data, but use null values if not
  const { onSnackLike, isSnackLiked, snackLikeCount } = useSnackLike(
    snackId,
    userLikeData !== undefined ? userLikeData : null,
    initialLikeCount !== undefined ? initialLikeCount : 0,
    currentUser
  );

  // Now handle conditional rendering after all hooks have been called
  if (userLikeData === undefined || initialLikeCount === undefined) {
    return <LikeButtonSkeleton />;
  }

  return (
    <div className="flex flex-row gap-2">
      {currentUser ? (
        <Button
          onClick={onSnackLike}
          variant={isSnackLiked ? "default" : "outline"}
        >
          <ChevronUp />
        </Button>
      ) : (
        <Button variant={"outline"}>
          <ChevronUp />
        </Button>
      )}
      <div className="flex flex-col h-full pt-1 font-bold">
        {snackLikeCount}
      </div>
    </div>
  );
};

export default LikeButton;
