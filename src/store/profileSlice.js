import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: {
      name: "Ádám",
      calorieGoal: 2500,
      avatar: "man",
    },
    UI: {
      isProfileModalOpen: true,
    },
  },
  reducers: {
    showProfileModal: (state, action) => {
      state.UI.isProfileModalOpen = !state.UI.isProfileModalOpen;
    },
  },
});

export const { showProfileModal } = profileSlice.actions;

export default profileSlice.reducer;
