import {
  FormControl,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
  Input,
  Button,
} from "@mui/joy";

import { useParams } from "react-router";
import { useSelector } from "react-redux";

import NutritionDetailCard from "../components/MealEditor/NutritionDetailCard";
import IngredientList from "../components/IngredientList/IngredientList";
import NoMeal from "../components/IngredientList/NoMeal";

import BreakfastImg from "../img/breakfast.png";
import LunchImg from "../img/lunch.png";
import SnackImg from "../img/snack.png";

const mealImages = {
  breakfast: BreakfastImg,
  meal: LunchImg,
  snack: SnackImg,
};

const MealDetails = () => {
  // Get meal's name
  const { mealTitle } = useParams();

  //fetch the selected meal's ingredientlist from store
  const ingredientList = useSelector(
    (state) => state.ingredient.ingredientList[mealTitle]
  );

  const isMeal = mealTitle.includes("meal"); // Check if meal's title is Meal (number)
  const mealImage = isMeal ? "meal" : mealTitle;
  const formattedMealTitle = isMeal
    ? `${mealTitle.at(-1)}. étkezés`
    : mealTitle === "breakfast"
    ? "Reggeli"
    : "Nasi";

  // Initialize total nutrition object
  let totalNutritionData = {
    carb: 0,
    protein: 0,
    fat: 0,
    energy: 0,
  };

  // Reduce all ingredient's nutrition data
  ingredientList.forEach((ingredient) => {
    for (const [key, value] of Object.entries(ingredient.nutritionData)) {
      totalNutritionData[key] += value;
    }
  });

  return (
    <>
      <Stack px={4} py={2} gap={2}>
        <Typography level="title-lg" textAlign="center">
          2024. 11. 18.
        </Typography>

        <NutritionDetailCard
          title={formattedMealTitle}
          nutritionData={totalNutritionData}
          imageURL={mealImages[mealImage]}
        />

        {ingredientList.length === 0 ? (
          <NoMeal />
        ) : (
          <IngredientList ingredientList={ingredientList} />
        )}
      </Stack>
    </>
  );
};

export default MealDetails;
