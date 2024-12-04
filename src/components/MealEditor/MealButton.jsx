import { Button, Stack, Typography } from "@mui/joy";

import MacroData from "./MacroData";
import { Link } from "react-router-dom";

import BreakFastIcon from "../../icons/breakfast.svg";
import LunchIcon from "../../icons/lunch.svg";
import SnackIcon from "../../icons/snack.svg";

const mealIcons = {
  breakfast: BreakFastIcon,
  meal: LunchIcon,
  snack: SnackIcon,
};

const MealButton = ({ nutritionData, title }) => {
  const isMeal = title.includes("meal"); // Check if meal's title is Meal (number)
  const mealIcon = isMeal ? "meal" : title;
  const formattedMealTitle = isMeal
    ? "Meal " + title.at(-1)
    : title[0].toUpperCase() + title.slice(1); // Format Meal title if Meal (number)
  return (
    <Button variant="soft" color="neutral" sx={{ p: 0 }}>
      <Link
        to={title}
        style={{
          all: "unset",
          display: "block",
          width: "100%",
          height: "100%",
          padding: "12px",
        }}
      >
        <Stack
          direction="row"
          flex={1}
          gap={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" gap={1}>
            <img src={mealIcons[mealIcon]} alt="breakfast-icon" width={24} />
            <Typography> {formattedMealTitle}</Typography>
          </Stack>

          <Stack direction="row" gap={1} justifyContent="space-between">
            {Object.entries(nutritionData).map((macroData) => {
              return <MacroData data={macroData} key={macroData[0]} />;
            })}
          </Stack>
        </Stack>
      </Link>
    </Button>
  );
};

export default MealButton;
