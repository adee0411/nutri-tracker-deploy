import { Stack } from "@mui/joy";
import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";

const FrequentIngredients = () => {
  const { frequentIngredients } = useSelector((state) => state.ingredient);

  const frequentIngredientsActions = ["log"];
  const frequentListActions = [];

  return (
    <>
      {frequentIngredients.length === 0 ? (
        <EmptyListPlaceholder text="Még nincsenek gyakoriak." />
      ) : (
        <Stack my={4} gap={2}>
          <IngredientListHeader
            listTitle="Gyakoriak"
            listName="frequentIngredients"
            listActions={frequentListActions}
          />
          <IngredientList
            ingredientList={frequentIngredients}
            actionList={frequentIngredientsActions}
            listName="frequentIngredients"
          />
        </Stack>
      )}
    </>
  );
};

export default FrequentIngredients;
