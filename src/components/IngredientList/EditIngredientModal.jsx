import db from "../../firebase/firestore_config";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import {
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  Stack,
  FormControl,
  Input,
  Button,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { CiEdit } from "react-icons/ci";

import NutritionDetails from "../NutritionDetails";
import {
  setEditableIngredientInput,
  setIsEditIngredientModalOpen,
  setMealIngredients,
  setIngredientList,
  setIngredientActionFeedback,
} from "../../store/ingredientSlice";
import {
  transformNutritionData,
  logMealIngredient,
  logRecentIngredient,
} from "../../utils";
import { AnimatePresence, motion } from "framer-motion";

const mealTexts = {
  breakfast: "a reggelihez",
  meal2: "a 2. étkezéshez",
  meal3: "a 3. étkezéshez",
  meal4: "a 4. étkezéshez",
  snack: "a nasihoz",
};

const EditIngredientModal = ({
  isModalOpen,
  ingredient,
  ingredientAction,
  listName,
  mealName,
}) => {
  const dispatch = useDispatch();
  const { ingredientName, unitage, nutritionDataPerUnit } = ingredient;

  const { editableIngredientInput } = useSelector(
    (state) => state.ingredient.UI
  );

  const mealIngredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealName]
  );

  const { recentIngredients } = useSelector((state) => state.ingredient);

  const listIngredients = useSelector((state) => state.ingredient[listName]);

  const ingredients =
    listName === "addedIngredients" ? mealIngredients : listIngredients;

  const formattedIngredientName =
    ingredientName[0].toUpperCase() + ingredientName.slice(1);

  /* Transform nutrition data based on form input (amount change) */
  const transformedNutritionData = useMemo(
    () =>
      transformNutritionData(
        nutritionDataPerUnit,
        editableIngredientInput,
        unitage
      ),
    [nutritionDataPerUnit, editableIngredientInput, unitage]
  );

  let updatedIngredient = {
    ...ingredient,
    nutritionData: transformedNutritionData,
    amount: +editableIngredientInput,
  };

  const handleCloseModal = () => {
    dispatch(setIsEditIngredientModalOpen(false));
  };

  const handleInputChange = (e) => {
    const newAmount = e.target.value;
    if (newAmount < 0) {
      return;
    } else {
      dispatch(setEditableIngredientInput(newAmount));
    }
  };

  // UPDATE ingredient in list
  const handleUpdateIngredient = (e) => {
    e.preventDefault();

    const existingIngredientIndex = ingredients.findIndex(
      (ing) => ing.id === ingredient.id
    );

    let updatedList = [...ingredients];

    updatedList[existingIngredientIndex] = updatedIngredient;

    if (listName === "addedIngredients") {
      (async function (mealName) {
        const mealRef = doc(db, listName, mealName);
        await updateDoc(mealRef, {
          ingredients: updatedList,
        });

        dispatch(
          setMealIngredients({
            mealName: mealName,
            ingredientList: updatedList,
          })
        );
      })(mealName);
    } else {
      (async function () {
        await setDoc(doc(db, listName, ingredient.id), updatedIngredient);

        // Set the appropriate ingredient list to state!!!
        dispatch(
          setIngredientList({
            listName: listName,
            ingredientList: updatedList,
          })
        );
      })();
    }

    dispatch(setEditableIngredientInput(""));
    dispatch(setIsEditIngredientModalOpen(false));
  };

  // LOG updated ingredient to day
  const handleLogIngredient = (e) => {
    e.preventDefault();

    const updatedMealList = logMealIngredient(
      mealIngredients,
      ingredient,
      updatedIngredient
    );

    const updatedRecentIngredientList = logRecentIngredient(
      recentIngredients,
      ingredient,
      updatedIngredient
    );

    (async function (mealName) {
      await setDoc(doc(db, "addedIngredients", mealName), {
        ingredients: updatedMealList,
      });

      await setDoc(doc(db, "recentIngredients", "data"), {
        ingredients: updatedRecentIngredientList,
      });

      dispatch(
        setIngredientList({
          ingredientList: updatedRecentIngredientList,
          listName: "recentIngredients",
        })
      );
      dispatch(
        setMealIngredients({
          mealName: mealName,
          ingredientList: updatedMealList,
        })
      );
      dispatch(
        setIngredientActionFeedback({
          state: "success",
          isShown: true,
          message: `${+editableIngredientInput} ${ingredient.unit} ${
            ingredient.ingredientName
          } hozzáadva ${mealTexts[mealName]}!`,
        })
      );
      dispatch(setIsEditIngredientModalOpen(false));
    })(mealName);
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
        <Stack direction="row" gap={2} alignItems="center">
          <CiEdit />
          <Typography level="title-sm">Alapanyag szerkesztése</Typography>
        </Stack>

        <Typography
          level="title-md"
          color="primary"
        >{`${formattedIngredientName}, ${updatedIngredient.amount} ${updatedIngredient.unit}`}</Typography>
        <NutritionDetails
          nutritionData={updatedIngredient.nutritionData}
          fontSize={12}
        />
        <form
          onSubmit={
            ingredientAction === "update"
              ? handleUpdateIngredient
              : handleLogIngredient
          }
        >
          <Stack direction="row" gap={2}>
            <FormControl size="sm">
              <Input
                type="number"
                onChange={handleInputChange}
                value={editableIngredientInput}
                endDecorator={ingredient.unit}
              />
            </FormControl>
            <FormControl>
              {ingredientAction === "update" ? (
                <Button size="sm" type="submit">
                  Módosít
                </Button>
              ) : (
                <Button size="sm" type="submit">
                  Naplóz
                </Button>
              )}
            </FormControl>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default EditIngredientModal;
