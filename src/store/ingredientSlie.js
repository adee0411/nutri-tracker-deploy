import { createSlice } from "@reduxjs/toolkit";

import TEST_INGREDIENT_LIST from "../data/TESTDATA";

import { transformNutritionData } from "../data/TESTDATA";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    addedIngredients: {
      breakfast: [
        {
          id: "break001",
          ingredientName: "Csirkemell",
          amount: 100,
          unit: "g",
          unnitage: 100,
          nutritionData: {
            carb: 0,
            protein: 22,
            fat: 1,
            energy: 120,
          },
        },
      ],
      meal2: [],
      meal3: [],
      meal4: [],
      snack: [],
    },
    favoriteIngredients: [
      {
        id: "break001",
        ingredientName: "Csirkemell",
        amount: 100,
        unit: "g",
        unnitage: 100,
        nutritionData: {
          carb: 0,
          protein: 22,
          fat: 1,
          energy: 120,
        },
      },
    ],
    customIngredients: [],

    searchResultList: [],
    selectedIngredient: null,
    editableIngredient: {
      id: "break001",
      ingredientName: "Csirkemell",
      amount: 100,
      unit: "g",
      unnitage: 100,
      nutritionData: {
        carb: 0,
        protein: 22,
        fat: 1,
        energy: 120,
      },
    },
    UI: {
      searchQueryInput: "",
      newIngredientInput: "",
      isEditIngredientModalOpen: false,
    },
  },
  reducers: {
    addIngredient: (state, action) => {
      const { mealName } = action.payload;
      const ingredientID = action.payload.ingredient.id;
      const existingIngredientIndex = state.addedIngredients[
        mealName
      ].findIndex((ingredient) => ingredient.id === ingredientID);

      if (existingIngredientIndex === -1) {
        state.addedIngredients[mealName].push(action.payload.ingredient);
      } else {
        // Update existing ingredient
        for (const [key, value] of Object.entries(
          action.payload.ingredient.nutritionData
        )) {
          state.addedIngredients[mealName][
            existingIngredientIndex
          ].nutritionData[key] += value;
        }
        state.addedIngredients[mealName][existingIngredientIndex].amount +=
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
    emptyList: (state, action) => {
      const { mealName, listName } = action.payload;

      switch (listName) {
        case "addedIngredients":
          state.addedIngredients[mealName].length = 0;
          break;

        case "favoriteIngredients":
          state.favoriteIngredients.length = 0;
          break;

        case "customIngredients":
          state.customIngredients.length = 0;
          break;

        default:
          return;
      }
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
    setNewIngredientInput: (state, action) => {
      state.UI.newIngredientInput = action.payload;
    },
    addFavoriteIngredient: (state, action) => {
      state.favoriteIngredients.push(action.payload);
    },
    setIsEditIngredientModalOpen: (state, action) => {
      state.UI.isEditIngredientModalOpen = action.payload;
    },
    resetSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const {
  removeIngredient,
  addIngredient,
  emptyList,
  setSelectedIngredient,
  setSearchQueryInput,
  setSearchResultList,
  getSelectedIngredient,
  setNewIngredientInput,
  addFavoriteIngredient,
  setIsEditIngredientModalOpen,
  resetSelectedIngredient,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
