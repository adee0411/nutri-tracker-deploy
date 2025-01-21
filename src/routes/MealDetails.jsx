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
  const addedIngredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealTitle]
  );

  const { isConfirmEmptyListModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );
  const { actionName, listName } = useSelector(
    (state) => state.ingredient.UI.ingredientAction
  );

  const isMeal = mealTitle.includes("meal"); // Check if meal's title is Meal (number)
  const mealImage = isMeal ? "meal" : mealTitle;
  const formattedMealTitle = isMeal
    ? `${mealTitle.at(-1)}. étkezés`
    : mealTitle === "breakfast"
    ? "Reggeli"
    : "Snack";

  // Initialize total nutrition object
  let totalNutritionData = {
    carb: 0,
    protein: 0,
    fat: 0,
    energy: 0,
  };

  // Reduce all ingredient's nutrition data
  addedIngredients.forEach((ingredient) => {
    for (const [key, value] of Object.entries(ingredient.nutritionData)) {
      totalNutritionData[key] += value;
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
      <Stack px={4} py={2} gap={2}>
        <Typography level="title-lg" textAlign="center">
          2024. 11. 18.
        </Typography>
        <CardWrapper backgroundImg={mealImages[mealTitle]}>
          <NutritionDetailCard
            title={formattedMealTitle}
            nutritionData={totalNutritionData}
            imageURL={mealImages[mealImage]}
          />
        </CardWrapper>

        {addedIngredients.length === 0 ? (
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
          <AddedIngredients ingredientList={addedIngredients} />
        )}
      </Stack>
      {isConfirmEmptyListModalOpen ? (
        <ConfirmEmptyListModal mealName={mealTitle} />
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
