import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredientSlie";

const store = configureStore({
  reducer: {
    ingredient: ingredientReducer,
  },
});

export default store;
