"use client";
import { createSlice } from "@reduxjs/toolkit";
import { userInfo } from "os";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loggedIn: false,
  },
  reducers: {
    setStateUserInfo: (state, action) => {
      console.log("State: ", state);
      console.log("action: ", action);
      state.userInfo = action.payload;
    },
    clearUserInfo: state => {
      console.log("Clearing user info");
      state.userInfo = null;
    },
    isLoggedIn: (state, action) => {
      if (state.userInfo !== null || action.payload) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
  },
});

export const { setStateUserInfo, clearUserInfo, isLoggedIn } =
  userSlice.actions;
export default userSlice.reducer;
