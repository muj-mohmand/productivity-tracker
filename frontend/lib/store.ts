"use client";
import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../lib/features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: useReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];