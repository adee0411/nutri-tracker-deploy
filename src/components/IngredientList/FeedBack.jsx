import { Alert, Typography } from "@mui/joy";

import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";

const icons = {
  success: <CiCircleCheck />,
  error: <VscError />,
};

const FeedBack = ({ alertDetails }) => {
  return (
    <Alert
      color={alertDetails.state === "error" ? "danger" : "success"}
      variant="soft"
      startDecorator={icons[alertDetails.state]}
    >
      <Typography
        level="body-sm"
        color={alertDetails.state === "error" ? "danger" : "success"}
      >
        {" "}
        {alertDetails.message}
      </Typography>
    </Alert>
  );
};

export default FeedBack;
