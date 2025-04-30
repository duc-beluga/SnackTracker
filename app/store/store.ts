import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./dialogSlice";
import snackReducer from "./snackSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    snack: snackReducer,
    user: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
