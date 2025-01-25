import { Stack, Snackbar, Typography } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import IngredientListHeader from "./IngredientListHeader";
import IngredientList from "./IngredientList";

import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";

import { setIngredientActionFeedback } from "../../store/ingredientSlice";

const SnackBarIcons = {
  error: <VscError />,
  success: <CiCircleCheck />,
};

const AddedIngredients = ({ ingredientList }) => {
  const dispatch = useDispatch();

  const { ingredientActionFeedback } = useSelector(
    (state) => state.ingredient.UI
  );

  const actionList = ["update", "addToFavorites", "remove"];

  const addedListActions = ["add", "empty", "backup"];

  return (
    <>
      <Stack my={4} gap={2}>
        <IngredientListHeader
          listTitle="Alapanyagok"
          listName="addedIngredients"
          listActions={addedListActions}
        />
        <IngredientList
          ingredientList={ingredientList}
          actionList={actionList}
          listName="addedIngredients"
        />
      </Stack>
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
      >
        <Typography
          color={
            ingredientActionFeedback.state === "error" ? "danger" : "success"
          }
          level="body-sm"
        >
          {ingredientActionFeedback.message}
        </Typography>
      </Snackbar>
    </>
  );
};

export default AddedIngredients;
