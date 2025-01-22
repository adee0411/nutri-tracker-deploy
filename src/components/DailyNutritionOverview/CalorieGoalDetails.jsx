import { CircularProgress, Typography, Stack } from "@mui/joy";
import { useCountUp } from "use-count-up";

import AlertBox from "./AlertBox";

import BurnIcon from "../../icons/burn.svg";
import DailyGoalProgress from "../DailyGoalProgress";

const CalorieGoalDetails = ({ current, goal }) => {
  const calorieDifference = current - goal;

  return (
    <Stack alignItems="center" gap={2}>
      <DailyGoalProgress current={current} goal={goal} size="md" />

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
