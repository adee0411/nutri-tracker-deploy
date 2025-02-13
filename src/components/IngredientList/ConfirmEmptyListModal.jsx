import { db } from "../../firebase/firestore_config";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";

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
  setIngredientList,
} from "../../store/ingredientSlice";
import { AnimatePresence, motion } from "framer-motion";

const ConfirmEmptyListModal = ({ mealName, listName }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.ingredient.UI.isConfirmEmptyListModalOpen
  );

  // POST data to firebase
  const emptyMealListInFirebase = async (mealName) => {
    const emptyList = {
      ingredients: [],
    };

    if (listName === "addedIngredients") {
      await setDoc(doc(db, "addedIngredients", mealName), emptyList);
      dispatch(setMealIngredients({ mealName: mealName, ingredientList: [] }));
      dispatch(toggleIsConfirmEmptyListModalOpen());
    } else {
      const listSnapshot = await getDocs(collection(db, listName));
      listSnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, listName, document.id));
      });
      dispatch(setIngredientList({ listName: listName, ingredientList: [] }));
      dispatch(toggleIsConfirmEmptyListModalOpen());
    }
  };

  const handleCloseModal = () => {
    dispatch(toggleIsConfirmEmptyListModalOpen());
  };

  const submitEmptyList = (e) => {
    e.preventDefault();
    emptyMealListInFirebase(mealName);
  };
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <ModalDialog
        component={motion.div}
        initial={{ opacity: 0.2, top: "45%" }}
        animate={{ opacity: 1, top: "50%" }}
        transition={{
          duration: 1,
          top: { type: "spring", visualDuration: 0.3, bounce: 0.4 },
        }}
      >
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
