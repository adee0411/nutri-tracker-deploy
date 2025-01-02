import { List } from "@mui/joy";

import IngredientListItem from "./IngredientListItem";

const IngredientList = ({ ingredientList, actionList, listName }) => {
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
            key={`${ingredient.id}_${ingredient.amount}`}
            index={index}
            actionList={actionList}
            listName={listName}
          />
        );
      })}
    </List>
  );
};

export default IngredientList;
