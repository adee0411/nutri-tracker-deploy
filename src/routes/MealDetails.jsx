import db from "../firebase/firestore_config";
import { collection, doc, getDoc } from "firebase/firestore";

import { Stack, Typography, Button } from "@mui/joy";

import { useParams, useNavigate, useLoaderData } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import NutritionDetailCard from "../components/MealEditor/NutritionDetailCard";
import AddedIngredients from "../components/IngredientList/AddedIngredients";
import EmptyListPlaceholder from "../components/IngredientList/EmptyListPlaceholder";
import CardWrapper from "../UI/CardWrapper";
import ConfirmEmptyListModal from "../components/IngredientList/ConfirmEmptyListModal";
import EditIngredientModal from "../components/IngredientList/EditIngredientModal";

import BreakfastImg from "../img/breakfast.png";
import LunchImg from "../img/lunch.png";
import SnackImg from "../img/snack.png";
import { useEffect } from "react";

import {
  setEditableIngredient,
  setIsEditIngredientModalOpen,
  setMealIngredients,
} from "../store/ingredientSlice";
import MealNutritionSummary from "../components/MealNutritionSummary";

const mealImages = {
  breakfast: BreakfastImg,
  meal2: LunchImg,
  meal3: LunchImg,
  meal4: LunchImg,
  snack: SnackImg,
};

const MealDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { editableIngredient } = useSelector((state) => state.ingredient);
  const { isEditIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );

  // Get meal's name
  const { mealTitle } = useParams();

  const mealData = useLoaderData();

  //fetch the selected meal's ingredientlist from store
  const mealIngredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealTitle]
  );

  const { isConfirmEmptyListModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );
  const { actionName, listName } = useSelector(
    (state) => state.ingredient.UI.ingredientAction
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

  // Handle Add Ingredient
  const handleAddIngredient = () => {
    navigate("add-food");
  };

  useEffect(() => {
    dispatch(
      setMealIngredients({ mealName: mealTitle, ingredientList: mealData })
    );

    // Reset edit ingredient modal on first render
    dispatch(setIsEditIngredientModalOpen(false));
  }, []);

  return (
    <>
      <MealNutritionSummary />
      <Stack px={4} py={2} gap={2}>
        {/**        <CardWrapper backgroundImg={mealImages[mealTitle]}>
          <NutritionDetailCard
            title={formattedMealTitle}
            nutritionData={totalNutritionData}
            imageURL={mealImages[mealImage]}
          />
        </CardWrapper> */}

        {mealIngredients.length === 0 ? (
          <>
            <EmptyListPlaceholder text="A lista üres. Adj hozzá alapanyagokat!" />
            <Button
              onClick={handleAddIngredient}
              sx={{ width: "50%", m: "0 auto" }}
            >
              Hozzáadás
            </Button>
          </>
        ) : (
          <AddedIngredients ingredientList={mealIngredients} />
        )}
      </Stack>
      {isConfirmEmptyListModalOpen ? (
        <ConfirmEmptyListModal
          mealName={mealTitle}
          listName="addedIngredients"
        />
      ) : (
        ""
      )}
      {isEditIngredientModalOpen ? (
        <EditIngredientModal
          isModalOpen={isEditIngredientModalOpen}
          ingredient={editableIngredient}
          ingredientAction={actionName}
          listName={listName}
        />
      ) : (
        ""
      )}
    </>
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
