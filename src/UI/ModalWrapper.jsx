import { useSelector } from "react-redux";

import EditIngredientModal from "../components/IngredientList/EditIngredientModal";
import EditCustomIngredientModal from "../components/CustomIngredients/EditCustomIngredientModal";

const ModalWrapper = () => {
  const { editableIngredient } = useSelector((state) => state.ingredient);
  const { isEditIngredientModalOpen, isEditCustomIngredientModalOpen } =
    useSelector((state) => state.ingredient.UI);
  const { actionName, listName } = useSelector(
    (state) => state.ingredient.UI.ingredientAction
  );

  return (
    <>
      {isEditIngredientModalOpen ? (
        <EditIngredientModal
          isModalOpen={isEditIngredientModalOpen}
          ingredient={editableIngredient}
          ingredientAction={actionName}
          listName={listName}
        />
      ) : (
        ""
      )}
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

export default ModalWrapper;
