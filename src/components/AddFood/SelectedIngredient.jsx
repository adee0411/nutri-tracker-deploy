import db from "../../firebase/firestore_config";
import { doc, setDoc } from "firebase/firestore";

import { Sheet, Stack, FormControl, Input, Button, IconButton } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import NutritionDetailCard from "../MealEditor/NutritionDetailCard";

import {
  setEditableIngredient,
  setIngredientActionFeedback,
  setMealIngredients,
  setNewIngredientInput,
  setSearchQueryInput,
  setSearchResultList,
} from "../../store/ingredientSlice";

import { transformNutritionData } from "../../data/TESTDATA";

import CardWrapper from "../../UI/CardWrapper";

const mealTexts = {
  breakfast: "a reggelihez",
  meal2: "a 2. étkezéshez",
  meal3: "a 3. étkezéshez",
  meal4: "a 4. étkezéshez",
  snack: "a nasihoz",
};

const SelectedIngredient = ({ selectedIngredient }) => {
  const dispatch = useDispatch();

  const { mealTitle } = useParams();

  const { newIngredientInput } = useSelector((state) => state.ingredient.UI);
  let ingredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealTitle]
  );

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
    // 1) Check if selectedIngredient exists in state list
    let ingredientsCopy = [...ingredients];
    const existingIngredientIndex = ingredientsCopy.findIndex((ingredient) => {
      return ingredient.id === selectedIngredient.id;
    });

    // No matching ingredient based on ID
    if (existingIngredientIndex === -1) {
      const newIngredient = {
        ...selectedIngredient,
        nutritionData: transformedNutritionData,
        amount: +newIngredientInput,
        nutritionDataPerUnit: selectedIngredient.nutritionData,
      };

      ingredientsCopy.push(newIngredient);
      // Selected ingredient exists
    } else {
      let newNutritionData = {
        ...ingredientsCopy[existingIngredientIndex].nutritionData,
      };

      let newAmount = ingredientsCopy[existingIngredientIndex].amount;
      newAmount += +newIngredientInput;
      for (let [key, value] of Object.entries(
        selectedIngredient.nutritionData
      )) {
        newNutritionData[key] += value;
      }
      const newIngredient = {
        ...selectedIngredient,
        nutritionData: newNutritionData,
        amount: newAmount,
        nutritionDataPerUnit: selectedIngredient.nutritionData,
      };

      ingredientsCopy[existingIngredientIndex] = newIngredient;
    }

    const newIngredientList = {
      ingredients: [...ingredientsCopy],
    };

    (async function (mealTitle) {
      await setDoc(doc(db, "addedIngredients", mealTitle), newIngredientList);
      dispatch(
        setMealIngredients({
          mealName: mealTitle,
          ingredientList: newIngredientList.ingredients,
        })
      );
      dispatch(
        setIngredientActionFeedback({
          message: `${newIngredientInput} ${selectedIngredient.unit} ${selectedIngredient.ingredientName} hozzáadva ${mealTexts[mealTitle]}`,
          status: "success",
          isShown: true,
        })
      );
      dispatch(setSearchQueryInput(""));
      dispatch(setSearchResultList([]));
    })(mealTitle);
  };
  return (
    <CardWrapper color="primary" variant="solid">
      <NutritionDetailCard
        title={selectedIngredient.ingredientName}
        imageURL={selectedIngredient.imageURL}
        nutritionData={transformedNutritionData}
        amount={newIngredientInput}
        unit={selectedIngredient.unit}
      />

      <Stack direction="row" gap={2} p={2}>
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
      </Stack>
    </CardWrapper>
  );
};

export default SelectedIngredient;
