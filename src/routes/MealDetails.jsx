import { Stack, Typography, Button } from "@mui/joy";

import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import NutritionDetailCard from "../components/MealEditor/NutritionDetailCard";
import AddedIngredients from "../components/IngredientList/AddedIngredients";
import NoMeal from "../components/IngredientList/NoMeal";
import CardWrapper from "../UI/CardWrapper";

import BreakfastImg from "../img/breakfast.png";
import LunchImg from "../img/lunch.png";
import SnackImg from "../img/snack.png";

const mealImages = {
  breakfast: BreakfastImg,
  meal: LunchImg,
  snack: SnackImg,
};

const MealDetails = () => {
  const navigate = useNavigate();
  // Handle Add Ingredient
  const handleAddIngredient = () => {
    navigate("add-food");
  };
  // Get meal's name
  const { mealTitle } = useParams();

  //fetch the selected meal's ingredientlist from store
  const addedIngredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealTitle]
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
  addedIngredients.forEach((ingredient) => {
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
        <CardWrapper>
          <NutritionDetailCard
            title={formattedMealTitle}
            nutritionData={totalNutritionData}
            imageURL={mealImages[mealImage]}
          />
        </CardWrapper>

        {addedIngredients.length === 0 ? (
          <>
            <NoMeal text="A lista üres. Adj hozzá alapanyagokat!" />
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
    </>
  );
};

export default MealDetails;
