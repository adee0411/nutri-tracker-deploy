import { db } from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { Stack } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

import MealNutritionSummary from "../components/MealNutritionSummary";
import SearchForm from "../components/AddFood/SearchForm";
import SelectedIngredient from "../components/AddFood/SelectedIngredient";
import QuickIngredientTab from "../components/AddFood/QuickIngredientTab";

import {
  setQueryList,
  setIsEditIngredientModalOpen,
  setSelectedIngredient,
  setSearchQueryInput,
  setIngredientList,
} from "../store/ingredientSlice";

const AddFood = () => {
  const dispatch = useDispatch();
  const {
    queryList,
    favoriteIngredients,
    recentIngredients,
    frequentIngredients,
    customIngredients,
  } = useLoaderData();

  console.log(favoriteIngredients);

  const mergedQueryList = queryList.concat(customIngredients);

  const resetSearchForm = () => {
    dispatch(setIsEditIngredientModalOpen(false));
    dispatch(setSelectedIngredient(null));
    dispatch(setSearchQueryInput(""));
  };

  // Avoid parallel component rendering
  useEffect(() => {
    dispatch(setQueryList(mergedQueryList));
    dispatch(
      setIngredientList({
        listName: "frequentIngredients",
        ingredientList: frequentIngredients,
      })
    );
    dispatch(
      setIngredientList({
        listName: "recentIngredients",
        ingredientList: recentIngredients,
      })
    );
    dispatch(
      setIngredientList({
        listName: "customIngredients",
        ingredientList: customIngredients,
      })
    );
    // Reset Form on Route load
    resetSearchForm();
  }, []);

  const { selectedIngredient } = useSelector((state) => state.ingredient);

  return (
    <Stack gap={3}>
      {/********** Meal Nutritions ***********/}
      <MealNutritionSummary isSimple />
      {/********** Ingredient Search ***********/}
      <Stack>
        <SearchForm />

        {/** Render ingredient details conditionally */}
        {!selectedIngredient ? (
          ""
        ) : (
          <SelectedIngredient selectedIngredient={selectedIngredient} />
        )}
      </Stack>

      <QuickIngredientTab />
    </Stack>
  );
};

export const ingredientLoader = async () => {
  const listMap = {
    queryList: [],
    recentIngredients: [],
    frequentIngredients: [],
    customIngredients: [],
  };

  const querySnapshot = await getDocs(collection(db, "ingredients"));
  /*const favoriteIngredientsSnapshot = await getDoc(
    doc(db, "favoriteIngredients", "data")
  );*/
  const recentIngredientsSnapshot = await getDoc(
    doc(db, "recentIngredients", "data")
  );
  const frequentIngredientsSnapshot = await getDoc(
    doc(db, "frequentIngredients", "data")
  );
  const customIngredientsSnapshot = await getDoc(
    doc(db, "customIngredients", "data")
  );

  querySnapshot.forEach((ingredient) => {
    const ingredientData = { id: ingredient.id, ...ingredient.data() };
    listMap.queryList.push(ingredientData);
  });

  recentIngredientsSnapshot.data().ingredients.forEach((ingredient) => {
    listMap.recentIngredients.push(ingredient);
  });

  /*favoriteIngredientsSnapshot.data().ingredients.forEach((ingredient) => {
    listMap.favoriteIngredients.push(ingredient);
  });*/

  frequentIngredientsSnapshot.data().ingredients.forEach((ingredient) => {
    listMap.frequentIngredients.push(ingredient);
  });

  customIngredientsSnapshot.data().ingredients.forEach((ingredient) => {
    listMap.customIngredients.push(ingredient);
  });

  return listMap;
};

export default AddFood;
