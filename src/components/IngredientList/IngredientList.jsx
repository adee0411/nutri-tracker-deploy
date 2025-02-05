import { List, ListDivider } from "@mui/joy";
import { Fragment } from "react";

import IngredientListItem from "./IngredientListItem";
import { AnimatePresence } from "framer-motion";

const IngredientList = ({ listName, mealName, ingredientList, actions }) => {
  return (
    <List color="primary" variant="plain" sx={{ "--ListDivider-gap": "8px" }}>
      <AnimatePresence>
        {ingredientList.map((ingredient, index) => {
          return (
            <Fragment key={`${ingredient.id}_${ingredient.amount}`}>
              <IngredientListItem
                ingredient={ingredient}
                listName={listName}
                mealName={mealName}
                actions={actions}
              />
              {index !== ingredientList.length - 1 ? <ListDivider /> : ""}
            </Fragment>
          );
        })}
      </AnimatePresence>
    </List>
  );
};

export default IngredientList;
