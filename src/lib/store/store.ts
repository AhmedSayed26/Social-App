import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type stateType = ReturnType<typeof store.getState>;
export type dispatchType = typeof store.dispatch;
