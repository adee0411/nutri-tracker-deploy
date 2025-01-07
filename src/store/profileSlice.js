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
      profileInput: {
        name: "",
        avatar: "",
        calorieGoal: "",
      },
    },
  },
  reducers: {
    showProfileModal: (state) => {
      state.UI.isProfileModalOpen = !state.UI.isProfileModalOpen;
    },
    setProfileInput: (state, action) => {
      state.UI.profileInput[action.payload.inputName] =
        action.payload.inputValue;
    },
    setProfileData: (state, action) => {
      state.profileData[action.payload.inputName] = action.payload.inputValue;
    },
  },
});

export const { showProfileModal, setProfileInput, setProfileData } =
  profileSlice.actions;

export default profileSlice.reducer;
