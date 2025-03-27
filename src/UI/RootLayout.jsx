import { db } from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

import { Outlet } from "react-router";

import Header from "../components/Header/Header";
import ModalWrapper from "../UI/ModalWrapper";
import {
  setAddedIngredients,
  setIngredientList,
} from "../store/ingredientSlice";
import { setProfile } from "../store/profileSlice";
import FeedbackWrapper from "./FeedbackWrapper";
import ContentWrapper from "./ContentWrapper";

const RootLayout = () => {
  const dispatch = useDispatch();

  const { addedIngredients, favoriteIngredients, profile } = useLoaderData();

  const windowWidth = window.innerWidth;
  const isDesktop = windowWidth > 720;

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
      {!isDesktop ? <Header /> : ""}

      <main>
        <ContentWrapper>
          <FeedbackWrapper>
            <Outlet />
          </FeedbackWrapper>
          <ModalWrapper />
        </ContentWrapper>
      </main>
    </>
  );
};

export default RootLayout;

export const rootDataLoader = async () => {
  try {
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

    const favoriteIngredientsSnapshot = await getDoc(
      doc(db, "favoriteIngredients", "data")
    );
    favoriteIngredientsSnapshot.data().ingredients.forEach((ingredient) => {
      initialData.favoriteIngredients.push(ingredient);
    });
    initialData.profile = (await getDoc(doc(db, "profile", "data"))).data();

    return initialData;
  } catch (e) {
    throw new Error(e.message);
  }
};
