import { useSelector } from "react-redux";
import SearchForm from "../components/AddFood/SearchForm";
import NutritionDetailCard from "../components/MealEditor/NutritionDetailCard";

import ChickenImg from "../img/chicken_breast.webp";
import { transformNutritionData } from "../data/TESTDATA";
import { Button, FormControl, Input, Sheet, Stack } from "@mui/joy";

import { useDispatch } from "react-redux";

import { setNewIngredientInput, addIngredient } from "../store/ingredientSlie";
import { useParams } from "react-router";

const AddFood = () => {
  const dispatch = useDispatch();
  const { mealTitle } = useParams();
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
    const amount = e.target.value;
    dispatch(setNewIngredientInput(amount));
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      ...selectedIngredient,
      nutritionData: transformedNutritionData,
      amount: +newIngredientInput,
    };
    console.log(newIngredient);
    dispatch(addIngredient({ mealName: mealTitle, ingredient: newIngredient }));
  };

  return (
    <Sheet
      variant="plain"
      color="primary"
      sx={{ p: 4, backgroundColor: "transparent" }}
    >
      <SearchForm />

      {/** Render ingredient details conditionally */}
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
              <Button type="submit" onClick={handleAddIngredient}>
                Hozzáad
              </Button>
            </FormControl>
          </Stack>
        </>
      )}
    </Sheet>
  );
};

export default AddFood;
