import { Snackbar, Typography } from "@mui/joy";

import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setAddToFavoritesAlert } from "../../store/ingredientSlice";

const icons = {
  success: <CiCircleCheck />,
  error: <VscError />,
};

const FeedBack = ({ alertDetails, open }) => {
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={open}
      color={alertDetails.state === "error" ? "danger" : "success"}
      variant="soft"
      startDecorator={icons[alertDetails.state]}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={2000}
      onClose={() =>
        dispatch(
          setAddToFavoritesAlert({
            state: "",
            isShown: false,
            message: "",
          })
        )
      }
    >
      <Typography
        level="body-sm"
        color={alertDetails.state === "error" ? "danger" : "success"}
      >
        {" "}
        {alertDetails.message}
      </Typography>
    </Snackbar>
  );
};

export default FeedBack;
