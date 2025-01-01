import { useDispatch, useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import NoMeal from "../IngredientList/NoMeal";

import IngredientListHeader from "../IngredientList/IngredientListHeader";

const FavoriteIngredients = () => {
  const dispatch = useDispatch();
  const { favoriteIngredients } = useSelector((state) => state.ingredient);

  return (
    <>
      {favoriteIngredients.length === 0 ? (
        <NoMeal text="Még nincsenek kedvencek." />
      ) : (
        <>
          <IngredientListHeader
            listTitle="Kedvencek"
            listName="favoriteIngredients"
          />
          <IngredientList ingredientList={favoriteIngredients} actions={null} />
        </>
      )}
    </>
  );
};

export default FavoriteIngredients;
