import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";
import { Stack } from "@mui/joy";

const RecentIngredients = () => {
  const { recentIngredients } = useSelector((state) => state.ingredient);

  const recentIngredientsActions = ["log"];
  const recentListActions = [];

  return (
    <>
      {recentIngredients.length === 0 ? (
        <EmptyListPlaceholder text="Még nincsenek legutóbbiak." />
      ) : (
        <Stack>
          <IngredientListHeader
            listTitle="Legutóbbiak"
            listName="recentIngredients"
            listActions={recentListActions}
          />
          <IngredientList
            ingredientList={recentIngredients}
            actionList={recentIngredientsActions}
            listName="recentIngredients"
          />
        </Stack>
      )}
    </>
  );
};

export default RecentIngredients;
