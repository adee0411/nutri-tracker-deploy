// General Component for a certain macro type

import { Stack, Typography, LinearProgress } from "@mui/joy";

const MacroGoalDetails = ({ macroType, goal, current, color }) => {
  const ratio = Number((current / goal).toFixed(1));
  const ratioInPercent = Number((ratio * 100).toFixed(0));

  return (
    <Stack gap={2} sx={{ flex: 1 }}>
      <Typography textAlign="center" level="title-sm">
        {macroType}
      </Typography>
      <LinearProgress
        determinate
        value={ratioInPercent > 100 ? 100 : ratioInPercent}
        sx={{ width: "80%", alignSelf: "center" }}
        color={color}
        variant="solid"
      ></LinearProgress>
      <Stack>
        <Typography level="body-sm" textAlign="center">
          {current} g / {goal} g
        </Typography>
        <Typography level="body-sm" textAlign="center">
          ({ratioInPercent}%)
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MacroGoalDetails;
