"use client";
import { useState } from "react";

export const useSnackDialog = () => {
  //#region { State }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewLocationSelected, setIsNewLocationSelected] = useState(false);

  //#endregion

  const showNewLocationForm = () => setIsNewLocationSelected(true);
  const hideNewLocationForm = () =>
    setTimeout(() => setIsNewLocationSelected(false), 200);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    hideNewLocationForm();
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    isNewLocationSelected,
    setIsNewLocationSelected,
    openDialog,
    closeDialog,
    showNewLocationForm,
    hideNewLocationForm,
    setIsDialogOpen,
  };
};

export type SnackDialogState = ReturnType<typeof useSnackDialog>;
