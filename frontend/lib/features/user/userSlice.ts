"use client";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setStateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: state => {
      state.userInfo = null;
    },
  },
});

export const { setStateUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
