import React from "react";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const LikeButtonSkeleton = () => {
  return (
    <div className="flex flex-row gap-2">
      <Button variant="outline">
        <ChevronUp />
      </Button>
      <Skeleton className="w-4 h-9" />
    </div>
  );
};

export default LikeButtonSkeleton;
