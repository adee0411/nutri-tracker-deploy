import { Stack, Typography } from "@mui/joy";
import NutritionDetails from "../NutritionDetails";

const IngredientListItemContent = ({
  ingredientName,
  amount,
  unit,
  nutritionData,
}) => {
  console.log(nutritionData);
  return (
    <Stack gap={0.5}>
      <Typography level="title-md">
        {ingredientName}, {amount}
        {unit}
      </Typography>
      <NutritionDetails nutritionData={nutritionData} />
    </Stack>
  );
};

export default IngredientListItemContent;
