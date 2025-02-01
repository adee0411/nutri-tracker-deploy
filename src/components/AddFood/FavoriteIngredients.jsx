import { Stack } from "@mui/joy";

import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";

const FavoriteIngredients = () => {
  const { favoriteIngredients } = useSelector((state) => state.ingredient);

  const favoriteIngredientsActions = ["log", "update", "remove"];
  const favoriteListActions = ["empty"];

  return (
    <>
      {favoriteIngredients.length === 0 ? (
        <EmptyListPlaceholder text="Még nincsenek kedvencek." />
      ) : (
        <Stack my={4} gap={2}>
          <IngredientListHeader
            listTitle="Kedvencek"
            listName="favoriteIngredients"
            listActions={favoriteListActions}
          />
          <IngredientList
            ingredientList={favoriteIngredients}
            actionList={favoriteIngredientsActions}
            listName="favoriteIngredients"
          />
        </Stack>
      )}
    </>
  );
};

export default FavoriteIngredients;
