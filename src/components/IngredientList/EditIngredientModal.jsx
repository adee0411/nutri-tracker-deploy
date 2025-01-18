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

import { CiEdit } from "react-icons/ci";

import NutritionDetails from "../NutritionDetails";
import {
  addIngredient,
  setEditableIngredient,
  setEditableIngredientInput,
  setIsEditIngredientModalOpen,
  updateIngredient,
} from "../../store/ingredientSlice";
import { transformNutritionData } from "../../data/TESTDATA";
import { useMemo } from "react";

const EditIngredientModal = ({
  isModalOpen,
  ingredient,
  ingredientAction,
  listName,
}) => {
  const { ingredientName, unit, unitage, nutritionDataPerUnit } = ingredient;
  const { editableIngredientInput } = useSelector(
    (state) => state.ingredient.UI
  );
  const dispatch = useDispatch();
  const { mealTitle } = useParams();

  const handleCloseModal = () => {
    dispatch(setIsEditIngredientModalOpen(false));
  };

  const handleInputChange = (e) => {
    dispatch(setEditableIngredientInput(e.target.value));
  };

  let transformedNutritionData = useMemo(
    () =>
      transformNutritionData(
        nutritionDataPerUnit,
        editableIngredientInput,
        unitage
      ),
    [nutritionDataPerUnit, editableIngredientInput, unitage]
  );

  // UPDATE ingredient in list
  const handleUpdateIngredient = (e) => {
    e.preventDefault();

    const updatedIngredient = {
      ...ingredient,
      nutritionData: transformedNutritionData,
      amount: +editableIngredientInput,
    };

    // Update ingredient in selected list
    if (listName === "addedIngredients") {
      dispatch(
        updateIngredient({
          mealName: mealTitle,
          ingredient: updatedIngredient,
          listName: listName,
        })
      );
    } else {
      dispatch(
        updateIngredient({
          ingredient: updatedIngredient,
          listName: listName,
        })
      );
    }

    dispatch(setEditableIngredient(null));
    dispatch(setEditableIngredientInput(""));
  };

  // LOG updated ingredient to day
  const handleLogIngredient = (e) => {
    e.preventDefault();
    const updatedIngredient = {
      ...ingredient,
      nutritionData: transformedNutritionData,
      amount: +editableIngredientInput,
    };
    // Log ingredient to day
    dispatch(
      addIngredient({ mealName: mealTitle, ingredient: updatedIngredient })
    );
    dispatch(setEditableIngredient(null));
    dispatch(setEditableIngredientInput(""));
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <ModalDialog>
        <ModalClose />
        <Stack direction="row" gap={2} alignItems="center">
          <CiEdit />
          <Typography level="title-lg">Alapanyag szerkesztése</Typography>
        </Stack>

        <Typography
          level="title-md"
          color="primary"
        >{`${ingredientName}, ${+editableIngredientInput}${unit}`}</Typography>
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
    </Modal>
  );
};

export default EditIngredientModal;
