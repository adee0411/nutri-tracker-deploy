import { List, ListDivider } from "@mui/joy";

import IngredientListItem from "./IngredientListItem";

const IngredientList = ({ ingredientList, actionList, listName }) => {
  return (
    <List color="primary" variant="plain" sx={{ "--ListDivider-gap": "18px" }}>
      {ingredientList.map((ingredient, index) => {
        return (
          <>
            <IngredientListItem
              ingredient={ingredient}
              key={`${ingredient.id}_${ingredient.amount}`}
              actionList={actionList}
              listName={listName}
            />
            {index !== ingredientList.length - 1 ? <ListDivider /> : ""}
          </>
        );
      })}
    </List>
  );
};

export default IngredientList;
