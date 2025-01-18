import { createSlice } from "@reduxjs/toolkit";

import TEST_INGREDIENT_LIST from "../data/TESTDATA";

import { transformNutritionData } from "../data/TESTDATA";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredientList: [],
    addedIngredients: {
      breakfast: [
        {
          ingredientName: "Zabpehely",
          nutritionData: {
            energy: 389,
            protein: 17,
            fat: 7,
            carb: 56,
          },
          unit: "g",
          unitage: 100,
          id: "iaz2dt93zl6tec8amtkn",
          amount: 100,
          nutritionDataPerUnit: {
            energy: 389,
            protein: 17,
            fat: 7,
            carb: 56,
          },
        },
      ],
      meal2: [],
      meal3: [],
      meal4: [],
      snack: [],
    },
    totalNutritionData: {},
    favoriteIngredients: [
      {
        ingredientName: "Zabpehely",
        nutritionData: {
          energy: 389,
          protein: 17,
          fat: 7,
          carb: 56,
        },
        unit: "g",
        unitage: 100,
        id: "iaz2dt93zl6tec8amtkn",
        amount: 100,
        nutritionDataPerUnit: {
          energy: 389,
          protein: 17,
          fat: 7,
          carb: 56,
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
        ingredientName: "Zabpehely",
        nutritionData: {
          energy: 389,
          protein: 17,
          fat: 7,
          carb: 56,
        },
        unit: "g",
        unitage: 100,
        id: "iaz2dt93zl6tec8amtkn",
        amount: 100,
        nutritionDataPerUnit: {
          energy: 389,
          protein: 17,
          fat: 7,
          carb: 56,
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
      isEditCustomIngredientModalOpen: false,
      addToFavoritesAlert: {
        isShown: false,
        message: "",
        state: "",
      },
      detailedView: true,
      editableIngredientInput: "",
      isNewCustomIngredientModalOpen: true,
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

    addCustomIngredient: (state, action) => {
      state.customIngredients.push(action.payload.ingredient);
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
      const { mealName, listName } = action.payload;
      const ingredientID = action.payload.ingredient.id;
      let existingIngredientIndex;

      if (mealName) {
        existingIngredientIndex = state.addedIngredients[mealName].findIndex(
          (ingredient) => ingredient.id === ingredientID
        );

        state.addedIngredients[mealName][existingIngredientIndex] =
          action.payload.ingredient;
      } else {
        existingIngredientIndex = state[listName].findIndex(
          (ingredient) => ingredient.id === ingredientID
        );

        state[listName][existingIngredientIndex] = action.payload.ingredient;
      }
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
    setIsEditCustomIngredientModalOpen: (state, action) => {
      state.UI.isEditCustomIngredientModalOpen =
        !state.UI.isEditCustomIngredientModalOpen;
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
    setTotalNutritionData: (state, action) => {
      state.totalNutritionData[action.payload.mealName] =
        action.payload.totalNutritionData;
    },
    setIngredientList: (state, action) => {
      state.ingredientList = action.payload;
    },
  },
});

export const {
  removeIngredient,
  addIngredient,
  addCustomIngredient,
  updateIngredient,
  emptyList,
  setSelectedIngredient,
  setSearchQueryInput,
  setSearchResultList,
  getSelectedIngredient,
  setNewIngredientInput,
  addFavoriteIngredient,
  setIsEditIngredientModalOpen,
  setIsEditCustomIngredientModalOpen,
  resetSelectedIngredient,
  setAddToFavoritesAlert,
  setRecentIngredients,
  setLastRemoved,
  toggleView,
  setEditableIngredient,
  setEditableIngredientInput,
  setTotalNutritionData,
  setIngredientList,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
