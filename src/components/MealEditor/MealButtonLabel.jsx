import { Stack, Typography } from "@mui/joy";

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
  const formattedMealTitle = isMeal
    ? "Meal " + title.at(-1)
    : title[0].toUpperCase() + title.slice(1); // Format Meal title if Meal (number)
  return (
    <Stack direction="row" gap={1}>
      <img src={mealIcons[mealIcon]} alt="breakfast-icon" width={24} />
      <Typography> {formattedMealTitle}</Typography>
    </Stack>
  );
};

export default MealButtonLabel;
