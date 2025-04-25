import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import SnackCard from "./snack-card";

interface SnacksProp {
  snacks: SnackDisplay[] | null | undefined;
  onSnackClick: (snackId: number) => void;
}

const Snacks = ({ snacks, onSnackClick }: SnacksProp) => {
  return (
    <>
      {snacks?.map((snack) => (
        <SnackCard
          snack={snack}
          onSnackImageClicked={onSnackClick}
          key={snack.snack_id}
        />
      ))}
    </>
  );
};

export default Snacks;
