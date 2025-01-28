import { ButtonGroup, IconButton, Stack } from "@mui/joy";

import { IoIosAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  addIngredient,
  addFavoriteIngredient,
  addCustomIngredient,
  setLastRemoved,
  toggleView,
  toggleIsConfirmEmptyListModalOpen,
  setEmptyListName,
} from "../../store/ingredientSlice";

const IngredientListActions = ({ listName, listActions }) => {
  const dispatch = useDispatch();
  const mealName = useParams().mealTitle;
  const { lastRemoved } = useSelector((state) => state.ingredient);

  const handleEmptyList = () => {
    //dispatch(emptyList({ listName: listName, mealName: mealName }));
    dispatch(toggleIsConfirmEmptyListModalOpen());
    dispatch(setEmptyListName(listName));
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
    <Stack direction="row" gap={4}>
      {listName === "addedIngredients" || listName === "customIngredients" ? (
        <IconButton color="primary" variant="solid">
          <Link
            to={
              listName === "addedIngredients"
                ? "add-food"
                : "/custom-ingredients"
            }
            style={{
              all: "unset",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "2px 8px",
            }}
            title={
              listName === "addedIngredients"
                ? "Alapanyag hozzáadása"
                : "Saját alapanyag hozzáadása"
            }
            viewTransition
          >
            <IoIosAddCircleOutline fontSize={22} />
          </Link>
        </IconButton>
      ) : (
        ""
      )}

      <ButtonGroup size="lg">
        {listActions.map((action) => {
          return (
            <IconButton
              title={listActionsObj[action].title}
              sx={{ fontSize: 22 }}
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
    </Stack>
  );
};

export default IngredientListActions;
