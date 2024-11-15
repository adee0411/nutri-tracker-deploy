import { Stack } from "@mui/joy";

import { useState } from "react";

import MealButton from "./MealButton";

import BreakFastIcon from "../../icons/breakfast.svg";
import LunchIcon from "../../icons/lunch.svg";
import SnackIcon from "../../icons/snack.svg";

/**************** TEST DATA *********************/
const nutritionInfo = {
  Breakfast: {
    C: 300,
    P: 40,
    F: 18,
    Cal: 1550,
  },
  Meal2: {
    C: 220,
    P: 36,
    F: 28,
    Cal: 1420,
  },
  Meal3: {
    C: 190,
    P: 50,
    F: 23,
    Cal: 1100,
  },
  Meal4: {
    C: 150,
    P: 48,
    F: 13,
    Cal: 900,
  },
  Snack: {
    C: 110,
    P: 20,
    F: 36,
    Cal: 600,
  },
};

const mealIcons = {
  Breakfast: BreakFastIcon,
  Meal: LunchIcon,
  Snack: SnackIcon,
};

const MealList = () => {
  //const [nutrition, setNutrition] = useState(nutritionInfo);
  return (
    <Stack gap={2}>
      {Object.entries(nutritionInfo).map((meal) => {
        const isMeal = meal[0].includes("Meal"); // Check if meal's title is Meal (number)
        const mealIcon = isMeal ? "Meal" : meal[0];
        const formattedMealTitle = isMeal ? "Meal " + meal[0].at(-1) : meal[0]; // Format Meal title if Meal (number)
        return (
          <MealButton
            title={formattedMealTitle}
            icon={mealIcons[mealIcon]}
            nutritionData={meal[1]}
            key={formattedMealTitle}
          />
        );
      })}
    </Stack>
  );
};

export default MealList;
