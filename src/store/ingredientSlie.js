import { createSlice } from "@reduxjs/toolkit";

import TEST_INGREDIENT_LIST from "../data/TESTDATA";

import { transformNutritionData } from "../data/TESTDATA";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredientList: {
      breakfast: [],
      meal2: [],
      meal3: [],
      meal4: [],
      snack: [],
    },
    favoriteIngredients: [],
    searchResultList: [],
    selectedIngredient: null,
    UI: {
      searchQueryInput: "",
      newIngredientInput: "",
    },
  },
  reducers: {
    addIngredient: (state, action) => {
      const { mealName } = action.payload;
      const ingredientID = action.payload.ingredient.id;
      const existingIngredientIndex = state.ingredientList[mealName].findIndex(
        (ingredient) => ingredient.id === ingredientID
      );

      if (existingIngredientIndex === -1) {
        state.ingredientList[mealName].push(action.payload.ingredient);
      } else {
        // Update existing ingredient
        for (const [key, value] of Object.entries(
          action.payload.ingredient.nutritionData
        )) {
          state.ingredientList[mealName][existingIngredientIndex].nutritionData[
            key
          ] += value;
        }
        state.ingredientList[mealName][existingIngredientIndex].amount +=
          action.payload.ingredient.amount;
      }
    },

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
    setNewIngredientInput: (state, action) => {
      state.UI.newIngredientInput = action.payload;
    },
    setFavoriteIngredient: (state, action) => {
      state.favoriteIngredients.push(action.payload);
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
  setNewIngredientInput,
  setFavoriteIngredient,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
