import db from "../firebase/firestore_config";
import { collection, getDocs } from "firebase/firestore";

import { Sheet } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router";

import SearchForm from "../components/AddFood/SearchForm";
import SelectedIngredient from "../components/AddFood/SelectedIngredient";
import QuickIngredientTab from "../components/AddFood/QuickIngredientTab";

import { setIngredientList } from "../store/ingredientSlice";
import { useEffect } from "react";

const AddFood = () => {
  const ingredientList = useLoaderData();

  const dispatch = useDispatch();

  // Avoid parallel component rendering
  useEffect(() => {
    dispatch(setIngredientList(ingredientList));
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
    </>
  );
};

export const ingredientLoader = async () => {
  const ingredientList = [];
  const ingredientSnapshot = await getDocs(collection(db, "ingredients"));
  ingredientSnapshot.forEach((ingredient) => {
    const ingredientData = { id: ingredient.id, ...ingredient.data() };
    ingredientList.push(ingredientData);
  });

  return ingredientList;
};

export default AddFood;
