import db from "../firebase/firestore_config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { Snackbar, Stack, Typography } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useParams } from "react-router";
import { useEffect } from "react";

import ContentWrapper from "../UI/ContentWrapper";
import MealNutritionSummary from "../components/MealNutritionSummary";
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
  setIngredientActionFeedback,
} from "../store/ingredientSlice";

import { VscError } from "react-icons/vsc";
import { CiCircleCheck } from "react-icons/ci";
import EditCustomIngredientModal from "../components/CustomIngredients/EditCustomIngredientModal";

const mealTexts = {
  breakfast: "a reggelihez",
  meal2: "a 2. étkezéshez",
  meal3: "a 3. étkezéshez",
  meal4: "a 4. étkezéshez",
  snack: "a nasihoz",
};

const SnackBarIcons = {
  error: <VscError />,
  success: <CiCircleCheck />,
};

const AddFood = () => {
  const dispatch = useDispatch();
  const {
    queryList,
    favoriteIngredients,
    recentIngredients,
    frequentIngredients,
    customIngredients,
  } = useLoaderData();

  const { mealTitle } = useParams();

  const { editableIngredient } = useSelector((state) => state.ingredient);
  const {
    isEditCustomIngredientModalOpen,
    isEditIngredientModalOpen,
    isConfirmEmptyListModalOpen,
    emptyListName,
    ingredientActionFeedback,
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

  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <ContentWrapper>
        <Stack gap={4}>
          {/*********** Title ***********/}
          <Stack>
            <Typography textAlign="center" level="h1" fontWeight={300} mb={2}>
              {currentDate}
            </Typography>
            <Typography textAlign="center" level="title-lg">
              Alapanyag hozzáadása {mealTexts[mealTitle]}
            </Typography>
          </Stack>
          {/********** Meal Nutritions ***********/}
          <MealNutritionSummary />
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
        {isEditCustomIngredientModalOpen ? (
          <EditCustomIngredientModal
            isModalOpen={isEditCustomIngredientModalOpen}
            ingredient={editableIngredient}
          />
        ) : (
          ""
        )}
      </ContentWrapper>
      <Snackbar
        open={ingredientActionFeedback.isShown}
        color={
          ingredientActionFeedback.state === "error" ? "danger" : "success"
        }
        variant="soft"
        size="lg"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={() =>
          dispatch(
            setIngredientActionFeedback({
              ...ingredientActionFeedback,
              isShown: false,
            })
          )
        }
        invertedColors
        startDecorator={SnackBarIcons[ingredientActionFeedback.state]}
        sx={{ textAlign: "center" }}
      >
        <Typography
          color={
            ingredientActionFeedback.state === "error" ? "danger" : "success"
          }
          level="body-sm"
          textAlign="center"
        >
          {ingredientActionFeedback.message}
        </Typography>
      </Snackbar>
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
