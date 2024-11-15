import { Stack, Typography, LinearProgress } from "@mui/joy";

const MacroCard = ({ macroType, goal, current, color }) => {
  const ratio = Number((current / goal).toFixed(1));
  const ratioInPercent = ratio * 100;

  return (
    <Stack gap={2} sx={{ flex: 1 }}>
      <Typography textAlign="center" level="title-sm">
        {macroType}
      </Typography>
      <LinearProgress
        determinate
        value={ratioInPercent}
        sx={{ width: "80%", alignSelf: "center" }}
        color={color}
        variant="solid"
      ></LinearProgress>
      <Stack>
        <Typography level="body-sm" textAlign="center">
          {current}g / {goal}g
        </Typography>
        <Typography level="body-sm" textAlign="center">
          ({ratioInPercent}%)
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MacroCard;
