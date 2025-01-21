import db from "../firebase/firestore_config";
import { collection, getDocs } from "firebase/firestore";

import { Sheet } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router";

import SearchForm from "../components/AddFood/SearchForm";
import SelectedIngredient from "../components/AddFood/SelectedIngredient";
import QuickIngredientTab from "../components/AddFood/QuickIngredientTab";
import EditIngredientModal from "../components/IngredientList/EditIngredientModal";
import ConfirmEmptyListModal from "../components/IngredientList/ConfirmEmptyListModal";

import {
  setQueryList,
  setFavoriteIngredients,
  setRecentIngredients,
  setFrequentIngredients,
  setCustomIngredients,
  setIsEditIngredientModalOpen,
} from "../store/ingredientSlice";
import { useEffect } from "react";

const AddFood = () => {
  const {
    queryList,
    favoriteIngredients,
    recentIngredients,
    frequentIngredients,
    customIngredients,
  } = useLoaderData();

  const dispatch = useDispatch();

  const { editableIngredient } = useSelector((state) => state.ingredient);
  const {
    isEditIngredientModalOpen,
    isConfirmEmptyListModalOpen,
    emptyListName,
  } = useSelector((state) => state.ingredient.UI);
  const { actionName, listName } = useSelector(
    (state) => state.ingredient.UI.ingredientAction
  );

  const mergedQueryList = queryList.concat(customIngredients);

  // Avoid parallel component rendering
  useEffect(() => {
    dispatch(setQueryList(mergedQueryList));
    dispatch(setFavoriteIngredients(favoriteIngredients));
    dispatch(setRecentIngredients(recentIngredients));
    dispatch(setFrequentIngredients(frequentIngredients));
    dispatch(setCustomIngredients(customIngredients));
    dispatch(setIsEditIngredientModalOpen(false));
  }, []);

  const { selectedIngredient } = useSelector((state) => state.ingredient);

  return (
    <>
      <Sheet sx={{ p: 4, backgroundColor: "transparent" }}>
        <SearchForm />

        {/** Render ingredient details conditionally */}
        {!selectedIngredient ? (
          ""
        ) : (
          <SelectedIngredient selectedIngredient={selectedIngredient} />
        )}
        <QuickIngredientTab />
      </Sheet>
      {isConfirmEmptyListModalOpen ? (
        <ConfirmEmptyListModal listName={emptyListName} />
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
  const recentIngredientsSnapshot = await getDocs(
    collection(db, "recentIngredients")
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
  recentIngredientsSnapshot.forEach((ingredient) => {
    const ingredientData = { id: ingredient.id, ...ingredient.data() };
    listMap.recentIngredients.push(ingredientData);
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
