import { createSlice } from "@reduxjs/toolkit";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredientList: [],
    addedIngredients: {
      breakfast: [],
      meal2: [],
      meal3: [],
      meal4: [],
      snack: [],
    },
    favoriteIngredients: [],
    recentIngredients: [],
    frequentIngredients: [],
    customIngredients: [],
    searchResultList: [],
    lastRemoved: null,
    selectedIngredient: null,
    editableIngredient: null,
    UI: {
      searchQueryInput: "",
      newIngredientInput: "",
      isEditIngredientModalOpen: false,
      isEditCustomIngredientModalOpen: false,
      ingredientActionFeedback: {
        isShown: false,
        message: "",
        state: "",
      },
      editableIngredientInput: "",
      isConfirmEmptyListModalOpen: false,
      ingredientAction: {
        actionName: null,
        listName: null,
        mealName: null,
      },
      emptyListAction: {
        listName: null,
        mealName: null,
      },
    },
  },
  reducers: {
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
    setIsEditIngredientModalOpen: (state, action) => {
      state.UI.isEditIngredientModalOpen = action.payload;
    },
    toggleIsEditCustomIngredientModalOpen: (state, action) => {
      state.UI.isEditCustomIngredientModalOpen =
        !state.UI.isEditCustomIngredientModalOpen;
    },
    setIngredientActionFeedback: (state, action) => {
      state.UI.ingredientActionFeedback.isShown = action.payload.isShown;
      state.UI.ingredientActionFeedback.message = action.payload.message;
      state.UI.ingredientActionFeedback.state = action.payload.state;
    },
    setLastRemoved: (state, action) => {
      state.lastRemoved = action.payload;
    },
    setEditableIngredient: (state, action) => {
      state.editableIngredient = action.payload;
    },
    setEditableIngredientInput: (state, action) => {
      state.UI.editableIngredientInput = action.payload;
    },
    /** Ingredient List Actions */
    setQueryList: (state, action) => {
      state.ingredientList = action.payload;
    },
    setAddedIngredients: (state, action) => {
      state.addedIngredients = action.payload;
    },
    setMealIngredients: (state, action) => {
      state.addedIngredients[action.payload.mealName] =
        action.payload.ingredientList;
    },
    setIngredientList: (state, action) => {
      state[action.payload.listName] = action.payload.ingredientList;
    },
    toggleIsConfirmEmptyListModalOpen: (state) => {
      state.UI.isConfirmEmptyListModalOpen =
        !state.UI.isConfirmEmptyListModalOpen;
    },
    setIngredientAction: (state, action) => {
      state.UI.ingredientAction = action.payload;
    },
    setEmptyListAction: (state, action) => {
      state.UI.emptyListAction = action.payload;
    },
  },
});

export const {
  setSelectedIngredient,
  setSearchQueryInput,
  setSearchResultList,
  setNewIngredientInput,
  setIsEditIngredientModalOpen,
  toggleIsEditCustomIngredientModalOpen,
  setIngredientActionFeedback,
  setLastRemoved,
  setEditableIngredient,
  setEditableIngredientInput,
  setQueryList,
  setAddedIngredients,
  setMealIngredients,
  setIngredientList,
  toggleIsConfirmEmptyListModalOpen,
  setIngredientAction,
  setEmptyListAction,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
