"use client";

import {
  addSnackLikeTest,
  removeSnackLikeTest,
} from "@/app/server-actions/snacks/actions";
import { Heart } from "lucide-react";
import React, { useState } from "react";

type LikeButtonTestProps = {
  like_count: number;
  like_id: number | null;
  image_location_id: number;
};

export default function LikeButtonTest({
  like_count,
  like_id,
  image_location_id,
}: LikeButtonTestProps) {
  const [isLiked, setIsLiked] = useState<boolean>(like_id ? true : false);
  const [likeCount, setLikeCount] = useState<number>(like_count);

  async function handleLiked() {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount(likeCount - 1);
      await removeSnackLikeTest(image_location_id);
    } else {
      setLikeCount(likeCount + 1);
      await addSnackLikeTest(image_location_id);
    }
  }

  return (
    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm bg-black/40 shadow-md group">
      <div
        className="text-white h-7 w-7 p-1 cursor-pointer flex items-center justify-center"
        role="button"
        aria-label="Like"
      >
        <Heart
          size={20}
          fill={`${isLiked ? "white" : "none"}`}
          onClick={handleLiked}
        />
      </div>

      <span className="text-white text-sm font-medium">{likeCount}</span>
    </div>
  );
}
