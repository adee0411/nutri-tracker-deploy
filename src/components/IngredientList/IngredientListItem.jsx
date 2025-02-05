import { ListItem, Stack } from "@mui/joy";

import IngredientListItemContent from "./IngredientListItemContent";
import IngredientListItemActions from "./IngredientListItemActions";
import { motion } from "framer-motion";
const IngredientListItem = ({ ingredient, listName, mealName, actions }) => {
  const { ingredientName, unit, amount, nutritionData } = ingredient;

  return (
    <ListItem
      sx={{ borderRadius: "md", p: 0 }}
      component={motion.li}
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
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
          mealName={mealName}
          ingredient={ingredient}
          listName={listName}
          actions={actions}
        />
      </Stack>
    </ListItem>
  );
};

export default IngredientListItem;
