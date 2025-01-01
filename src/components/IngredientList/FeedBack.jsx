import { Alert } from "@mui/joy";

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
    >
      {icons[alertDetails.state]}
      {alertDetails.message}
    </Alert>
  );
};

export default FeedBack;
