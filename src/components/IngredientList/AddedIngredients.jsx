import { Stack } from "@mui/joy";

import IngredientListHeader from "./IngredientListHeader";
import IngredientList from "./IngredientList";

import { useParams } from "react-router";
import { useSelector } from "react-redux";

const AddedIngredients = () => {
  const { mealTitle } = useParams();

  const ingredientList = useSelector(
    (state) => state.ingredient.addedIngredients[mealTitle]
  );

  const addedListActions = ["empty", "backup"];
  const ingredientActions = ["update", "addToFavorites", "remove"];

  return (
    <Stack my={4} gap={2}>
      <IngredientListHeader
        listTitle="Alapanyagok"
        listName="addedIngredients"
        listActions={addedListActions}
      />
      <IngredientList
        listName="addedIngredients"
        mealName={mealTitle}
        ingredientList={ingredientList}
        actions={ingredientActions}
      />
    </Stack>
  );
};

export default AddedIngredients;
