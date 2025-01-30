import { Stack } from "@mui/joy";

import BreakFastIcon from "../../icons/breakfast.svg";
import LunchIcon from "../../icons/lunch.svg";
import SnackIcon from "../../icons/snack.svg";

const mealIcons = {
  breakfast: BreakFastIcon,
  meal: LunchIcon,
  snack: SnackIcon,
};

const MealButtonLabel = ({ title }) => {
  const isMeal = title.includes("meal"); // Check if meal's title is Meal (number)
  const mealIcon = isMeal ? "meal" : title;

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <img src={mealIcons[mealIcon]} alt="breakfast-icon" width={32} />
    </Stack>
  );
};

export default MealButtonLabel;
