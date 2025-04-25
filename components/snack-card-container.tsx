import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import SnackCard from "./snack-card";

interface SnackCardContainerProps {
  snacks: SnackDisplay[] | null | undefined;
  onSnackClick: (snackId: number) => void;
}

const SnackCardContainer = ({
  snacks,
  onSnackClick,
}: SnackCardContainerProps) => {
  return (
    <div className="flex gap-2 flex-wrap ml-6 mr-6">
      {snacks?.map((snack) => (
        <SnackCard
          snack={snack}
          onSnackImageClicked={onSnackClick}
          key={snack.snack_id}
        />
      ))}
    </div>
  );
};

export default SnackCardContainer;
