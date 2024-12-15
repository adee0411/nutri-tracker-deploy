import { CircularProgress, Typography, Stack } from "@mui/joy";

import AlertBox from "./AlertBox";

import BurnIcon from "../../icons/burn.svg";

const CalorieGoalDetails = ({ current, goal }) => {
  const ratio = Number((current / goal).toFixed(2));
  const ratioInPercentage = ratio * 100;

  const calorieDifference = current - goal;

  const progressColor = ratio >= 1 ? "danger" : "primary";

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
          <Typography level="title-sm">Jelenlegi</Typography>
          <Typography level="body-lg" fontWeight={800}>
            {current} cal
          </Typography>
        </Stack>
        <Stack flex={1}>
          <Typography level="title-sm">Cél</Typography>
          <Typography level="body-lg" fontWeight={800}>
            {goal} cal
          </Typography>
        </Stack>
        <Stack flex={1}>
          <Typography level="title-sm">Maradt</Typography>
          <Typography
            level="body-lg"
            fontWeight={800}
            color={calorieDifference > 0 ? "danger" : ""}
          >
            {-calorieDifference} cal
          </Typography>
        </Stack>
      </Stack>
      {calorieDifference > 0 ? (
        <AlertBox calorieDifference={calorieDifference} />
      ) : (
        ""
      )}
    </Stack>
  );
};

export default CalorieGoalDetails;
