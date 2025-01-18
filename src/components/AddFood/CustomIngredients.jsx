import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import NoMeal from "../IngredientList/NoMeal";

import IngredientListHeader from "../IngredientList/IngredientListHeader";

const CustomIngredients = () => {
  const { customIngredients } = useSelector((state) => state.ingredient);

  const customListActions = ["new", "empty", "backup", "view"];
  const customIngredientsActions = ["log", "update", "remove"];

  return (
    <>
      {customIngredients.length === 0 ? (
        <NoMeal text="Még nincsenek saját alapanyagok." />
      ) : (
        <>
          <IngredientListHeader
            listTitle="Saját alapanyagok"
            listName="customIngredients"
            listActions={customListActions}
          />
          <IngredientList
            ingredientList={customIngredients}
            actionList={customIngredientsActions}
            listName="customIngredients"
          />
        </>
      )}
    </>
  );
};

export default CustomIngredients;
