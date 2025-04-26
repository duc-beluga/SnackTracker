import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SnackDisplay } from "../interfaces/SnackInterfaces";

export interface SnackState {
  currentSelectedSnack: SnackDisplay | null;
}

const initialState: SnackState = {
  currentSelectedSnack: null,
};

export const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    setCurrentSelectedSnack: (
      state,
      action: PayloadAction<SnackDisplay | null>
    ) => {
      state.currentSelectedSnack = action.payload;
    },
  },
});

export const { setCurrentSelectedSnack } = snackSlice.actions;

export default snackSlice.reducer;
