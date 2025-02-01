// General Component for a certain macro type

import { Stack, Typography, LinearProgress } from "@mui/joy";

import { useCountUp } from "use-count-up";

const MacroGoalDetails = ({ macroType, goal, current, color }) => {
  const ratio = Number((current / goal).toFixed(1));
  const ratioInPercent = Number((ratio * 100).toFixed(0));

  const { value, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: ratioInPercent,
    easing: "easeOutCubic",
  });

  return (
    <Stack gap={1} sx={{ flex: 1 }}>
      <Typography textAlign="center" level="body-sm" fontSize={12}>
        {macroType}
      </Typography>
      <LinearProgress
        determinate
        value={+value > 100 ? 100 : +value}
        sx={{ width: "80%", alignSelf: "center" }}
        color={color}
        variant="solid"
        thickness={3}
      ></LinearProgress>
      <Stack>
        <Typography level="body-sm" fontSize={12} textAlign="center">
          {current} g / {goal} g
        </Typography>
        <Typography level="body-sm" fontSize={12} textAlign="center">
          ({ratioInPercent}%)
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MacroGoalDetails;
