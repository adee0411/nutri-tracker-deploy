import { ButtonGroup, IconButton } from "@mui/joy";

import { IoIosAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  emptyList,
  addIngredient,
  addFavoriteIngredient,
  addCustomIngredient,
  setLastRemoved,
  toggleView,
} from "../../store/ingredientSlice";

const IngredientListActions = ({ listName, listActions }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mealName = useParams().mealTitle;
  const { lastRemoved } = useSelector((state) => state.ingredient);

  const handleAddIngredient = () => {
    navigate("add-food");
  };

  const handleEmptyList = () => {
    dispatch(emptyList({ listName: listName, mealName: mealName }));
  };

  const handleBackupIngredient = () => {
    switch (lastRemoved.listName) {
      case "addedIngredients":
        dispatch(
          addIngredient({
            mealName: mealName,
            ingredient: lastRemoved.ingredient,
          })
        );
        break;

      case "favoriteIngredients":
        dispatch(addFavoriteIngredient(lastRemoved.ingredient));
        break;

      case "customIngredients":
        dispatch(addCustomIngredient(lastRemoved.ingredient));
        break;

      default:
        return;
    }
    dispatch(setLastRemoved(null));
  };

  const handleToggleView = () => {
    dispatch(toggleView());
  };

  const listActionsObj = {
    add: {
      icon: <IoIosAddCircleOutline />,
      title: "Alapanyag hozzáadása",
      handler: handleAddIngredient,
    },
    empty: {
      icon: <CiTrash />,
      title: "Lista ürítése",
      handler: handleEmptyList,
    },
    backup: {
      icon: <IoIosRefresh />,
      title: "Visszavonás",
      handler: handleBackupIngredient,
    },
    view: {
      icon: <CiViewList />,
      title: "Nézet",
      handler: handleToggleView,
    },
  };
  return (
    <ButtonGroup size="sm">
      {listActions.map((action) => {
        return (
          <IconButton
            title={listActionsObj[action].title}
            sx={{ fontSize: 18 }}
            variant={action === "add" ? "solid" : ""}
            color={action === "add" ? "primary" : ""}
            onClick={listActionsObj[action].handler}
            key={action}
            disabled={
              (!lastRemoved || lastRemoved.listName !== listName) &&
              action === "backup"
            }
          >
            {listActionsObj[action].icon}
          </IconButton>
        );
      })}
    </ButtonGroup>
  );
};

export default IngredientListActions;
