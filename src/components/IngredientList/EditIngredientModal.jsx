import db from "../../firebase/firestore_config";
import { doc, updateDoc, setDoc } from "firebase/firestore";

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
import { useParams } from "react-router";
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
import { transformNutritionData } from "../../utils";
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
}) => {
  const dispatch = useDispatch();
  const { mealTitle } = useParams();
  const { ingredientName, unit, unitage, nutritionDataPerUnit } = ingredient;
  const { editableIngredientInput } = useSelector(
    (state) => state.ingredient.UI
  );
  const ingredients = useSelector((state) => state.ingredient[listName]);
  const mealIngredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealTitle]
  );
  const { recentIngredients } = useSelector((state) => state.ingredient);

  const formattedIngredientName =
    ingredientName[0].toUpperCase() + ingredientName.slice(1);

  let transformedNutritionData = useMemo(
    () =>
      transformNutritionData(
        nutritionDataPerUnit,
        editableIngredientInput,
        unitage
      ),
    [nutritionDataPerUnit, editableIngredientInput, unitage]
  );

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

    let ingredientsCopy =
      listName === "addedIngredients"
        ? [...ingredients[mealTitle]]
        : [...ingredients];
    const existingIngredientIndex = ingredientsCopy.findIndex((ing) => {
      return ing.id === ingredient.id;
    });

    const updatedIngredient = {
      ...ingredient,
      nutritionData: transformedNutritionData,
      amount: +editableIngredientInput,
    };

    ingredientsCopy[existingIngredientIndex] = updatedIngredient;

    if (listName === "addedIngredients") {
      (async function (mealName) {
        const mealRef = doc(db, listName, mealName);
        await updateDoc(mealRef, {
          ingredients: ingredientsCopy,
        });

        dispatch(
          setMealIngredients({
            mealName: mealName,
            ingredientList: ingredientsCopy,
          })
        );
      })(mealTitle);
    } else {
      (async function () {
        await setDoc(doc(db, listName, ingredient.id), updatedIngredient);

        // Set the appropriate ingredient list to state!!!
        dispatch(
          setIngredientList({
            listName: listName,
            ingredientList: ingredientsCopy,
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
    let ingredientsCopy = [...mealIngredients];
    let recentIngredientsCopy = [...recentIngredients];
    let newIngredient;

    const existingIngredientIndex = ingredientsCopy.findIndex((ing) => {
      return ing.id === ingredient.id;
    });
    let newAmount;

    if (existingIngredientIndex === -1) {
      ingredientsCopy.push(ingredient);
      newAmount = +editableIngredientInput;
    } else {
      let newNutritionData = {
        ...ingredientsCopy[existingIngredientIndex].nutritionData,
      };

      newAmount =
        ingredientsCopy[existingIngredientIndex].amount +
        +editableIngredientInput;
      for (let [key, value] of Object.entries(ingredient.nutritionData)) {
        newNutritionData[key] += value;
      }
      const newIngredient = {
        ...ingredient,
        nutritionData: newNutritionData,
        amount: newAmount,
      };

      ingredientsCopy[existingIngredientIndex] = newIngredient;
    }

    /********* ADD INGREDIENT TO RECENT LIST *********/

    /* Have to check if ingredient and amount exists in list!!! If yes, replace this ingredient with new amount */
    const existingRecentIngredientIndex = recentIngredientsCopy.findIndex(
      (ing) => {
        return ing.id === ingredient.id;
      }
    );

    let newRecentIngredient = {
      ...ingredient,
      nutritionData: transformedNutritionData,
      amount: +editableIngredientInput,
      nutritionDataPerUnit: ingredient.nutritionData,
    };

    if (existingRecentIngredientIndex !== -1) {
      recentIngredientsCopy[existingRecentIngredientIndex] =
        newRecentIngredient;
    } else {
      if (recentIngredientsCopy.length > 10) {
        recentIngredientsCopy.splice(-1, 1);
      }
      recentIngredientsCopy.unshift(newRecentIngredient);
    }

    /********************************************************* */

    const newIngredientList = {
      ingredients: [...ingredientsCopy],
    };

    const newRecentIngredientsList = {
      ingredients: [...recentIngredientsCopy],
    };

    (async function (mealName) {
      await setDoc(doc(db, "addedIngredients", mealName), newIngredientList);
      await setDoc(
        doc(db, "recentIngredients", "data"),
        newRecentIngredientsList
      );
      dispatch(
        setIngredientList({
          ingredientList: newRecentIngredientsList.ingredients,
          listName: "recentIngredients",
        })
      );
      dispatch(
        setMealIngredients({
          mealName: mealName,
          ingredientList: newIngredientList.ingredients,
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
    })(mealTitle);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <AnimatePresence>
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
            <Typography level="title-lg">Alapanyag szerkesztése</Typography>
          </Stack>

          <Typography
            level="title-md"
            color="primary"
          >{`${formattedIngredientName}, ${+editableIngredientInput} ${unit}`}</Typography>
          <NutritionDetails nutritionData={transformedNutritionData} />
          <form
            onSubmit={
              ingredientAction === "update"
                ? handleUpdateIngredient
                : handleLogIngredient
            }
          >
            <Stack direction="row" gap={2}>
              <FormControl>
                <Input
                  type="number"
                  onChange={handleInputChange}
                  value={editableIngredientInput}
                  endDecorator={ingredient.unit}
                />
              </FormControl>
              <FormControl>
                {ingredientAction === "update" ? (
                  <Button type="submit">Módosít</Button>
                ) : (
                  <Button type="submit">Naplóz</Button>
                )}
              </FormControl>
            </Stack>
          </form>
        </ModalDialog>
      </AnimatePresence>
    </Modal>
  );
};

export default EditIngredientModal;
