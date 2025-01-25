import { Sheet, Stack, Typography } from "@mui/joy";

import { useSelector } from "react-redux";
import CountUp from "react-countup";

import DailyGoalProgress from "./DailyGoalProgress";

import CarbIcon from "../icons/carbohydrate.png";
import ProteinIcon from "../icons/proteins.png";
import FatIcon from "../icons/pizza-slice.png";
import CalorieIcon from "../icons/calories.png";
import { useParams } from "react-router";
import { useEffect, useRef } from "react";
import MealNutritionSummaryMacro from "./MealNutritionSummaryMacro";

const macroIcons = {
  carb: CarbIcon,
  protein: ProteinIcon,
  fat: FatIcon,
  energy: CalorieIcon,
};

const MealNutritionSummary = () => {
  const { addedIngredients } = useSelector((state) => state.ingredient);

  const { mealTitle } = useParams();

  const mealIngredients = addedIngredients[mealTitle];

  const reduceMealNutritionData = (ingredients) => {
    // Initialize total nutrition object
    let totalNutritionData = {
      carb: 0,
      protein: 0,
      fat: 0,
      energy: 0,
    };

    if (ingredients.length > 0) {
      // Reduce all ingredient's nutrition data
      ingredients.forEach((ingredient) => {
        for (const [key, value] of Object.entries(ingredient.nutritionData)) {
          totalNutritionData[key] += value;
        }
      });
    }

    return totalNutritionData;
  };

  const mealNutritionData = reduceMealNutritionData(mealIngredients);

  const reduceTotalNutritionData = (mealCollection) => {
    // Initialize total nutrition object
    let totalNutritionData = {
      carb: 0,
      protein: 0,
      fat: 0,
      energy: 0,
    };

    mealCollection.forEach((meal) => {
      const mealNutritionData = Object.values(meal)[0];
      for (const [key, value] of Object.entries(mealNutritionData)) {
        totalNutritionData[key] += value;
      }
    });

    return totalNutritionData;
  };

  const mealTotalNutritionCollection = Object.entries(addedIngredients).map(
    (meal) => {
      const mealName = meal[0];
      const ingredientData = meal[1];
      const mealTotalNutritionData = reduceMealNutritionData(ingredientData);

      return {
        [mealName]: mealTotalNutritionData,
      };
    }
  );

  const totalNutritionData = reduceTotalNutritionData(
    mealTotalNutritionCollection
  );
  const { calorieGoal } = useSelector((state) => state.profile.profileData);

  return (
    <Sheet
      sx={{ p: 4, borderRadius: "md", boxShadow: "md" }}
      color="primary"
      variant="soft"
    >
      <Stack mt={2} gap={4}>
        <Stack direction="row" gap={2} justifyContent="space-between" flex={1}>
          {Object.entries(mealNutritionData).map((macro) => {
            const macroName = macro[0];
            const macroValue = macro[1];
            return (
              <MealNutritionSummaryMacro
                key={macroName}
                macroName={macroName}
                icon={macroIcons[macroName]}
                value={macroValue}
              />
            );
          })}
        </Stack>
        <Stack gap={2}>
          <Typography textAlign="center">
            A mai napon eddig bevitt kalória:{" "}
            <Typography level="body-lg" fontWeight={600}>
              {totalNutritionData.energy} kcal
            </Typography>
          </Typography>
          <DailyGoalProgress
            current={totalNutritionData.energy}
            goal={calorieGoal}
            size="sm"
            type="linear"
          />
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default MealNutritionSummary;
