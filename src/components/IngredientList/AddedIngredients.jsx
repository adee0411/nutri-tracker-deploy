import { Stack } from "@mui/joy";

import IngredientListHeader from "./IngredientListHeader";
import IngredientList from "./IngredientList";

import { useSelector } from "react-redux";

const AddedIngredients = ({ mealName }) => {
  const ingredientList = useSelector(
    (state) => state.ingredient.addedIngredients[mealName]
  );

  const addedListActions = ["empty", "backup"];
  const ingredientActions = ["update", "addToFavorites", "remove"];

  return (
    <Stack my={4} gap={2}>
      <IngredientListHeader
        listTitle="Alapanyagok"
        listName="addedIngredients"
        listActions={addedListActions}
        mealName={mealName}
      />
      <IngredientList
        listName="addedIngredients"
        mealName={mealName}
        ingredientList={ingredientList}
        actions={ingredientActions}
      />
    </Stack>
  );
};

export default AddedIngredients;
