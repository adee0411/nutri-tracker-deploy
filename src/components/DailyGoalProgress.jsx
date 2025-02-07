import { CircularProgress, LinearProgress, Typography } from "@mui/joy";

import { useCountUp } from "use-count-up";

import BurnIcon from "../icons/burn.svg";

const DailyGoalProgress = ({ current, goal, size, type }) => {
  const ProgressSizes = {
    sm: { thickness: 2, dimension: 60, fontSize: 12 },
    md: { thickness: 3, dimension: 100, fontSize: 16 },
    lg: { thickness: 4, dimension: 120, fontSize: 20 },
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
    <>
      {type === "circular" ? (
        <CircularProgress
          determinate
          value={Number(value) >= 100 ? 100 : Number(value)}
          sx={{
            "--CircularProgress-size": `${ProgressSizes[size].dimension}px`,
          }}
          color={progressColor}
          key="calorieRatio"
          thickness={ProgressSizes[size].thickness}
        >
          <div style={{ width: `${ProgressSizes[size].fontSize * 2}px` }}>
            <img src={BurnIcon} alt="burn-icon" width="100%" />
          </div>
          {size === "sm" ? (
            ""
          ) : (
            <Typography
              color="neutral"
              variant="plain"
              fontSize={ProgressSizes[size].fontSize}
            >
              {ratioInPercentage}%
            </Typography>
          )}
        </CircularProgress>
      ) : (
        <LinearProgress
          determinate
          value={Number(value) >= 100 ? 100 : Number(value)}
          color={progressColor}
          key="calorieRatio"
          size={size}
        ></LinearProgress>
      )}
    </>
  );
};

export default DailyGoalProgress;
