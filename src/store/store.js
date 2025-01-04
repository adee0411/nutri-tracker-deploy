import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredientSlice";

const store = configureStore({
  reducer: {
    ingredient: ingredientReducer,
  },
});

export default store;
