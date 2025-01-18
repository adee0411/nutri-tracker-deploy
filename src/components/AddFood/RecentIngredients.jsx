import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import NoMeal from "../IngredientList/NoMeal";

import IngredientListHeader from "../IngredientList/IngredientListHeader";

const RecentIngredients = () => {
  const { recentIngredients } = useSelector((state) => state.ingredient);

  const recentIngredientsActions = ["log"];
  const recentListActions = ["view"];

  return (
    <>
      {recentIngredients.length === 0 ? (
        <NoMeal text="Még nincsenek legutóbbiak." />
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
