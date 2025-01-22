import { CircularProgress, Typography } from "@mui/joy";

import { useCountUp } from "use-count-up";

import BurnIcon from "../icons/burn.svg";

const DailyGoalProgress = ({ current, goal, size }) => {
  const ProgressSizes = {
    sm: { thickness: 2, dimension: 80, fontSize: 12 },
    md: { thickness: 4, dimension: 100, fontSize: 16 },
    lg: { thickness: 6, dimension: 120, fontSize: 20 },
  };
  const ratio = Number((current / goal).toFixed(2));
  const ratioInPercentage = Number((ratio * 100).toFixed(0));

  const progressColor = ratio >= 1 ? "danger" : "primary";

  const { value, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: ratioInPercentage,
    easing: "easeOutCubic",
  });
  return (
    <CircularProgress
      determinate
      value={Number(value) >= 100 ? 100 : Number(value)}
      sx={{ "--CircularProgress-size": `${ProgressSizes[size].dimension}px` }}
      color={progressColor}
      key="calorieRatio"
      thickness={ProgressSizes[size].thickness}
    >
      <div style={{ width: "32px" }}>
        <img src={BurnIcon} alt="burn-icon" width="100%" />
      </div>
      <Typography
        color="neutral"
        variant="plain"
        fontSize={ProgressSizes[size].fontSize}
      >
        {ratioInPercentage}%
      </Typography>
    </CircularProgress>
  );
};

export default DailyGoalProgress;
