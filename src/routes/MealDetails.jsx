import { Sheet, Stack, Typography } from "@mui/joy";

import { useParams } from "react-router";

import MealOverviewCard from "../components/MealEditor/MealOverviewCard";
import IngredientList from "../components/IngredientList/IngredientList";

import BreakFastIcon from "../icons/breakfast.svg";
import LunchIcon from "../icons/lunch.svg";
import SnackIcon from "../icons/snack.svg";

const MealDetails = () => {
  const params = useParams();
  const mealTitle = params.mealTitle;

  return (
    <Stack px={4} py={2} gap={2}>
      <Typography level="title-lg" textAlign="center">
        2024. 11. 18.
      </Typography>

      <MealOverviewCard mealTitle={mealTitle} />

      <IngredientList />
    </Stack>
  );
};

export default MealDetails;
