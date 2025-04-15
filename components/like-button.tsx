"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { CookingPot } from "lucide-react";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <Button
      onClick={() => setIsLiked(!isLiked)}
      variant={isLiked ? "default" : "outline"}
    >
      <CookingPot />
    </Button>
  );
};

export default LikeButton;
