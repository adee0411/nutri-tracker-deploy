import { Stack } from "@mui/joy";

import IngredientListHeader from "../components/IngredientList/IngredientListHeader";
import IngredientList from "../components/IngredientList/IngredientList";
import { useSelector } from "react-redux";

import AddCustomIngredient from "../components/CustomIngredients/AddCustomIngredient";
import EditCustomIngredientModal from "../components/CustomIngredients/EditCustomIngredientModal";
import EmptyListPlaceholder from "../components/IngredientList/EmptyListPlaceholder";

const CustomIngredientsRoute = () => {
  const { customIngredients } = useSelector((state) => state.ingredient);
  const { isEditCustomIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );
  const { editableIngredient } = useSelector((state) => state.ingredient);

  return (
    <Stack p={4} gap={3}>
      <AddCustomIngredient />

      {customIngredients.length === 0 ? (
        <EmptyListPlaceholder text="Még nincsnek saját alapanyagok." />
      ) : (
        <>
          <IngredientListHeader
            listTitle="Saját alapanyagok"
            listName="customIngredients"
            listActions={["empty", "backup", "view"]}
          />
          <IngredientList
            listName="customIngredients"
            actionList={["update", "remove"]}
            ingredientList={customIngredients}
          />
          {isEditCustomIngredientModalOpen ? (
            <EditCustomIngredientModal
              isModalOpen={isEditCustomIngredientModalOpen}
              ingredient={editableIngredient}
            />
          ) : (
            ""
          )}
        </>
      )}
    </Stack>
  );
};

export default CustomIngredientsRoute;
