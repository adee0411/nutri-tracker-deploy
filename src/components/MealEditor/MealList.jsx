import { Stack, Typography } from "@mui/joy";

import { useSelector } from "react-redux";

import MealAccordion from "./MealAccordion";

const MealList = () => {
  // Fetch Ingredient list from store
  const { addedIngredients } = useSelector((state) => state.ingredient);

  const mealOrder = ["breakfast", "meal2", "meal3", "meal4", "snack"];
  return (
    <>
      <Stack>
        <Typography level="title-md">Napi étkezéseim</Typography>
      </Stack>

      <Stack gap={2}>
        {mealOrder.map((meal) => {
          // Initialize total nutrition object
          let totalNutritionData = {
            carb: 0,
            protein: 0,
            fat: 0,
            energy: 0,
          };

          // Reduce all ingredient's nutrition data
          addedIngredients[meal].forEach((ingredient) => {
            for (const [key, value] of Object.entries(
              ingredient.nutritionData
            )) {
              totalNutritionData[key] += value;
            }
          });

          return (
            <MealAccordion
              mealName={meal}
              mealIngredientData={totalNutritionData}
              ingredientList={addedIngredients[meal]}
              key={meal}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default MealList;
