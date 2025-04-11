"use client";
import { useState } from "react";

export const useSnackDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewLocationSelected, setIsNewLocationSelected] = useState(false);

  const showNewLocationForm = () => setIsNewLocationSelected(true);
  const hideNewLocationForm = () =>
    setTimeout(() => setIsNewLocationSelected(false), 200);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    hideNewLocationForm();
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
