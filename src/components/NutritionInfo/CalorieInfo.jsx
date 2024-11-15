import {
  CircularProgress,
  Typography,
  Stack,
  Alert,
  List,
  ListItem,
  Sheet,
} from "@mui/joy";

import BurnIcon from "../../icons/burn.svg";

import { IoFootsteps } from "react-icons/io5";
import { GrRun } from "react-icons/gr";
import { IoBicycleSharp } from "react-icons/io5";

const CalorieInfo = ({ current, goal }) => {
  const ratio = Number((current / goal).toFixed(2));
  const ratioInPercentage = ratio * 100;

  const calorieDifference = current - goal;

  const progressColor = ratio >= 1 ? "danger" : "primary";

  const alertBox = (
    <Alert variant="soft" color="warning">
      <Stack gap={2}>
        <Typography textAlign="center">
          You are in{" "}
          <Typography fontWeight={800}>{calorieDifference} cal</Typography>{" "}
          surplus! Don't worry, you can burn some extra calories today!
        </Typography>{" "}
        <List
          orientation="horizontal"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItem sx={{ textAlign: "center" }}>
            <Sheet
              variant="outlined"
              color="warning"
              sx={{ p: 1, borderRadius: 8, backgroundColor: "transparent" }}
            >
              <IoBicycleSharp />
              <Typography fontWeight={800}>20 min</Typography>
              <Typography>Cycling</Typography>
            </Sheet>
          </ListItem>
          <ListItem sx={{ textAlign: "center" }}>
            <Sheet
              variant="outlined"
              color="warning"
              sx={{ p: 1, borderRadius: 8, backgroundColor: "transparent" }}
            >
              <GrRun />
              <Typography fontWeight={800}>15 min</Typography>
              <Typography>Running</Typography>
            </Sheet>
          </ListItem>
          <ListItem sx={{ textAlign: "center" }}>
            <Sheet
              variant="outlined"
              color="warning"
              sx={{ p: 1, borderRadius: 8, backgroundColor: "transparent" }}
            >
              <IoFootsteps />
              <Typography fontWeight={800}>40 min</Typography>
              <Typography>Walking</Typography>
            </Sheet>
          </ListItem>
        </List>
      </Stack>
    </Alert>
  );
  return (
    <Stack alignItems="center" gap={2}>
      <CircularProgress
        determinate
        value={ratioInPercentage >= 100 ? 100 : ratioInPercentage}
        sx={{ "--CircularProgress-size": "120px" }}
        color={progressColor}
      >
        <div style={{ width: "32px" }}>
          <img src={BurnIcon} alt="burn-icon" width="100%" />
        </div>
        <Typography color="neutral" variant="plain" fontSize={18}>
          {ratioInPercentage}%
        </Typography>
      </CircularProgress>

      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        textAlign="center"
      >
        <Stack flex={1}>
          <Typography level="title-sm">Current</Typography>
          <Typography level="body-lg" fontWeight={800}>
            {current} cal
          </Typography>
        </Stack>
        <Stack flex={1}>
          <Typography level="title-sm">Goal</Typography>
          <Typography level="body-lg" fontWeight={800}>
            {goal} cal
          </Typography>
        </Stack>
        <Stack flex={1}>
          <Typography level="title-sm">Left</Typography>
          <Typography
            level="body-lg"
            fontWeight={800}
            color={calorieDifference > 0 ? "danger" : ""}
          >
            {-calorieDifference} cal
          </Typography>
        </Stack>
      </Stack>
      {calorieDifference > 0 ? alertBox : ""}
    </Stack>
  );
};

export default CalorieInfo;
