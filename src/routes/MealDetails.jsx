import { Stack, Button } from "@mui/joy";

import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ContentWrapper from "../UI/ContentWrapper";
import AddedIngredients from "../components/IngredientList/AddedIngredients";
import EmptyListPlaceholder from "../components/IngredientList/EmptyListPlaceholder";

import {
  setIsEditIngredientModalOpen,
  setLastRemoved,
} from "../store/ingredientSlice";
import MealNutritionSummary from "../components/MealNutritionSummary";

const MealDetails = () => {
  const dispatch = useDispatch();

  // Get meal's name
  const { mealTitle } = useParams();

  //fetch the selected meal's ingredientlist from store
  const mealIngredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealTitle]
  );

  // Initialize total nutrition object
  let totalMealNutritionData = {
    carb: 0,
    protein: 0,
    fat: 0,
    energy: 0,
  };

  // Reduce all ingredient's nutrition data
  mealIngredients.forEach((ingredient) => {
    for (const [key, value] of Object.entries(ingredient.nutritionData)) {
      totalMealNutritionData[key] += value;
    }
  });

  useEffect(() => {
    dispatch(setLastRemoved(null));

    // Reset edit ingredient modal on first render
    dispatch(setIsEditIngredientModalOpen(false));
  }, []);

  return (
    <>
      <MealNutritionSummary />
      <Stack>
        {mealIngredients.length === 0 || mealIngredients === null ? (
          <Stack alignItems="center">
            <EmptyListPlaceholder text="A lista üres. Adj hozzá alapanyagokat!" />
            <Link to="add-food" viewTransition style={{ width: "fit-content" }}>
              <Button>Hozzáadás</Button>
            </Link>
          </Stack>
        ) : (
          <AddedIngredients mealName={mealTitle} />
        )}
      </Stack>
    </>
  );
};

export default MealDetails;
