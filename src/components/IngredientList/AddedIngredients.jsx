import { Typography, Sheet, Stack, IconButton, ButtonGroup } from "@mui/joy";

import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import IngredientListHeader from "./IngredientListHeader";
import IngredientList from "./IngredientList";

import {
  addIngredient,
  removeIngredient,
  setIsEditIngredientModalOpen,
  addFavoriteIngredient,
} from "../../store/ingredientSlie";

const AddedIngredients = ({ ingredientList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { editableIngredient } = useSelector((state) => state.ingredient);
  const { isEditIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );

  // Remove single ingredient action
  const handleRemoveIngredient = ({ ingredientID, mealName }) => {
    dispatch(
      removeIngredient({ ingredientID: ingredientID, mealName: mealName })
    );
  };

  // Add the same ingredient (duplicate) again action
  const handleAddIngredientAgain = ({ mealName, ingredient }) => {
    dispatch(addIngredient({ mealName: mealName, ingredient: ingredient }));
  };

  // Update single ingredient action
  const handleEditIngredient = (ingredient) => {
    const editableIngredient = { ...ingredient };
    dispatch(setIsEditIngredientModalOpen(true));
  };

  // Add ingredient to favorites
  const handleAddToFavorites = (ingredient) => {
    dispatch(addFavoriteIngredient(ingredient));
  };

  const addedIngredientActions = {
    addIngredientAgain: handleAddIngredientAgain,
    updateIngredient: handleEditIngredient,
    addToFavorites: handleAddToFavorites,
    removeIngredient: handleRemoveIngredient,
  };
  return (
    <Sheet variant="plain" sx={{ backgroundColor: "transparent", my: 4 }}>
      {" "}
      <IngredientListHeader
        listTitle="Alapanyagok"
        listName="addedIngredients"
      />
      <IngredientList
        ingredientList={ingredientList}
        actions={addedIngredientActions}
      />
    </Sheet>
  );
};

export default AddedIngredients;
