import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredientSlice";
import profileReducer from "./profileSlice";
import authReducer from "./authSlice";
import appReducer from "./appSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    ingredient: ingredientReducer,
    auth: authReducer,
    app: appReducer,
  },
});

export default store;
