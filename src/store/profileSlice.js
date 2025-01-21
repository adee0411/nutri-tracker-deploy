import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: {
      name: "Ádám",
      calorieGoal: 2200,
      avatar: "man",
    },
    dietData: {
      currentCalorie: 2000,
    },
    UI: {
      isProfileModalOpen: false,
    },
  },
  reducers: {
    setProfile: (state, action) => {
      state.profileData = action.payload;
    },
    toggleProfileModal: (state) => {
      state.UI.isProfileModalOpen = !state.UI.isProfileModalOpen;
    },
    setProfileData: (state, action) => {
      state.profileData[action.payload.inputName] = action.payload.inputValue;
    },
  },
});

export const { setProfile, toggleProfileModal, setProfileData } =
  profileSlice.actions;

export default profileSlice.reducer;
