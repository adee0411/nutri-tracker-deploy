import db from "../../firebase/firestore_config";
import { setDoc, doc } from "firebase/firestore";

import { IconButton } from "@mui/joy";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  setIngredientActionFeedback,
  setIngredientList,
  setMealIngredients,
} from "../../store/ingredientSlice";

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
  const ingredients = addedIngredients[mealName];

  const handleAddIngredient = () => {
    let ingredientsCopy = [...ingredients];
    let recentIngredientsCopy = [...recentIngredients];
    const existingIngredientIndex = ingredientsCopy.findIndex((ing) => {
      return ing.id === ingredient.id;
    });
    let newAmount;

    if (existingIngredientIndex === -1) {
      ingredientsCopy.push(ingredient);
      newAmount = ingredient.amount;
    } else {
      let newNutritionData = {
        ...ingredientsCopy[existingIngredientIndex].nutritionData,
      };

      newAmount =
        ingredientsCopy[existingIngredientIndex].amount + ingredient.amount;
      for (let [key, value] of Object.entries(ingredient.nutritionData)) {
        newNutritionData[key] += value;
      }
      const newIngredient = {
        ...ingredient,
        nutritionData: newNutritionData,
        amount: newAmount,
      };

      ingredientsCopy[existingIngredientIndex] = newIngredient;
    }

    /********* ADD INGREDIENT TO RECENT LIST *********/

    /* Have to check if ingredient and amount exists in list!!! If yes, replace this ingredient with new amount */
    const existingRecentIngredientIndex = recentIngredientsCopy.findIndex(
      (ing) => {
        return ing.id === ingredient.id;
      }
    );

    if (existingRecentIngredientIndex !== -1) {
      recentIngredientsCopy[existingRecentIngredientIndex] = ingredient;
    } else {
      if (recentIngredientsCopy.length > 2) {
        recentIngredientsCopy.splice(-1, 1);
      }
      recentIngredientsCopy.unshift(ingredient);
    }

    /********************************************************* */

    const newIngredientList = {
      ingredients: [...ingredientsCopy],
    };

    const newRecentIngredientsList = {
      ingredients: [...recentIngredientsCopy],
    };

    (async function (mealName) {
      await setDoc(doc(db, "addedIngredients", mealName), newIngredientList);
      await setDoc(
        doc(db, "recentIngredients", "data"),
        newRecentIngredientsList
      );

      dispatch(
        setIngredientList({
          ingredientList: newRecentIngredientsList.ingredients,
          listName: "recentIngredients",
        })
      );
      dispatch(
        setMealIngredients({
          mealName: mealName,
          ingredientList: newIngredientList.ingredients,
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
      size="lg"
    >
      <IoIosAddCircleOutline fontSize={22} />
    </IconButton>
  );
};

export default QuickAddBtn;
