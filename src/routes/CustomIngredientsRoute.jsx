import IngredientListHeader from "../components/IngredientList/IngredientListHeader";
import IngredientList from "../components/IngredientList/IngredientList";
import { useSelector } from "react-redux";

import AddCustomIngredient from "../components/CustomIngredients/AddCustomIngredient";
import EditCustomIngredientModal from "../components/CustomIngredients/EditCustomIngredientModal";

const CustomIngredientsRoute = () => {
  const { customIngredients } = useSelector((state) => state.ingredient);
  const { isEditCustomIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );
  const { editableIngredient } = useSelector((state) => state.ingredient);

  return (
    <>
      <AddCustomIngredient />

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
  );
};

export default CustomIngredientsRoute;
