import { Button, Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import EditIngredientModal from "./EditIngredientModal";

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
} from "../../store/ingredientSlie";
import IngredientListItemActionBtn from "./IngredientListItemActionBtn";

const IngredientListItemActions = ({ mealName, ingredient }) => {
  const dispatch = useDispatch();
  const { editableIngredient, favoriteIngredients } = useSelector(
    (state) => state.ingredient
  );
  const { isEditIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );

  // Add the same ingredient (duplicate) again action
  const handleAddIngredientAgain = (e) => {
    dispatch(addIngredient({ mealName: mealName, ingredient: ingredient }));
  };

  // Update single ingredient action
  const handleUpdateIngredient = (e) => {
    const editableIngredient = { ...ingredient };
    dispatch(setIsEditIngredientModalOpen(true));
  };

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
      dispatch(addFavoriteIngredient(ingredient));
      dispatch(
        setAddToFavoritesAlert({
          state: "success",
          message: "Hozzáadva a kedvencekhez!",
          isShown: true,
        })
      );
    }
  };
  // Remove single ingredient action
  const handleRemoveIngredient = (e) => {
    dispatch(
      removeIngredient({ ingredientID: ingredient.id, mealName: mealName })
    );
  };

  // Added ingredient list item actions
  const ingredientListActions = {
    addAgain: {
      title: "Hozzáadás ismét",
      icon: <IoIosAdd />,
      handler: handleAddIngredientAgain,
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
          {Object.entries(ingredientListActions).map((action) => {
            const { title, icon, handler } = action[1];
            return (
              <MenuItem key={action[0]}>
                <IngredientListItemActionBtn
                  ingredient={ingredient}
                  icon={icon}
                  title={title}
                  handler={handler}
                />
              </MenuItem>
            );
          })}
        </Menu>
      </Dropdown>
      {editableIngredient ? (
        <EditIngredientModal
          isModalOpen={isEditIngredientModalOpen}
          ingredient={editableIngredient}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default IngredientListItemActions;
