import { Alert, Sheet, Stack, Typography } from "@mui/joy";

import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CountUp from "react-countup";

import DailyGoalProgress from "./DailyGoalProgress";
import MealNutritionSummaryMacro from "./MealNutritionSummaryMacro";

import CarbIcon from "../icons/carbohydrate.png";
import ProteinIcon from "../icons/proteins.png";
import FatIcon from "../icons/pizza-slice.png";
import CalorieIcon from "../icons/calories.png";

import { CiWarning } from "react-icons/ci";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  const totalEnergyRef = useRef(totalNutritionData.energy);

  const { calorieGoal } = useSelector((state) => state.profile.profileData);

  const isCalorieSufficit = totalNutritionData.energy > calorieGoal;

  const isMeal = mealTitle.includes("meal"); // Check if meal's title is Meal (number)
  const formattedMealTitle = isMeal
    ? `${mealTitle.at(-1)}. étkezés`
    : mealTitle === "breakfast"
    ? "Reggeli"
    : "Snack";

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    totalEnergyRef.current = totalNutritionData.energy;
  }, [totalNutritionData.energy]);

  return (
    <Sheet
      sx={{
        px: 2,
        py: 4,
        borderRadius: "md",
        boxShadow: "md",
        background: "#56ccf2" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(1355deg, #1488CC, #2B32B2)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(225deg,  #1488CC, #2B32B2)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
      color="primary"
      variant="solid"
      invertedColors
    >
      <Typography textAlign="center" level="h3">
        {`${currentDate} - ${formattedMealTitle}`}
      </Typography>
      <Stack mt={3} gap={2}>
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
        <Stack gap={2} width="80%" margin="0 auto">
          <Typography textAlign="center">
            A mai napon eddig bevitt kalória:{" "}
            <CountUp
              start={totalEnergyRef.current}
              end={totalNutritionData.energy}
              delay={0}
              duration={1}
              suffix=" kcal"
            >
              {({ countUpRef }) => (
                <Typography
                  level="body-lg"
                  component="span"
                  fontWeight={600}
                  slotProps={{ root: { ref: countUpRef } }}
                ></Typography>
              )}
            </CountUp>
          </Typography>
          <DailyGoalProgress
            current={totalNutritionData.energy}
            goal={calorieGoal}
            size="sm"
            type="linear"
          />
          {isCalorieSufficit ? (
            <Alert
              size="sm"
              sx={{
                backgroundColor: "transparent",
                justifyContent: "center",
              }}
            >
              <Typography
                color="danger"
                level="body-sm"
                fontWeight={300}
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                {" "}
                <CiWarning style={{ fontSize: 18 }} /> Túllépted a mai napra
                meghatározott célt!
              </Typography>
            </Alert>
          ) : (
            ""
          )}
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default MealNutritionSummary;
