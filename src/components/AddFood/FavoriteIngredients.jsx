import { Stack, Typography, ButtonGroup, IconButton } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import NoMeal from "../IngredientList/NoMeal";

import { IoIosAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";
import IngredientListHeader from "../IngredientList/IngredientListHeader";

const FavoriteIngredients = () => {
  const dispatch = useDispatch();
  const { favoriteIngredients } = useSelector((state) => state.ingredient);

  return (
    <>
      {favoriteIngredients.length === 0 ? (
        <NoMeal text="Még nincsenek kedvencek." />
      ) : (
        <IngredientListHeader
          listTitle="Kedvencek"
          listName="favoriteIngredients"
        />
      )}
    </>
  );
};

export default FavoriteIngredients;
