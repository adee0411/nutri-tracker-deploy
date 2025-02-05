import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";
import { Stack } from "@mui/joy";
import { useParams } from "react-router";

const RecentIngredients = () => {
  const { recentIngredients } = useSelector((state) => state.ingredient);
  const { mealTitle } = useParams();

  const listActions = [];
  const ingredientActions = ["log", "addToFavorites"];

  return (
    <>
      {recentIngredients.length === 0 ? (
        <EmptyListPlaceholder text="Még nincsenek legutóbbiak." />
      ) : (
        <Stack>
          <IngredientListHeader
            listTitle="Legutóbbiak"
            listName="recentIngredients"
            listActions={listActions}
          />
          <IngredientList
            listName="recentIngredients"
            ingredientList={recentIngredients}
            actions={ingredientActions}
            mealName={mealTitle}
          />
        </Stack>
      )}
    </>
  );
};

export default RecentIngredients;
