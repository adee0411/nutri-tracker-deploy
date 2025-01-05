import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredientSlice";
import profileReducer from "./profileSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    ingredient: ingredientReducer,
  },
});

export default store;
