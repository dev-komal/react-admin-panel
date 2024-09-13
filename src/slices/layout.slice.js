import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "auth",
  initialState: {
    sidebarWidth: 0,
  },
  reducers: {
    sidebarWidth: (state, action) => {
      state.sidebarWidth = action.payload.width;
    },
  },
});

export const { sidebarWidth } = layoutSlice.actions;

export default layoutSlice.reducer;
