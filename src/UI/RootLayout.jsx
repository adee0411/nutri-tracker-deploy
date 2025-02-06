import db from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Outlet } from "react-router";

import Header from "../components/Header/Header";
import ModalWrapper from "../UI/ModalWrapper";
import BottomNavigation from "./BottomNavigation";
import Welcome from "../routes/Welcome";

import {
  setAddedIngredients,
  setIngredientList,
} from "../store/ingredientSlice";
import { setProfile } from "../store/profileSlice";
import { useColorScheme } from "@mui/joy";
import FeedbackWrapper from "./FeedbackWrapper";

import Image1 from "../img/undraw_fitness-tracker_y5q5 (3).svg";
import Image2 from "../img/undraw_note-list_47ij (1).svg";
import Image3 from "../img/undraw_healthy-lifestyle_8zpg.svg";

const AppInfo = [
  {
    image: Image1,
    text: "Text1",
  },
  {
    image: Image2,
    text: "Text1",
  },
  {
    image: Image3,
    text: "Text1",
  },
];

const RootLayout = () => {
  const { mode, systemMode } = useColorScheme();

  const dispatch = useDispatch();

  const { addedIngredients, favoriteIngredients, profile } = useLoaderData();

  const [showWelcome, setShowWelcome] = useState(true);

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
      {!showWelcome ? (
        <>
          {" "}
          <Header />
          <main>
            <FeedbackWrapper>
              <Outlet />
            </FeedbackWrapper>
            <ModalWrapper />
          </main>
        </>
      ) : (
        <Welcome
          appInfo={AppInfo}
          onSetIsVisited={() => setShowWelcome(false)}
        />
      )}
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
    //console.log(addedIngredientsSnapshot.get().exists);
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
