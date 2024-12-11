import { createSlice } from "@reduxjs/toolkit";

import TEST_INGREDIENT_LIST from "../data/TESTDATA";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredientList: TEST_INGREDIENT_LIST,
  },
  reducers: {
    addIngredient: () => {},
    removeIngredient: (state, action) => {
      const mealName = action.payload.mealName;
      const ingredientID = action.payload.ingredientID;

      state.ingredientList[mealName] = state.ingredientList[mealName].filter(
        (ingredient) => ingredient.id !== ingredientID
      );
    },
  },
});

export const { removeIngredient, addIngredient } = ingredientSlice.actions;

export default ingredientSlice.reducer;
