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

const EditIngredientModal = ({ isModalOpen, ingredient, listName }) => {
  const { ingredientName, unit, unitage, nutritionData, nutritionDataPerUnit } =
    ingredient;
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

  const handleUpdateIngredient = (e) => {
    e.preventDefault();

    const updatedIngredient = {
      ...ingredient,
      nutritionData: transformedNutritionData,
      amount: +editableIngredientInput,
    };

    // Update ingredient
    dispatch(
      updateIngredient({ mealName: mealTitle, ingredient: updatedIngredient })
    );

    dispatch(setEditableIngredient(null));
    dispatch(setEditableIngredientInput(""));
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const updatedIngredient = {
      ...ingredient,
      nutritionData: transformedNutritionData,
      amount: +editableIngredientInput,
    };
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
        <Typography level="title-md">{`${ingredientName}, ${+editableIngredientInput}${unit}`}</Typography>
        <NutritionDetails nutritionData={transformedNutritionData} />
        <form
          onSubmit={
            listName === "addedIngredients"
              ? handleUpdateIngredient
              : handleAddIngredient
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
              {listName === "addedIngredients" ? (
                <Button type="submit">Módosít</Button>
              ) : (
                <Button type="submit">Hozzáad</Button>
              )}
            </FormControl>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default EditIngredientModal;
