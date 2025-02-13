import { db } from "../../firebase/firestore_config";
import { setDoc, doc } from "firebase/firestore";

import { IconButton } from "@mui/joy";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setIngredientActionFeedback,
  setIngredientList,
  setMealIngredients,
} from "../../store/ingredientSlice";

import { logMealIngredient, logRecentIngredient } from "../../utils";

const mealTexts = {
  breakfast: "a reggelihez",
  meal2: "a 2. étkezéshez",
  meal3: "a 3. étkezéshez",
  meal4: "a 4. étkezéshez",
  snack: "a nasihoz",
};

const QuickAddBtn = ({ mealName, ingredient }) => {
  const dispatch = useDispatch();
  const { recentIngredients, addedIngredients } = useSelector(
    (state) => state.ingredient
  );
  const mealIngredients = addedIngredients[mealName];

  const handleAddIngredient = () => {
    const updatedMealList = logMealIngredient(
      mealIngredients,
      ingredient,
      ingredient
    );

    const updatedRecentIngredientList = logRecentIngredient(
      recentIngredients,
      ingredient,
      ingredient
    );

    (async function (mealName) {
      try {
        await setDoc(doc(db, "addedIngredients", mealName), {
          ingredients: updatedMealList,
        });
      } catch (e) {
        console.log(e);
      }

      await setDoc(doc(db, "recentIngredients", "data"), {
        ingredients: updatedRecentIngredientList,
      });

      dispatch(
        setIngredientList({
          ingredientList: updatedRecentIngredientList,
          listName: "recentIngredients",
        })
      );
      dispatch(
        setMealIngredients({
          mealName: mealName,
          ingredientList: updatedMealList,
        })
      );
      dispatch(
        setIngredientActionFeedback({
          state: "success",
          isShown: true,
          message: `${ingredient.amount} ${ingredient.unit} ${ingredient.ingredientName} hozzáadva ${mealTexts[mealName]}!`,
        })
      );
    })(mealName);
  };
  return (
    <IconButton
      color="primary"
      variant="plain"
      onClick={handleAddIngredient}
      size="sm"
    >
      <IoIosAddCircleOutline fontSize={18} />
    </IconButton>
  );
};

export default QuickAddBtn;
