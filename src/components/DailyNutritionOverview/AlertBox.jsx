import { Alert, Stack, Typography, List, ListItem, Sheet } from "@mui/joy";

import { IoFootsteps } from "react-icons/io5";
import { GrRun } from "react-icons/gr";
import { IoBicycleSharp } from "react-icons/io5";

const AlertBox = ({ calorieDifference }) => {
  return (
    <Alert variant="soft" color="warning" size="sm" sx={{ width: "100%" }}>
      <Typography textAlign="center" level="body-sm" width="inherit">
        A mai napon{" "}
        <Typography fontWeight={700}>{calorieDifference} kcal</Typography>{" "}
        többletben vagy a célhoz képest!
      </Typography>{" "}
    </Alert>
  );
};

export default AlertBox;
