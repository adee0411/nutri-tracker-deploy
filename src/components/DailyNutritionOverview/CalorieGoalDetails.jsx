import { Typography, Stack } from "@mui/joy";

import AlertBox from "./AlertBox";

import DailyGoalProgress from "../DailyGoalProgress";

const CalorieGoalDetails = ({ current, goal }) => {
  const calorieDifference = current - goal;

  return (
    <Stack alignItems="center" gap={2}>
      <DailyGoalProgress
        current={current}
        goal={goal}
        size="md"
        type="circular"
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        textAlign="center"
      >
        <Stack flex={1} sx={{ position: "relative", top: -30 }}>
          <Typography level="title-sm">Bevitt</Typography>
          <Typography level="body-sm" fontWeight={800}>
            {current} kcal
          </Typography>
        </Stack>

        <Stack flex={1}>
          <Typography
            level="title-sm"
            color={calorieDifference > 0 ? "danger" : "primary"}
          >
            {calorieDifference > 0 ? "Túllépve" : "Maradt"}
          </Typography>
          <Typography
            level="body-lg"
            fontWeight={800}
            color={calorieDifference > 0 ? "danger" : "primary"}
          >
            {calorieDifference} kcal
          </Typography>
        </Stack>
        <Stack flex={1} sx={{ position: "relative", top: -30 }}>
          <Typography level="title-sm">Cél</Typography>
          <Typography level="body-sm" fontWeight={800}>
            {goal} kcal
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
