import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import ContentWrapper from "../UI/ContentWrapper";
import DailyNutritionDetails from "../components/DailyNutritionOverview/DailyNutritionDetails";
import Welcome from "./Welcome";
import { useEffect, useState } from "react";
import { setIsEditIngredientModalOpen } from "../store/ingredientSlice";

import MealImg from "../img/undraw_breakfast_rgx5 (1).svg";
import TrackerImg from "../img/undraw_fitness-tracker_y5q5 (3).svg";
import NoteListImg from "../img/undraw_note-list_47ij (1).svg";

const AppInfo = [
  {
    text: "Tervezd meg napi tápanyag-beviteled!",
    image: MealImg,
  },
  {
    text: "Naplózd az étkezéseid vagy ments el saját mintaétrendeket!",
    image: TrackerImg,
  },
  {
    text: "Tölts fel saját alapanyagokat és tápanyag-táblázatokat!",
    image: NoteListImg,
  },
];

const DailyOverview = () => {
  const dispatch = useDispatch();
  const { addedIngredients } = useSelector((state) => state.ingredient);
  const [isVisited, setIsVisited] = useState(false);

  const handleSetVisited = () => {
    setIsVisited(true);
  };

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

  return (
    <>
      {isVisited ? (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
            exit={{ opacity: 0, transition: { duration: 5 } }}
            key="firstVisit"
            layout
          >
            <Welcome appInfo={AppInfo} onCloseWelcome={handleSetVisited} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <ContentWrapper>
          <DailyNutritionDetails totalNutritionData={totalNutritionData} />
        </ContentWrapper>
      )}
    </>
  );
};

export default DailyOverview;
