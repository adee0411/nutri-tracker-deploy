import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";
import { Typography } from "@mui/joy";

const FrequentIngredients = () => {
  const { frequentIngredients } = useSelector((state) => state.ingredient);

  const frequentIngredientsActions = ["log"];
  const frequentListActions = ["view"];

  return (
    <>
      {frequentIngredients.length === 0 ? (
        <EmptyListPlaceholder text="Még nincsenek gyakoriak." />
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default FrequentIngredients;
