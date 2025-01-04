import { Sheet, Stack, FormControl, Input, Button, IconButton } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import NutritionDetailCard from "../MealEditor/NutritionDetailCard";

import {
  setNewIngredientInput,
  addIngredient,
  setSearchQueryInput,
  setSearchResultList,
  setRecentIngredients,
} from "../../store/ingredientSlice";

import { transformNutritionData } from "../../data/TESTDATA";

import { FaRegHeart } from "react-icons/fa";
import CardWrapper from "../../UI/CardWrapper";

const SelectedIngredient = ({ selectedIngredient }) => {
  const dispatch = useDispatch();

  const { mealTitle } = useParams();

  const { newIngredientInput } = useSelector((state) => state.ingredient.UI);

  let transformedNutritionData;
  if (selectedIngredient) {
    transformedNutritionData = transformNutritionData(
      selectedIngredient.nutritionData,
      newIngredientInput,
      selectedIngredient.unitage
    );
  }

  const handleNewIngredientAmountChange = (e) => {
    const amount = e.target.value;
    dispatch(setNewIngredientInput(amount));
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      ...selectedIngredient,
      nutritionData: transformedNutritionData,
      amount: +newIngredientInput,
      nutritionDataPerUnit: selectedIngredient.nutritionData,
    };
    dispatch(addIngredient({ mealName: mealTitle, ingredient: newIngredient }));
    dispatch(setSearchQueryInput(""));
    dispatch(setSearchResultList([]));
    dispatch(setRecentIngredients(newIngredient));
  };
  return (
    <CardWrapper>
      <NutritionDetailCard
        title={selectedIngredient.ingredientName}
        imageURL={selectedIngredient.imageURL}
        nutritionData={transformedNutritionData}
      />

      <Stack direction="row" gap={2} my={4} p={2}>
        <FormControl sx={{ flex: 1 }}>
          <Input
            type="number"
            endDecorator={selectedIngredient.unit}
            value={newIngredientInput}
            onChange={handleNewIngredientAmountChange}
          />
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <Button type="submit" onClick={handleAddIngredient}>
            Hozzáad
          </Button>
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <IconButton variant="soft" color="warning">
            <FaRegHeart />
          </IconButton>
        </FormControl>
      </Stack>
    </CardWrapper>
  );
};

export default SelectedIngredient;
