import db from "../firebase/firestore_config";
import { doc, getDoc } from "firebase/firestore";

import { Stack, Button, IconButton } from "@mui/joy";

import { useParams, useLoaderData, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ContentWrapper from "../UI/ContentWrapper";
import AddedIngredients from "../components/IngredientList/AddedIngredients";
import EmptyListPlaceholder from "../components/IngredientList/EmptyListPlaceholder";
import ConfirmEmptyListModal from "../components/IngredientList/ConfirmEmptyListModal";

import {
  setIsEditIngredientModalOpen,
  setLastRemoved,
  setMealIngredients,
} from "../store/ingredientSlice";
import MealNutritionSummary from "../components/MealNutritionSummary";

const MealDetails = () => {
  const dispatch = useDispatch();

  // Get meal's name
  const { mealTitle } = useParams();

  const mealData = useLoaderData();

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
    dispatch(
      setMealIngredients({ mealName: mealTitle, ingredientList: mealData })
    );
    dispatch(setLastRemoved(null));

    // Reset edit ingredient modal on first render
    dispatch(setIsEditIngredientModalOpen(false));
  }, []);

  return (
    <ContentWrapper>
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
    </ContentWrapper>
  );
};

export default MealDetails;

export const mealDataLoader = async ({ params }) => {
  const mealName = params.mealTitle;

  const mealRef = doc(db, "addedIngredients", mealName);
  const mealSnap = await getDoc(mealRef);

  const mealIngredientList = mealSnap.data().ingredients;

  return mealIngredientList;
};
