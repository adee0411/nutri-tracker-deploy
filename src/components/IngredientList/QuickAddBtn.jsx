import db from "../../firebase/firestore_config";
import { setDoc, doc } from "firebase/firestore";

import { IconButton } from "@mui/joy";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, setMealIngredients } from "../../store/ingredientSlice";
import { useNavigate } from "react-router";

const QuickAddBtn = ({ mealName, ingredient }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealName]
  );
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    let ingredientsCopy = [...ingredients];
    const existingIngredientIndex = ingredientsCopy.findIndex((ing) => {
      return ing.id === ingredient.id;
    });

    let newNutritionData = {
      ...ingredientsCopy[existingIngredientIndex].nutritionData,
    };

    let newAmount = 2 * ingredient.amount;
    for (let [key, value] of Object.entries(ingredient.nutritionData)) {
      newNutritionData[key] += value;
    }
    const newIngredient = {
      ...ingredient,
      nutritionData: newNutritionData,
      amount: newAmount,
    };

    ingredientsCopy[existingIngredientIndex] = newIngredient;

    const newIngredientList = {
      ingredients: [...ingredientsCopy],
    };

    (async function (mealName) {
      await setDoc(doc(db, "addedIngredients", mealName), newIngredientList);
      dispatch(
        setMealIngredients({
          mealName: mealName,
          ingredientList: newIngredientList.ingredients,
        })
      );
    })(mealName);
  };
  return (
    <IconButton color="primary" variant="plain" onClick={handleAddIngredient}>
      <IoIosAddCircleOutline fontSize={22} />
    </IconButton>
  );
};

export default QuickAddBtn;
