import { Stack, Button } from "@mui/joy";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";

const CustomIngredients = () => {
  const { customIngredients } = useSelector((state) => state.ingredient);

  const customListActions = ["empty"];
  const customIngredientsActions = ["log", "update", "remove"];

  return (
    <>
      {customIngredients.length === 0 ? (
        <Stack alignItems="center">
          <EmptyListPlaceholder text="Még nincsenek saját alapanyagok." />
          <Link
            to="/custom-ingredients"
            viewTransition
            style={{ width: "fit-content" }}
          >
            <Button>Hozzáadás</Button>
          </Link>
        </Stack>
      ) : (
        <Stack my={4} gap={2}>
          <IngredientListHeader
            listTitle="Saját alapanyagok"
            listName="customIngredients"
            listActions={customListActions}
          />
          <IngredientList
            ingredientList={customIngredients}
            actionList={customIngredientsActions}
            listName="customIngredients"
          />
        </Stack>
      )}
    </>
  );
};

export default CustomIngredients;
