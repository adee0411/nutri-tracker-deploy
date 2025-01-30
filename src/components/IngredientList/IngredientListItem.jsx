import { ListItem, Stack } from "@mui/joy";
import { useParams } from "react-router";

import IngredientListItemContent from "./IngredientListItemContent";
import IngredientListItemActions from "./IngredientListItemActions";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
const IngredientListItem = ({ ingredient, actionList, listName }) => {
  const { mealTitle } = useParams();
  const { ingredientName, unit, amount, nutritionData } = ingredient;
  const { detailedView } = useSelector((state) => state.ingredient.UI);

  return (
    <>
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
          gap={3}
        >
          <IngredientListItemContent
            ingredientName={ingredientName}
            amount={amount}
            unit={unit}
            nutritionData={nutritionData}
            isDetailed={detailedView}
          />
          <IngredientListItemActions
            mealName={mealTitle}
            ingredient={ingredient}
            actionList={actionList}
            listName={listName}
          />
        </Stack>
      </ListItem>
    </>
  );
};

export default IngredientListItem;
