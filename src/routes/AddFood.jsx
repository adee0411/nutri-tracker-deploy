import db from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { Stack } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

import ContentWrapper from "../UI/ContentWrapper";
import MealNutritionSummary from "../components/MealNutritionSummary";
import SearchForm from "../components/AddFood/SearchForm";
import SelectedIngredient from "../components/AddFood/SelectedIngredient";
import QuickIngredientTab from "../components/AddFood/QuickIngredientTab";
import ConfirmEmptyListModal from "../components/IngredientList/ConfirmEmptyListModal";

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

  const { isConfirmEmptyListModalOpen, emptyListName } = useSelector(
    (state) => state.ingredient.UI
  );

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
        listName: "favoriteIngredients",
        ingredientList: favoriteIngredients,
      })
    );
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
    <>
      <ContentWrapper>
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

        {isConfirmEmptyListModalOpen ? (
          <ConfirmEmptyListModal listName={emptyListName} />
        ) : (
          ""
        )}
      </ContentWrapper>
    </>
  );
};

export const ingredientLoader = async () => {
  const listMap = {
    queryList: [],
    favoriteIngredients: [],
    recentIngredients: [],
    frequentIngredients: [],
    customIngredients: [],
  };

  const querySnapshot = await getDocs(collection(db, "ingredients"));
  const favoriteIngredientsSnapshot = await getDocs(
    collection(db, "favoriteIngredients")
  );
  const recentIngredientsSnapshot = await getDoc(
    doc(db, "recentIngredients", "data")
  );
  const frequentIngredientsSnapshot = await getDocs(
    collection(db, "frequentIngredients")
  );
  const customIngredientsSnapshot = await getDocs(
    collection(db, "customIngredients")
  );

  querySnapshot.forEach((ingredient) => {
    const ingredientData = { id: ingredient.id, ...ingredient.data() };
    listMap.queryList.push(ingredientData);
  });

  favoriteIngredientsSnapshot.forEach((ingredient) => {
    const ingredientData = { id: ingredient.id, ...ingredient.data() };
    listMap.favoriteIngredients.push(ingredientData);
  });
  recentIngredientsSnapshot.data().ingredients.forEach((ingredient) => {
    listMap.recentIngredients.push(ingredient);
  });
  frequentIngredientsSnapshot.forEach((ingredient) => {
    const ingredientData = { id: ingredient.id, ...ingredient.data() };
    listMap.frequentIngredients.push(ingredientData);
  });
  customIngredientsSnapshot.forEach((ingredient) => {
    const ingredientData = { id: ingredient.id, ...ingredient.data() };
    listMap.customIngredients.push(ingredientData);
  });

  return listMap;
};

export default AddFood;
