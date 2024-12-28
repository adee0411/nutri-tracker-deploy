import { Stack } from "@mui/joy";

import { useSelector } from "react-redux";

import MealButton from "./MealButton";

const MealList = () => {
  // Fetch Ingredient list from store
  const { addedIngredients } = useSelector((state) => state.ingredient);

  return (
    <Stack gap={2}>
      {Object.entries(addedIngredients).map((meal) => {
        const mealName = meal[0];

        // Initialize total nutrition object
        let totalNutritionData = {
          carb: 0,
          protein: 0,
          fat: 0,
          energy: 0,
        };

        // Reduce all ingredient's nutrition data
        meal[1].forEach((ingredient) => {
          for (const [key, value] of Object.entries(ingredient.nutritionData)) {
            totalNutritionData[key] += value;
          }
        });

        return (
          <MealButton
            title={mealName}
            ingredientData={totalNutritionData}
            key={mealName}
          />
        );
      })}
    </Stack>
  );
};

export default MealList;
