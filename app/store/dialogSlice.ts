import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DialogState {
  isDialogOpen: boolean;
  isNewLocationSelected: boolean;
}

const initialState: DialogState = {
  isDialogOpen: false,
  isNewLocationSelected: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
    },
    setIsDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
    setIsNewLocationSelected: (state, action: PayloadAction<boolean>) => {
      state.isNewLocationSelected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openDialog,
  closeDialog,
  setIsDialogOpen,
  setIsNewLocationSelected,
} = dialogSlice.actions;

export default dialogSlice.reducer;
