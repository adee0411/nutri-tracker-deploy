import { Stack, Button } from "@mui/joy";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";

const CustomIngredients = () => {
  const { customIngredients } = useSelector((state) => state.ingredient);

  const { mealTitle } = useParams();

  const customListActions = ["empty"];
  const ingredientActions = ["log", "update", "remove"];

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
        <Stack>
          <IngredientListHeader
            listTitle="Saját alapanyagok"
            listName="customIngredients"
            listActions={customListActions}
          />
          <IngredientList
            listName="customIngredients"
            ingredientList={customIngredients}
            actions={ingredientActions}
            mealName={mealTitle}
          />
        </Stack>
      )}
    </>
  );
};

export default CustomIngredients;
