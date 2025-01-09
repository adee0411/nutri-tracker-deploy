import { Modal, Sheet, ModalDialog, ModalClose, Typography } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";

import SearchForm from "../components/AddFood/SearchForm";
import SelectedIngredient from "../components/AddFood/SelectedIngredient";
import QuickIngredientTab from "../components/AddFood/QuickIngredientTab";

import { toggleNewCustomIngredientModal } from "../store/ingredientSlice";

const AddFood = () => {
  const dispatch = useDispatch();
  const { selectedIngredient } = useSelector((state) => state.ingredient);
  const { isNewCustomIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );

  return (
    <>
      <Sheet sx={{ p: 4, backgroundColor: "transparent" }}>
        <SearchForm />

        {/** Render ingredient details conditionally */}
        {!selectedIngredient ? (
          ""
        ) : (
          <SelectedIngredient selectedIngredient={selectedIngredient} />
        )}
        <QuickIngredientTab />
      </Sheet>
      {isNewCustomIngredientModalOpen ? (
        <Modal
          open={isNewCustomIngredientModalOpen}
          onClose={() => dispatch(toggleNewCustomIngredientModal())}
        >
          <ModalDialog>
            <ModalClose />
            <Typography level="title-md">Új alapanyag hozzáadása</Typography>
          </ModalDialog>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default AddFood;
