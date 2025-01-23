import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";
import { Typography } from "@mui/joy";

const RecentIngredients = () => {
  const { recentIngredients } = useSelector((state) => state.ingredient);

  const recentIngredientsActions = ["log"];
  const recentListActions = [];

  return (
    <>
      {recentIngredients.length === 0 ? (
        <EmptyListPlaceholder text="Még nincsenek legutóbbiak." />
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default RecentIngredients;
