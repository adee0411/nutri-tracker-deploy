import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredientSlice";
import profileReducer from "./profileSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    ingredient: ingredientReducer,
    auth: authReducer,
  },
});

export default store;
