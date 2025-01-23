import db from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

import { Outlet } from "react-router";

import Header from "../components/Header/Header";

import {
  setAddedIngredients,
  setIngredientList,
} from "../store/ingredientSlice";
import { setProfile } from "../store/profileSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  const { addedIngredients, favoriteIngredients, profile } = useLoaderData();
  useEffect(() => {
    dispatch(setAddedIngredients(addedIngredients));
    dispatch(
      setIngredientList({
        listName: "favoriteIngredients",
        ingredientList: favoriteIngredients,
      })
    );
    dispatch(setProfile(profile));
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

export const rootDataLoader = async () => {
  const initialData = {
    addedIngredients: {},
    favoriteIngredients: [],
    profile: {},
  };
  const addedIngredientsSnapshot = await getDocs(
    collection(db, "addedIngredients")
  );
  addedIngredientsSnapshot.forEach((meal) => {
    initialData.addedIngredients[meal.id] = meal.data().ingredients;
  });
  const favoriteIngredientsSnapshot = await getDocs(
    collection(db, "favoriteIngredients")
  );
  favoriteIngredientsSnapshot.forEach((ingredient) => {
    initialData.favoriteIngredients.push(ingredient.data());
  });
  initialData.profile = (await getDoc(doc(db, "profile", "data"))).data();

  return initialData;
};
