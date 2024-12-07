import { Stack, Typography } from "@mui/joy";

import { useParams } from "react-router";
import { useSelector } from "react-redux";

import MealOverviewCard from "../components/MealEditor/MealOverviewCard";
import IngredientList from "../components/IngredientList/IngredientList";

const MealDetails = () => {
  const params = useParams();
  const mealTitle = params.mealTitle;

  //fetch the selected meal's ingredientlist from store
  const ingredientList = useSelector(
    (state) => state.ingredient.ingredientList[mealTitle]
  );

  //Function to reduce macro values of the ingredient
  const sumMealMacroAmount = (macroName) => {
    const reducedMacroAmount = ingredientList.reduce(
      (initialValue, ingredient) => {
        return (
          initialValue +
          ingredient.nutritionData[macroName].amount *
            (ingredient.amount / ingredient.unitage)
        );
      },
      0
    );

    return Number(reducedMacroAmount.toFixed(0));
  };

  const totalProtein = sumMealMacroAmount("protein");
  const totalCarb = sumMealMacroAmount("carb");
  const totalFat = sumMealMacroAmount("fat");
  const totalEnergy = sumMealMacroAmount("energy");

  const totalMacroData = {
    totalProtein,
    totalCarb,
    totalFat,
    totalEnergy,
  };

  return (
    <Stack px={4} py={2} gap={2}>
      <Typography level="title-lg" textAlign="center">
        2024. 11. 18.
      </Typography>

      <MealOverviewCard mealTitle={mealTitle} totalMacroData={totalMacroData} />

      <IngredientList ingredientList={ingredientList} />
    </Stack>
  );
};

export default MealDetails;
