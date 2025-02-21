import { useDispatch, useSelector } from "react-redux";

import ContentWrapper from "../UI/ContentWrapper";
import DailyNutritionDetails from "../components/DailyNutritionOverview/DailyNutritionDetails";

import { useEffect } from "react";
import { setIsEditIngredientModalOpen } from "../store/ingredientSlice";

const DailyOverview = () => {
  const dispatch = useDispatch();
  const { addedIngredients } = useSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(setIsEditIngredientModalOpen(false));
  }, []);

  const reduceMealNutritionData = (ingredients) => {
    // Initialize total nutrition object
    let totalNutritionData = {
      carb: 0,
      protein: 0,
      fat: 0,
      energy: 0,
    };

    if (ingredients.length > 0) {
      // Reduce all ingredient's nutrition data
      ingredients.forEach((ingredient) => {
        for (const [key, value] of Object.entries(ingredient.nutritionData)) {
          totalNutritionData[key] += value;
        }
      });
    }

    return totalNutritionData;
  };

  const reduceTotalNutritionData = (mealCollection) => {
    // Initialize total nutrition object
    let totalNutritionData = {
      carb: 0,
      protein: 0,
      fat: 0,
      energy: 0,
    };

    mealCollection.forEach((meal) => {
      const mealNutritionData = Object.values(meal)[0];
      for (const [key, value] of Object.entries(mealNutritionData)) {
        totalNutritionData[key] += value;
      }
    });

    return totalNutritionData;
  };

  const mealTotalNutritionCollection = Object.entries(addedIngredients).map(
    (meal) => {
      const mealName = meal[0];
      const ingredientData = meal[1];

      const mealTotalNutritionData = reduceMealNutritionData(ingredientData);

      return {
        [mealName]: mealTotalNutritionData,
      };
    }
  );

  const totalNutritionData = reduceTotalNutritionData(
    mealTotalNutritionCollection
  );

  return <DailyNutritionDetails totalNutritionData={totalNutritionData} />;
};

export default DailyOverview;
