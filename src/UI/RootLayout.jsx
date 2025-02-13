import { db } from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

import { Outlet } from "react-router";

import Header from "../components/Header/Header";
import ModalWrapper from "../UI/ModalWrapper";
import GuestPage from "../components/GuestPage";

import {
  setAddedIngredients,
  setIngredientList,
} from "../store/ingredientSlice";
import { setIsLoggedIn } from "../store/authSlice";
import { setProfile } from "../store/profileSlice";
import FeedbackWrapper from "./FeedbackWrapper";

const RootLayout = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const { addedIngredients, favoriteIngredients, profile, currentUser } =
    useLoaderData();

  useEffect(() => {
    dispatch(setAddedIngredients(addedIngredients));
    dispatch(
      setIngredientList({
        listName: "favoriteIngredients",
        ingredientList: favoriteIngredients,
      })
    );
    dispatch(setProfile(profile));

    if (currentUser) {
      dispatch(setIsLoggedIn(true));
    }
  }, []);

  return (
    <>
      <Header />

      <main>
        {!isLoggedIn ? (
          <GuestPage />
        ) : (
          <>
            {" "}
            <FeedbackWrapper>
              <Outlet />
            </FeedbackWrapper>
            <ModalWrapper />
          </>
        )}
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
      currentUser: null,
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

    const user = authUser();

    initialData.currentUser = user;

    return initialData;
  } catch (e) {
    throw new Error(e.message);
  }
};
