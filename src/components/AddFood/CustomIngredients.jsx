import { Stack, Button, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import IngredientList from "../IngredientList/IngredientList";

import EmptyListPlaceholder from "../IngredientList/EmptyListPlaceholder";

import IngredientListHeader from "../IngredientList/IngredientListHeader";
import { useNavigate } from "react-router";

const CustomIngredients = () => {
  const navigate = useNavigate();
  const { customIngredients } = useSelector((state) => state.ingredient);

  const customListActions = ["new", "empty", "backup"];
  const customIngredientsActions = ["log", "update", "remove"];

  const handleNavigate = () => {
    navigate("/custom-ingredients");
  };

  return (
    <>
      {customIngredients.length === 0 ? (
        <Stack>
          <EmptyListPlaceholder text="Még nincsenek saját alapanyagok." />
          <Button onClick={handleNavigate} sx={{ width: "50%", m: "0 auto" }}>
            Hozzáadás
          </Button>
        </Stack>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default CustomIngredients;
