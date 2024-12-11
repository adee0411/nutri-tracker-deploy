import { Sheet, Typography, Stack } from "@mui/joy";

import BreakfastImg from "../../img/breakfast.png";
import LunchImg from "../../img/lunch.png";
import SnackImg from "../../img/snack.png";

import { transformNutritionData } from "../../data/TESTDATA";

const mealImages = {
  breakfast: BreakfastImg,
  meal: LunchImg,
  snack: SnackImg,
};

const MealOverviewCard = ({ mealTitle, ingredientList }) => {
  const isMeal = mealTitle.includes("meal"); // Check if meal's title is Meal (number)
  const mealImage = isMeal ? "meal" : mealTitle;
  const formattedMealTitle = isMeal
    ? "Meal " + mealTitle.at(-1)
    : mealTitle[0].toUpperCase() + mealTitle.slice(1); // Format Meal title if Meal (number);

  // Create transformed nutrition array for all ingredients
  const transformedNutritionData = ingredientList.map((ingredient) => {
    return transformNutritionData(ingredient);
  });

  // Initialize total nutrition object
  let totalNutritionData = {
    carb: 0,
    protein: 0,
    fat: 0,
    energy: 0,
  };

  // Reduce all ingredient's nutrition data
  transformedNutritionData.forEach((nutritionData) => {
    for (const [key, value] of Object.entries(nutritionData)) {
      totalNutritionData[key] += value;
    }
  });

  // Destructure macro data
  const { carb, protein, fat, energy } = totalNutritionData;

  return (
    <Sheet
      color="primary"
      variant="plain"
      sx={{
        borderRadius: "sm",
        p: 1.5,
        backgroundColor: "transparent",
        backgroundImage: `url(${mealImages[mealImage]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "150px",
        backgroundPosition: "left center",
        boxShadow: "md",
      }}
    >
      <Stack gap={3} width="65%" marginLeft="auto">
        <Typography level="title-lg" textAlign="center">
          {formattedMealTitle}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          textAlign="center"
          width="80%"
          m="0 auto"
        >
          <Stack>
            <Typography level="title-sm">Carb</Typography>
            <Typography level="body-sm">{carb} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Protein</Typography>
            <Typography level="body-sm">{protein} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Fat</Typography>
            <Typography level="body-sm">{fat} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Energy</Typography>
            <Typography level="body-sm">{energy} cal</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default MealOverviewCard;
