import { List, ListDivider } from "@mui/joy";
import { Fragment } from "react";

import IngredientListItem from "./IngredientListItem";

const IngredientList = ({ ingredientList, actionList, listName }) => {
  return (
    <List color="primary" variant="plain" sx={{ "--ListDivider-gap": "18px" }}>
      {ingredientList.map((ingredient, index) => {
        return (
          <Fragment key={`${ingredient.id}_${ingredient.amount}`}>
            <IngredientListItem
              ingredient={ingredient}
              actionList={actionList}
              listName={listName}
            />
            {index !== ingredientList.length - 1 ? <ListDivider /> : ""}
          </Fragment>
        );
      })}
    </List>
  );
};

export default IngredientList;
