import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    UI: {
      isMenuOpen: false,
    },
  },
  reducers: {
    setIsMenuOpen: (state, action) => {
      state.UI.isMenuOpen = action.payload;
    },
  },
});

export const { setIsMenuOpen } = appSlice.actions;

export default appSlice.reducer;
