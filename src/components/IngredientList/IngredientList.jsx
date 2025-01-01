import { List, ListDivider } from "@mui/joy";

import IngredientListItem from "./IngredientListItem";

const IngredientList = ({ ingredientList, actions }) => {
  return (
    <List
      color="primary"
      variant="plain"
      sx={{ "--ListDivider-gap": "8px", my: 2 }}
    >
      {ingredientList.map((ingredient, index) => {
        return (
          <IngredientListItem
            ingredient={ingredient}
            key={ingredient.id}
            index={index}
          />
        );
      })}
    </List>
  );
};

export default IngredientList;
