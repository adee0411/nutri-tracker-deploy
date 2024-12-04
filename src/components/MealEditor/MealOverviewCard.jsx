import { Sheet, Typography, Stack } from "@mui/joy";

import BreakfastImg from "../../img/breakfast.png";
import LunchImg from "../../img/lunch.png";
import SnackImg from "../../img/snack.png";

const mealImages = {
  breakfast: BreakfastImg,
  meal: LunchImg,
  snack: SnackImg,
};

const MealOverviewCard = ({ mealTitle }) => {
  const isMeal = mealTitle.includes("meal"); // Check if meal's title is Meal (number)
  const mealImage = isMeal ? "meal" : mealTitle;
  const formattedMealTitle = isMeal
    ? "Meal " + mealTitle.at(-1)
    : mealTitle[0].toUpperCase() + mealTitle.slice(1); // Format Meal title if Meal (number);
  return (
    <Sheet
      color="primary"
      variant="plain"
      sx={{
        borderRadius: "sm",
        p: 1.5,
        backgroundColor: "transparent",
        backgroundImage: `url(${mealImages[mealImage]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "150px",
        backgroundPosition: "left center",
        boxShadow: "md",
      }}
    >
      <Stack gap={3} width="65%" marginLeft="auto">
        <Typography level="title-lg" textAlign="center">
          {formattedMealTitle}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          textAlign="center"
          width="80%"
          m="0 auto"
        >
          <Stack>
            <Typography level="title-sm">Carb</Typography>
            <Typography level="body-sm">276 g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Protein</Typography>
            <Typography level="body-sm">47 g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Fat</Typography>
            <Typography level="body-sm">18 g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Energy</Typography>
            <Typography level="body-sm">659 cal</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default MealOverviewCard;
