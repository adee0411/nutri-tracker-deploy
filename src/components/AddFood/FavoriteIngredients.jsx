import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import NoMeal from "../IngredientList/NoMeal";

import IngredientListHeader from "../IngredientList/IngredientListHeader";

const FavoriteIngredients = () => {
  const { favoriteIngredients } = useSelector((state) => state.ingredient);

  const favoriteIngredientsActions = ["log", "update", "remove"];
  const favoriteListActions = ["empty", "backup", "view"];

  return (
    <>
      {favoriteIngredients.length === 0 ? (
        <NoMeal text="Még nincsenek kedvencek." />
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default FavoriteIngredients;
