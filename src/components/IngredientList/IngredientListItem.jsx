import { ListItem, Stack, ListDivider } from "@mui/joy";
import { useParams } from "react-router";

import IngredientListItemContent from "./IngredientListItemContent";
import IngredientListItemActions from "./IngredientListItemActions";
const IngredientListItem = ({ ingredient, actions }) => {
  const { mealTitle } = useParams();

  const { ingredientName, unit, amount, nutritionData } = ingredient;

  return (
    <>
      <ListItem sx={{ borderRadius: "md", p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          gap={2}
        >
          <IngredientListItemContent
            ingredientName={ingredientName}
            amount={amount}
            unit={unit}
            nutritionData={nutritionData}
          />
          <IngredientListItemActions
            mealName={mealTitle}
            ingredient={ingredient}
            actions={actions}
          />
        </Stack>
      </ListItem>
      <ListDivider></ListDivider>
    </>
  );
};

export default IngredientListItem;
