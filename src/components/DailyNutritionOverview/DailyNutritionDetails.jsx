import { Stack, Typography } from "@mui/joy";

import { useSelector } from "react-redux";

import CalorieGoalDetails from "./CalorieGoalDetails";
import MacroDetailTab from "./MacroDetailTab";
import MealList from "../MealEditor/MealList";

const DailyNutritionDetails = ({ totalNutritionData }) => {
  const { name, calorieGoal } = useSelector(
    (state) => state.profile.profileData
  );
  const { currentCalorie } = useSelector((state) => state.profile.dietData);
  return (
    <Stack gap={3} px={3} py={1}>
      <Typography level="title-lg">Üdv, {name}!</Typography>
      <CalorieGoalDetails
        current={totalNutritionData.energy}
        goal={calorieGoal}
      />
      <MacroDetailTab />
      <MealList />
    </Stack>
  );
};

export default DailyNutritionDetails;
