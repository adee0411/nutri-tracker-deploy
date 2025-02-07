import { useSelector } from "react-redux";

import EditIngredientModal from "../components/IngredientList/EditIngredientModal";
import EditCustomIngredientModal from "../components/CustomIngredients/EditCustomIngredientModal";
import ConfirmEmptyListModal from "../components/IngredientList/ConfirmEmptyListModal";

const ModalWrapper = () => {
  const { editableIngredient } = useSelector((state) => state.ingredient);
  const {
    isEditIngredientModalOpen,
    isEditCustomIngredientModalOpen,
    isConfirmEmptyListModalOpen,
  } = useSelector((state) => state.ingredient.UI);
  const { actionName, listName, mealName } = useSelector(
    (state) => state.ingredient.UI.ingredientAction
  );
  const { emptyListAction } = useSelector((state) => state.ingredient.UI);

  return (
    <>
      {isEditIngredientModalOpen ? (
        <EditIngredientModal
          isModalOpen={isEditIngredientModalOpen}
          ingredient={editableIngredient}
          ingredientAction={actionName}
          listName={listName}
          mealName={mealName}
        />
      ) : null}
      {isEditCustomIngredientModalOpen ? (
        <EditCustomIngredientModal
          isModalOpen={isEditCustomIngredientModalOpen}
          ingredient={editableIngredient}
        />
      ) : null}
      {isConfirmEmptyListModalOpen ? (
        <ConfirmEmptyListModal
          mealName={emptyListAction.mealName}
          listName={emptyListAction.listName}
        />
      ) : null}
    </>
  );
};

export default ModalWrapper;
