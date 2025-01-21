import db from "../../firebase/firestore_config";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import { Button, Dropdown, MenuButton, Menu, MenuItem, Stack } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

import EditIngredientModal from "./EditIngredientModal";
import QuickAddBtn from "./QuickAddBtn";

import { CiEdit } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

import {
  addIngredient,
  setIsEditIngredientModalOpen,
  addFavoriteIngredient,
  setAddToFavoritesAlert,
  removeIngredient,
  setRecentIngredients,
  setLastRemoved,
  setEditableIngredient,
  setEditableIngredientInput,
  toggleIsEditCustomIngredientModalOpen,
  setMealIngredients,
  setIngredientAction,
  setIngredientList,
} from "../../store/ingredientSlice";
import IngredientListItemActionBtn from "./IngredientListItemActionBtn";
import { useLocation } from "react-router";

const IngredientListItemActions = ({
  mealName,
  ingredient,
  actionList,
  listName,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { favoriteIngredients } = useSelector((state) => state.ingredient);

  const ingredients = useSelector((state) => state.ingredient[listName]);
  const addedIngredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealName]
  );

  // POST data to firebase
  const addFavoriteToFirebase = async (ingredient) => {
    await setDoc(doc(db, "favoriteIngredients", ingredient.id), ingredient);
  };

  // Log ingredient to list
  const handleLogIngredient = () => {
    const editableIngredient = { ...ingredient };
    dispatch(setIsEditIngredientModalOpen(true));
    dispatch(setEditableIngredient(editableIngredient));
    dispatch(setEditableIngredientInput(ingredient.amount));
    dispatch(setIngredientAction({ actionName: "log", listName: listName }));
  };

  // Update single ingredient action
  const handleUpdateIngredient = () => {
    if (listName === "customIngredients") {
      dispatch(toggleIsEditCustomIngredientModalOpen());
    } else {
      dispatch(setIsEditIngredientModalOpen(true));
      dispatch(setEditableIngredientInput(ingredient.amount));
      dispatch(
        setIngredientAction({
          actionName: "update",
          listName: listName,
        })
      );
    }

    dispatch(setEditableIngredient(ingredient));
  };

  // Add ingredient to favorites
  const handleAddToFavorites = (e) => {
    const { id } = ingredient;
    const existingIngredient = favoriteIngredients.find((ing) => ing.id === id);

    if (existingIngredient) {
      dispatch(
        setAddToFavoritesAlert({
          state: "error",
          message: "Az alapanyag már szerepel a kedvencek közt!",
          isShown: true,
        })
      );
    } else {
      addFavoriteToFirebase(ingredient);
      dispatch(
        setAddToFavoritesAlert({
          state: "success",
          message: "Hozzáadva a kedvencekhez!",
          isShown: true,
        })
      );
    }
  };
  // Remove single ingredient
  const handleRemoveIngredient = () => {
    let ingredientsCopy =
      listName === "addedIngredients"
        ? [...addedIngredients]
        : [...ingredients];

    const newIngredientList = ingredientsCopy.filter(
      (ing) => ing.id !== ingredient.id
    );

    if (listName === "addedIngredients") {
      (async function (mealName) {
        await setDoc(doc(db, listName, mealName), {
          ingredients: newIngredientList,
        });
        dispatch(
          setMealIngredients({
            mealName: mealName,
            ingredientList: newIngredientList,
          })
        );
      })(mealName);
    } else {
      (async function () {
        await deleteDoc(doc(db, listName, ingredient.id));
        dispatch(
          setIngredientList({
            listName: listName,
            ingredientList: newIngredientList,
          })
        );
      })();
    }

    /*
    dispatch(
      removeIngredient({
        ingredient: ingredient,
        mealName: mealName,
        listName: listName,
      })
    );*/

    const removedIngredient = {
      listName,
      ingredient,
    };
    dispatch(setLastRemoved(removedIngredient));
  };

  // Added ingredient list item actions
  const ingredientListActions = {
    log: {
      title: "Naplóz",
      icon: <IoIosAdd />,
      handler: handleLogIngredient,
    },
    update: {
      title: "Szerkeszt",
      icon: <CiEdit />,
      handler: handleUpdateIngredient,
    },
    addToFavorites: {
      title: "Kedvencekhez",
      icon: <CiHeart />,
      handler: handleAddToFavorites,
    },
    remove: {
      title: "Törlés",
      icon: <MdOutlineDelete />,
      handler: handleRemoveIngredient,
    },
  };

  return (
    <>
      <Stack direction="row">
        {!location.pathname.includes("custom-ingredients") ? (
          <QuickAddBtn mealName={mealName} ingredient={ingredient} />
        ) : (
          ""
        )}

        <Dropdown>
          <MenuButton
            slots={{ root: Button }}
            slotProps={{ root: { variant: "plain", color: "neutral" } }}
          >
            <HiOutlineDotsVertical />
          </MenuButton>
          <Menu
            placement="bottom-start"
            size="sm"
            sx={{ minWidth: "120px" }}
            color="neutral"
            variant="plain"
          >
            {actionList.map((action) => {
              return (
                <MenuItem key={action}>
                  <IngredientListItemActionBtn
                    ingredient={ingredient}
                    icon={ingredientListActions[action].icon}
                    title={ingredientListActions[action].title}
                    handler={ingredientListActions[action].handler}
                  />
                </MenuItem>
              );
            })}
          </Menu>
        </Dropdown>
      </Stack>
    </>
  );
};

export default IngredientListItemActions;
