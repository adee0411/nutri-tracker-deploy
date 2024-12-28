import { List } from "@mui/joy";

import IngredientListItem from "./IngredientListItem";

const IngredientList = ({ ingredientList, actions }) => {
  return (
    <List
      color="primary"
      variant="plain"
      sx={{ "--ListDivider-gap": "8px", my: 2 }}
    >
      {ingredientList.map((ingredient) => {
        return (
          <IngredientListItem
            ingredient={ingredient}
            key={ingredient.id}
            actions={actions}
          />
        );
      })}
    </List>
  );
};

export default IngredientList;
