import { Stack } from "@mui/joy";

import { useSelector } from "react-redux";

import MealButton from "./MealButton";

const MealList = () => {
  // Fetch Ingredient list from store
  const { ingredientList } = useSelector((state) => state.ingredient);

  return (
    <Stack gap={2}>
      {Object.entries(ingredientList).map((meal) => {
        const mealName = meal[0];
        const mealIngredientData = meal[1];

        return (
          <MealButton
            title={mealName}
            ingredientData={mealIngredientData}
            key={mealName}
          />
        );
      })}
    </Stack>
  );
};

export default MealList;
