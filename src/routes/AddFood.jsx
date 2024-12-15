import { useSelector } from "react-redux";
import SearchForm from "../components/AddFood/SearchForm";
import NutritionDetailCard from "../components/MealEditor/NutritionDetailCard";

import ChickenImg from "../img/chicken_breast.webp";
import { transformNutritionData } from "../data/TESTDATA";
import { Button, FormControl, Input, Stack } from "@mui/joy";

import { useDispatch } from "react-redux";

import { setNewIngredientInput } from "../store/ingredientSlie";

const AddFood = () => {
  const dispatch = useDispatch();
  const { selectedIngredient } = useSelector((state) => state.ingredient);
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
    const amount = +e.target.value;
    dispatch(setNewIngredientInput(amount));
  };

  return (
    <>
      <SearchForm />
      {!selectedIngredient ? (
        ""
      ) : (
        <>
          <NutritionDetailCard
            title={selectedIngredient.ingredientName}
            imageURL={selectedIngredient.imageURL}
            nutritionData={transformedNutritionData}
          />
          <Stack direction="row" width="100%" gap={2} my={4}>
            <FormControl sx={{ flex: 1 }}>
              <Input
                type="number"
                endDecorator={selectedIngredient.unit}
                value={newIngredientInput}
                onChange={handleNewIngredientAmountChange}
              />
            </FormControl>
            <FormControl>
              <Button type="submit">Hozzáad</Button>
            </FormControl>
          </Stack>
        </>
      )}
    </>
  );
};

export default AddFood;
