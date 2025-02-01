import { Stack } from "@mui/joy";
import IngredientListItemTitle from "./IngredientListItemTitle";
import IngredientListItemData from "./IngredientListItemData";

const IngredientListItemContent = ({
  ingredientName,
  amount,
  unit,
  nutritionData,
}) => {
  return (
    <Stack gap={0.5} width="100%">
      <IngredientListItemTitle
        ingredientName={ingredientName}
        amount={amount}
        unit={unit}
      />
      <IngredientListItemData nutritionData={nutritionData} />
    </Stack>
  );
};

export default IngredientListItemContent;
