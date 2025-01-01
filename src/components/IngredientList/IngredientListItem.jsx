import { ListItem, Stack, ListDivider } from "@mui/joy";
import { useParams } from "react-router";

import IngredientListItemContent from "./IngredientListItemContent";
import IngredientListItemActions from "./IngredientListItemActions";
import { useSelector } from "react-redux";
const IngredientListItem = ({ ingredient, index }) => {
  const { mealTitle } = useParams();

  const ingredientList = useSelector(
    (state) => state.ingredient.addedIngredients[mealTitle]
  );
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
          />
        </Stack>
      </ListItem>
      {ingredientList.length > 1 && index !== ingredientList.length - 1 ? (
        <ListDivider></ListDivider>
      ) : (
        ""
      )}
    </>
  );
};

export default IngredientListItem;
