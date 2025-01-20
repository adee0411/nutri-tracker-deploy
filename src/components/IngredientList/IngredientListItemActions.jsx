import db from "../../firebase/firestore_config";
import { doc, setDoc } from "firebase/firestore";

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
  setIsEditCustomIngredientModalOpen,
  setMealIngredients,
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
  const { editableIngredient, favoriteIngredients } = useSelector(
    (state) => state.ingredient
  );
  const { isEditIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );
  const ingredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealName]
  );

  const [selectedAction, setSelectedAction] = useState(null);

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
    setSelectedAction("log");
  };

  // Update single ingredient action
  const handleUpdateIngredient = () => {
    const editableIngredient = { ...ingredient };

    if (listName === "customIngredients") {
      dispatch(setIsEditCustomIngredientModalOpen());
    } else {
      dispatch(setIsEditIngredientModalOpen(true));
      dispatch(setEditableIngredientInput(ingredient.amount));
      setSelectedAction("update");
    }

    dispatch(setEditableIngredient(editableIngredient));
  };

  // Add ingredient to favorites
  const handleAddToFavorites = (e) => {
    const { id, amount } = ingredient;
    const existingIngredient = favoriteIngredients.find((ing) => ing.id === id);

    if (existingIngredient && amount === existingIngredient.amount) {
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
    let ingredientsCopy = [...ingredients];

    const newIngredientList = {
      ingredients: ingredientsCopy.filter((ing) => ing.id !== ingredient.id),
    };

    (async function (mealName) {
      await setDoc(doc(db, "addedIngredients", mealName), newIngredientList);
      dispatch(
        setMealIngredients({
          mealName: mealName,
          ingredientList: newIngredientList.ingredients,
        })
      );
    })(mealName);

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

      {editableIngredient ? (
        <EditIngredientModal
          isModalOpen={isEditIngredientModalOpen}
          ingredient={editableIngredient}
          ingredientAction={selectedAction}
          listName={listName}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default IngredientListItemActions;
