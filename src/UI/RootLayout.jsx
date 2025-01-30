import db from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";

import { Outlet } from "react-router";

import Header from "../components/Header/Header";
import Welcome from "../routes/Welcome";

import AthleteImg from "../img/undraw_athletes-training_koqa.svg";
import MealImg from "../img/undraw_breakfast_rgx5 (1).svg";
import TrackerImg from "../img/undraw_fitness-tracker_y5q5 (3).svg";
import NoteListImg from "../img/undraw_note-list_47ij (1).svg";

import {
  setAddedIngredients,
  setIngredientList,
} from "../store/ingredientSlice";
import { setProfile } from "../store/profileSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  const { addedIngredients, favoriteIngredients, profile } = useLoaderData();

  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const AppInfo = [
    {
      text: "Tervezd meg napi tápanyag-beviteled!",
      image: MealImg,
    },
    {
      text: "Naplózd az étkezéseid vagy ments el saját mintaétrendeket!",
      image: TrackerImg,
    },
    {
      text: "Tölts fel saját alapanyagokat és tápanyag-táblázatokat!",
      image: NoteListImg,
    },
  ];

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
      {isFirstVisit ? (
        <Welcome
          onCloseWelcome={() => setIsFirstVisit(false)}
          appInfo={AppInfo}
        />
      ) : (
        <>
          <Header></Header>
          <main>
            <Outlet></Outlet>
          </main>
        </>
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
