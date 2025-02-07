import db from "../../firebase/firestore_config";
import { doc, setDoc } from "firebase/firestore";

import { ButtonGroup, IconButton, Stack, Typography } from "@mui/joy";

import { IoIosAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { Link, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleView,
  toggleIsConfirmEmptyListModalOpen,
  setEmptyListName,
  setMealIngredients,
  setLastRemoved,
} from "../../store/ingredientSlice";

const IngredientListActions = ({ listName, listActions }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const mealName = useParams().mealTitle;
  const { lastRemoved } = useSelector((state) => state.ingredient);
  const mealIngredients = useSelector(
    (state) => state.ingredient.addedIngredients[mealName]
  );

  const handleEmptyList = () => {
    //dispatch(emptyList({ listName: listName, mealName: mealName }));
    dispatch(toggleIsConfirmEmptyListModalOpen());
    dispatch(setEmptyListName(listName));
  };

  const handleBackupIngredient = () => {
    let ingredientList, restoredList;
    ingredientList = [...mealIngredients];
    ingredientList.push(lastRemoved.ingredient);

    restoredList = {
      ingredients: [...ingredientList],
    };

    (async function (mealName) {
      try {
        await setDoc(doc(db, "addedIngredients", mealName), restoredList);
      } catch (e) {
        console.log(e);
      }

      dispatch(
        setMealIngredients({
          mealName: mealName,
          ingredientList: restoredList.ingredients,
        })
      );

      dispatch(setLastRemoved(null));
    })(mealName);
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
    <Stack direction="row" gap={2}>
      {listName === "addedIngredients" ||
      (listName === "customIngredients" &&
        !location.pathname.includes("custom-ingredients")) ? (
        <IconButton color="primary" variant="solid" size="sm">
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
              fontSize: 10,
            }}
            title={
              listName === "addedIngredients"
                ? "Alapanyag hozzáadása"
                : "Saját alapanyag hozzáadása"
            }
            viewTransition
          >
            <IoIosAddCircleOutline fontSize={16} />
            {listName === "addedIngredients" ? "Naplóz" : "Szerkeszt"}
          </Link>
        </IconButton>
      ) : (
        ""
      )}

      <ButtonGroup size="sm">
        {listActions.map((action) => {
          return (
            <IconButton
              title={listActionsObj[action].title}
              sx={{ fontSize: 16 }}
              onClick={listActionsObj[action].handler}
              key={action}
              disabled={
                (!lastRemoved || lastRemoved.listName !== listName) &&
                action === "backup"
              }
            >
              <Typography
                color={action === "empty" ? "danger" : ""}
                component="span"
              >
                {listActionsObj[action].icon}
              </Typography>
            </IconButton>
          );
        })}
      </ButtonGroup>
    </Stack>
  );
};

export default IngredientListActions;
