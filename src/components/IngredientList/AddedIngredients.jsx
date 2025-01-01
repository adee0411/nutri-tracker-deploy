import {
  Typography,
  Sheet,
  Stack,
  IconButton,
  ButtonGroup,
  Alert,
} from "@mui/joy";

import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import IngredientListHeader from "./IngredientListHeader";
import IngredientList from "./IngredientList";
import FeedBack from "./FeedBack";

import {
  addIngredient,
  removeIngredient,
  setIsEditIngredientModalOpen,
  addFavoriteIngredient,
  setAddToFavoritesAlert,
} from "../../store/ingredientSlie";

const AddedIngredients = ({ ingredientList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { editableIngredient } = useSelector((state) => state.ingredient);
  const { isEditIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );

  const { addToFavoritesAlert } = useSelector((state) => state.ingredient.UI);

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

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      dispatch(
        setAddToFavoritesAlert({ message: "", isShown: false, state: "" })
      );
    }, 2000);
    return () => {
      clearTimeout(errorTimeout);
    };
  });
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
      {addToFavoritesAlert.isShown ? (
        <FeedBack alertDetails={addToFavoritesAlert} />
      ) : (
        ""
      )}
    </Sheet>
  );
};

export default AddedIngredients;
