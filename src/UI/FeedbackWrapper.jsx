import { Snackbar, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import { setIngredientActionFeedback } from "../store/ingredientSlice";

import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";

const SnackBarIcons = {
  error: <VscError />,
  success: <CiCircleCheck />,
};

const FeedbackWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const { ingredientActionFeedback } = useSelector(
    (state) => state.ingredient.UI
  );
  return (
    <>
      {children}
      <Snackbar
        open={ingredientActionFeedback.isShown}
        color={
          ingredientActionFeedback.state === "error" ? "danger" : "success"
        }
        variant="soft"
        size="sm"
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
        slotProps={{ startDecorator: { style: { fontSize: 24 } } }}
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

export default FeedbackWrapper;
