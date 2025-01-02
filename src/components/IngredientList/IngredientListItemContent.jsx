import { Stack } from "@mui/joy";
import IngredientListItemTitle from "./IngredientListItemTitle";
import IngredientListItemData from "./IngredientListItemData";

const IngredientListItemContent = ({
  ingredientName,
  amount,
  unit,
  nutritionData,
  isDetailed,
}) => {
  return (
    <Stack gap={0.5}>
      <IngredientListItemTitle
        ingredientName={ingredientName}
        amount={amount}
        unit={unit}
      />
      {isDetailed ? (
        <IngredientListItemData nutritionData={nutritionData} />
      ) : (
        ""
      )}
    </Stack>
  );
};

export default IngredientListItemContent;
