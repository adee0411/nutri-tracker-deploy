import { Stack, Typography } from "@mui/joy";

import { useParams } from "react-router";
import { useSelector } from "react-redux";

import MealOverviewCard from "../components/MealEditor/MealOverviewCard";
import IngredientList from "../components/IngredientList/IngredientList";
import NoMeal from "../components/IngredientList/NoMeal";

const MealDetails = () => {
  const params = useParams();
  const mealTitle = params.mealTitle;

  //fetch the selected meal's ingredientlist from store
  const ingredientList = useSelector(
    (state) => state.ingredient.ingredientList[mealTitle]
  );

  return (
    <Stack px={4} py={2} gap={2}>
      <Typography level="title-lg" textAlign="center">
        2024. 11. 18.
      </Typography>

      <MealOverviewCard mealTitle={mealTitle} ingredientList={ingredientList} />

      {ingredientList.length === 0 ? (
        <NoMeal />
      ) : (
        <IngredientList ingredientList={ingredientList} />
      )}
    </Stack>
  );
};

export default MealDetails;
