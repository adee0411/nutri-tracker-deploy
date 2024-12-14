import { createSlice } from "@reduxjs/toolkit";

import TEST_INGREDIENT_LIST from "../data/TESTDATA";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredientList: TEST_INGREDIENT_LIST,
    searchResultList: [],
    selectedIngredient: null,
    UI: {
      searchQueryInput: "",
    },
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
    emptyIngredientList: (state, action) => {
      const mealName = action.payload;
      state.ingredientList[mealName].length = 0;
    },
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    setSearchQueryInput: (state, action) => {
      state.UI.searchQueryInput = action.payload;
    },
    setSearchResultList: (state, action) => {
      state.searchResultList = action.payload;
    },
    getSelectedIngredient: (state) => {
      return state.searchResultList.filter(
        (result) => result.id === state.selectedIngredient
      );
    },
  },
});

export const {
  removeIngredient,
  addIngredient,
  emptyIngredientList,
  setSelectedIngredient,
  setSearchQueryInput,
  setSearchResultList,
  getSelectedIngredient,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
