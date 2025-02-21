import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: {
      name: null,
      calorieGoal: null,
      avatar: null,
    },
    dietData: {
      currentCalorie: null,
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
