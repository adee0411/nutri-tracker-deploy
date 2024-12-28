import { Button, Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import EditIngredientModal from "./EditIngredientModal";

import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

import {
  removeIngredient,
  addIngredient,
  setIsEditIngredientModalOpen,
  addFavoriteIngredient,
} from "../../store/ingredientSlie";

const IngredientListItemActions = ({ mealName, ingredient, actions }) => {
  const dispatch = useDispatch();
  const { editableIngredient } = useSelector((state) => state.ingredient);
  const { isEditIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );

  // Remove single ingredient action
  const handleRemoveIngredient = (e) => {
    dispatch(
      removeIngredient({ ingredientID: ingredient.id, mealName: mealName })
    );
  };

  // Add the same ingredient (duplicate) again action
  const handleAddIngredientAgain = (e) => {
    dispatch(addIngredient({ mealName: mealName, ingredient: ingredient }));
  };

  // Update single ingredient action
  const handleEditIngredient = (e) => {
    const editableIngredient = { ...ingredient };
    dispatch(setIsEditIngredientModalOpen(true));
  };

  const handleAddToFavorites = (e) => {
    dispatch(addFavoriteIngredient(ingredient));
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
          <MenuItem>
            <Button
              value={ingredient.id}
              size="sm"
              startDecorator="Hozzáadás újra"
              endDecorator={<IoIosAdd />}
              color="neutral"
              variant="plain"
              fullWidth
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
                justifyContent: "space-between",
              }}
              onClick={handleAddIngredientAgain}
              id={ingredient.id}
            ></Button>
          </MenuItem>
          <MenuItem>
            <Button
              value={ingredient.id}
              size="sm"
              startDecorator="Szerkesztés"
              endDecorator={<CiEdit />}
              color="neutral"
              variant="plain"
              fullWidth
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
                justifyContent: "space-between",
              }}
              id={ingredient.id}
              onClick={handleEditIngredient}
            ></Button>
          </MenuItem>
          <MenuItem>
            <Button
              value={ingredient.id}
              size="sm"
              startDecorator="Kedvencekhez"
              endDecorator={<CiHeart />}
              color="neutral"
              variant="plain"
              fullWidth
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
                justifyContent: "space-between",
              }}
              onClick={handleAddToFavorites}
            ></Button>
          </MenuItem>
          <MenuItem>
            <Button
              value={ingredient.id}
              size="sm"
              startDecorator="Törlés"
              endDecorator={<MdOutlineDelete />}
              color="danger"
              variant="plain"
              fullWidth
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
                justifyContent: "space-between",
              }}
              onClick={handleRemoveIngredient}
            ></Button>
          </MenuItem>
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
