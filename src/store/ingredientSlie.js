import { createSlice } from "@reduxjs/toolkit";

import TEST_INGREDIENT_LIST from "../data/TESTDATA";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredientList: TEST_INGREDIENT_LIST,
  },
  reducers: {
    addIngredient: () => {},
  },
});

export default ingredientSlice.reducer;
