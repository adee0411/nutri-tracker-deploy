import { db } from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate, useRevalidator } from "react-router";
import { useEffect } from "react";

import { Outlet } from "react-router";

import Header from "../components/Header/Header";
import ModalWrapper from "../UI/ModalWrapper";
import GuestPage from "../components/GuestPage";

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
      <Header />

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

const authUser = () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    return user;
  } catch (e) {
    console.log(e.message);
  }
};

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

    const favoriteIngredientsSnapshot = await getDocs(
      collection(db, "favoriteIngredients")
    );
    favoriteIngredientsSnapshot.forEach((ingredient) => {
      initialData.favoriteIngredients.push(ingredient.data());
    });
    initialData.profile = (await getDoc(doc(db, "profile", "data"))).data();

    return initialData;
  } catch (e) {
    throw new Error(e.message);
  }
};
