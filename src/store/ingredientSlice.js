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
          unitage: 100,
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
    frequentIngredients: [
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
    customIngredients: [
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
    recentIngredients: [],
    lastRemoved: null,
    searchResultList: [],
    selectedIngredient: null,
    editableIngredient: null,
    UI: {
      searchQueryInput: "",
      newIngredientInput: "",
      isEditIngredientModalOpen: false,
      addToFavoritesAlert: {
        isShown: false,
        message: "",
        state: "",
      },
      detailedView: true,
      editableIngredientInput: "",
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
      const { mealName, ingredient, listName } = action.payload;

      if (listName === "addedIngredients") {
        state[listName][mealName] = state[listName][mealName].filter(
          (ing) => ingredient.id !== ing.id
        );
      } else {
        const ingredientIndex = state[listName].findIndex(
          (ing) => ing.id === ingredient.id && ing.amount === ingredient.amount
        );
        state[listName].splice(ingredientIndex, 1);
      }
    },
    updateIngredient: (state, action) => {
      const { mealName } = action.payload;
      const ingredientID = action.payload.ingredient.id;
      const existingIngredientIndex = state.addedIngredients[
        mealName
      ].findIndex((ingredient) => ingredient.id === ingredientID);

      state.addedIngredients[mealName][existingIngredientIndex] =
        action.payload.ingredient;
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
    setAddToFavoritesAlert: (state, action) => {
      state.UI.addToFavoritesAlert.isShown = action.payload.isShown;
      state.UI.addToFavoritesAlert.message = action.payload.message;
      state.UI.addToFavoritesAlert.state = action.payload.state;
    },
    setRecentIngredients: (state, action) => {
      const isIngredient = state.recentIngredients.find(
        (ingredient) =>
          ingredient.id === action.payload.id &&
          ingredient.amount === action.payload.amount
      );

      if (isIngredient) {
        return;
      } else {
        if (state.recentIngredients.length === 10) {
          state.recentIngredients.shift();
        }
        state.recentIngredients.push(action.payload);
      }
    },
    setLastRemoved: (state, action) => {
      state.lastRemoved = action.payload;
    },
    addCustomIngredient: (state, action) => {
      state.customIngredients.push(action.payload);
    },
    toggleView: (state, action) => {
      state.UI.detailedView = !state.UI.detailedView;
    },
    setEditableIngredient: (state, action) => {
      state.editableIngredient = action.payload;
    },
    setEditableIngredientInput: (state, action) => {
      state.UI.editableIngredientInput = action.payload;
    },
  },
});

export const {
  removeIngredient,
  addIngredient,
  updateIngredient,
  emptyList,
  setSelectedIngredient,
  setSearchQueryInput,
  setSearchResultList,
  getSelectedIngredient,
  setNewIngredientInput,
  addFavoriteIngredient,
  setIsEditIngredientModalOpen,
  resetSelectedIngredient,
  setAddToFavoritesAlert,
  setRecentIngredients,
  setLastRemoved,
  addCustomIngredient,
  toggleView,
  setEditableIngredient,
  setEditableIngredientInput,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
