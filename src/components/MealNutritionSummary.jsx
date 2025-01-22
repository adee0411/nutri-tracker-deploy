import { Sheet, Stack, Typography } from "@mui/joy";

import { useSelector } from "react-redux";

import DailyGoalProgress from "./DailyGoalProgress";

import CarbIcon from "../icons/carbohydrate.png";
import ProteinIcon from "../icons/proteins.png";
import FatIcon from "../icons/pizza-slice.png";
import CalorieIcon from "../icons/calories.png";
import { useParams } from "react-router";

const MealNutritionSummary = () => {
  const { addedIngredients } = useSelector((state) => state.ingredient);

  const { mealTitle } = useParams();

  const mealIngredients = addedIngredients[mealTitle];

  const isMeal = mealTitle.includes("meal"); // Check if meal's title is Meal (number)
  const mealImage = isMeal ? "meal" : mealTitle;
  const formattedMealTitle = isMeal
    ? `${mealTitle.at(-1)}. étkezés`
    : mealTitle === "breakfast"
    ? "Reggeli"
    : "Snack";

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
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <Typography
        textAlign="center"
        level="title-md"
        fontSize={26}
        fontWeight={300}
      >
        {currentDate}
      </Typography>
      <Sheet
        sx={{ m: 4, p: 4, borderRadius: "md" }}
        color="primary"
        variant="soft"
      >
        <Typography level="title-lg" mb={2} textAlign="center">
          {formattedMealTitle}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          gap={4}
        >
          <DailyGoalProgress
            current={totalNutritionData.energy}
            goal={calorieGoal}
            size="sm"
          />
          <Stack gap={2} flex={1}>
            <Stack>
              <Stack
                direction="row"
                gap={2}
                justifyContent="space-between"
                flex={1}
              >
                <Stack alignItems="center" gap={1}>
                  <img src={CarbIcon} width="24px" />
                  <Typography level="body-md">
                    {`${mealNutritionData.carb} g`}
                  </Typography>
                </Stack>
                <Stack alignItems="center" gap={1}>
                  <img src={ProteinIcon} width="24px" />
                  <Typography level="body-md">
                    {`${mealNutritionData.protein} g`}
                  </Typography>
                </Stack>
                <Stack alignItems="center" gap={1}>
                  <img src={FatIcon} width="24px" />
                  <Typography level="body-md">
                    {`${mealNutritionData.fat} g`}
                  </Typography>
                </Stack>
                <Stack alignItems="center" gap={1}>
                  <img src={CalorieIcon} width="24px" />
                  <Typography level="body-md" fontWeight={700}>
                    {`${mealNutritionData.energy} kcal`}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Sheet>
    </>
  );
};

export default MealNutritionSummary;
