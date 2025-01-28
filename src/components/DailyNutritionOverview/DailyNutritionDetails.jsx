import { Stack } from "@mui/joy";

import { useSelector } from "react-redux";

import CalorieGoalDetails from "./CalorieGoalDetails";
import MacroDetailTab from "./MacroDetailTab";
import MealList from "../MealEditor/MealList";

const DailyNutritionDetails = ({ totalNutritionData }) => {
  const { calorieGoal } = useSelector((state) => state.profile.profileData);
  return (
    <Stack gap={6}>
      <CalorieGoalDetails
        current={totalNutritionData.energy}
        goal={calorieGoal}
      />
      <MacroDetailTab totalNutritionData={totalNutritionData} />
      <MealList />
    </Stack>
  );
};

export default DailyNutritionDetails;
