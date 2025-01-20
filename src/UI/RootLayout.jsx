import db from "../firebase/firestore_config";
import { collection, getDocs } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

import { Outlet } from "react-router";

import Header from "../components/Header/Header";

import { setAddedIngredients } from "../store/ingredientSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  const addedIngredientsList = useLoaderData();
  useEffect(() => {
    dispatch(setAddedIngredients(addedIngredientsList));
  }, []);
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default RootLayout;

export const addedIngredientsListLoader = async () => {
  const addedIngredients = {};
  const snapshot = await getDocs(collection(db, "addedIngredients"));
  snapshot.forEach((meal) => {
    addedIngredients[meal.id] = meal.data().ingredients;
  });

  return addedIngredients;
};
