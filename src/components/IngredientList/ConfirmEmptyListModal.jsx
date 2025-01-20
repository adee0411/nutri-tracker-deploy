import db from "../../firebase/firestore_config";
import { setDoc, doc } from "firebase/firestore";

import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Stack,
  Button,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleIsConfirmEmptyListModalOpen,
  setMealIngredients,
} from "../../store/ingredientSlice";

const ConfirmEmptyListModal = ({ mealName }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.ingredient.UI.isConfirmEmptyListModalOpen
  );

  // POST data to firebase
  const emptyMealListInFirebase = async (mealName) => {
    const emptyList = {
      ingredients: [],
    };
    await setDoc(doc(db, "addedIngredients", mealName), emptyList);
  };

  const handleCloseModal = () => {
    dispatch(toggleIsConfirmEmptyListModalOpen());
  };

  const submitEmptyList = (e) => {
    e.preventDefault();
    emptyMealListInFirebase(mealName);
    dispatch(setMealIngredients({ mealName: mealName, ingredientList: [] }));
    dispatch(toggleIsConfirmEmptyListModalOpen());
  };
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <ModalDialog>
        <ModalClose />
        <form onSubmit={submitEmptyList}>
          <Typography>Biztosan kiüríted a listát?</Typography>
          <Stack direction="row" justifyContent="space-between" gap={4} mt={4}>
            <Button type="submit" color="primary" variant="solid" fullWidth>
              Megerősít
            </Button>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              onClick={() => dispatch(toggleIsConfirmEmptyListModalOpen())}
            >
              Mégse
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default ConfirmEmptyListModal;
