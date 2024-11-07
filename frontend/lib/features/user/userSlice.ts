"use client";
import { createSlice } from "@reduxjs/toolkit";
import { userInfo } from "os";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loggedIn: false,
    isGuest: false,
  },
  reducers: {
    setStateUserInfo: (state, action) => {
      console.log("State: ", state);
      console.log("action: ", action);
      state.userInfo = action.payload;
      state.loggedIn = true;
    },
    clearUserInfo: state => {
      console.log("Clearing user info");
      state.userInfo = null;
      state.loggedIn = false;
    },
    isLoggedIn: (state, action) => {
      if (state.userInfo !== null || action.payload) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
    setIsGuest: (state, action) => {
      state.isGuest = action.payload;
    },
  },
});

export const { setStateUserInfo, clearUserInfo, isLoggedIn, setIsGuest } =
  userSlice.actions;
export default userSlice.reducer;
