import { Button, Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import EditIngredientModal from "./EditIngredientModal";

import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";

import {
  removeIngredient,
  addIngredient,
  setEditableIngredient,
  setIsEditIngredientModalOpen,
} from "../../store/ingredientSlie";

const IngredientListItemActions = ({ mealName, ingredientID }) => {
  const dispatch = useDispatch();
  const { ingredientList } = useSelector((state) => state.ingredient);
  const { isEditIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );

  const ingredient = ingredientList[mealName].find(
    (ingredient) => ingredient.id === ingredientID
  );

  const handleRemoveIngredient = (e) => {
    const ingredientID = e.currentTarget.value;

    dispatch(
      removeIngredient({ ingredientID: ingredientID, mealName: mealName })
    );
  };

  const handleAddIngredientAgain = (e) => {
    dispatch(addIngredient({ mealName: mealName, ingredient: ingredient }));
  };

  const handleEditIngredient = (e) => {
    const ingredientID = e.target.id;
    dispatch(setEditableIngredient(ingredientID));
    dispatch(setIsEditIngredientModalOpen(true));
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
          sx={{ minWingredientIDth: "120px" }}
          color="neutral"
          variant="plain"
        >
          <MenuItem>
            <Button
              value={ingredientID}
              size="sm"
              startDecorator="Add again"
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
              id={ingredientID}
            ></Button>
          </MenuItem>
          <MenuItem>
            <Button
              value={ingredientID}
              size="sm"
              startDecorator="Edit"
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
              id={ingredientID}
              onClick={handleEditIngredient}
            ></Button>
          </MenuItem>
          <MenuItem>
            <Button
              value={ingredientID}
              size="sm"
              startDecorator="Delete"
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
      <EditIngredientModal
        ingredient={ingredientList[mealName][0]}
        isModalOpen={isEditIngredientModalOpen}
      />
    </>
  );
};

export default IngredientListItemActions;
