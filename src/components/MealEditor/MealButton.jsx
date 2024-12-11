import { Button, Stack } from "@mui/joy";

import { Link } from "react-router-dom";

import MealButtonLabel from "./MealButtonLabel";
import NutritionDetails from "../NutritionDetails";

import { transformNutritionData } from "../../data/TESTDATA";

const MealButton = ({ title, ingredientData }) => {
  // Create transformed nutrition array for all ingredients
  const transformedNutritionData = ingredientData.map((ingredient) => {
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

  return (
    <Button variant="soft" color="neutral" sx={{ p: 0 }}>
      <Link
        to={title}
        style={{
          all: "unset",
          display: "block",
          width: "100%",
          height: "100%",
          padding: "12px",
        }}
      >
        <Stack
          direction="row"
          flex={1}
          gap={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <MealButtonLabel title={title} />
          <NutritionDetails nutritionData={totalNutritionData} />
        </Stack>
      </Link>
    </Button>
  );
};

export default MealButton;
