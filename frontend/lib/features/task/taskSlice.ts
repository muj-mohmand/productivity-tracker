"use client";

import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: {
      id: null,
      userId: null,
      isComplete: null,
      description: null,
      createdAt: null,
    },
  },
  reducers: {
    setStateTask: (state, action) => {
      state.task = action.payload;
    },
  },
});

export const { setStateTask } = taskSlice.actions;
export default taskSlice.reducer;
