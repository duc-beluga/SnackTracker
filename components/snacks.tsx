import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import React from "react";
import { SnackCard } from "./snack-card";

interface SnacksProp {
  snacks: SnackDisplay[] | null | undefined;
}

export function Snacks({ snacks }: SnacksProp) {
  return (
    <>
      {snacks?.map((snack) => <SnackCard snack={snack} key={snack.snack_id} />)}
    </>
  );
}
