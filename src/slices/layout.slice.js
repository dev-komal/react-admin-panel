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
    themeUpdate: (state, action) => {
      state.isTheme = action.payload.isTheme
    }
  },
});

export const { sidebarWidth, themeUpdate } = layoutSlice.actions;

export default layoutSlice.reducer;
