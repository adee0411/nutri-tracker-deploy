import { Stack } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import IngredientListHeader from "./IngredientListHeader";
import IngredientList from "./IngredientList";
import FeedBack from "./FeedBack";

import { setAddToFavoritesAlert } from "../../store/ingredientSlice";

const AddedIngredients = ({ ingredientList }) => {
  const dispatch = useDispatch();

  const { addToFavoritesAlert } = useSelector((state) => state.ingredient.UI);

  const actionList = ["update", "addToFavorites", "remove"];

  const addedListActions = ["add", "empty", "backup"];

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      dispatch(
        setAddToFavoritesAlert({ message: "", isShown: false, state: "" })
      );
    }, 3000);
    return () => {
      clearTimeout(errorTimeout);
    };
  });

  return (
    <>
      <Stack my={4} gap={2}>
        <IngredientListHeader
          listTitle="Alapanyagok"
          listName="addedIngredients"
          listActions={addedListActions}
        />
        <IngredientList
          ingredientList={ingredientList}
          actionList={actionList}
          listName="addedIngredients"
        />
      </Stack>
      {addToFavoritesAlert.isShown ? (
        <FeedBack alertDetails={addToFavoritesAlert} />
      ) : (
        ""
      )}
    </>
  );
};

export default AddedIngredients;
