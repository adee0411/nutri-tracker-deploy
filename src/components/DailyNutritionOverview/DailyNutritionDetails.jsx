import { Stack } from "@mui/joy";

import CalorieGoalDetails from "./CalorieGoalDetails";
import MacroDetailTab from "./MacroDetailTab";
import MealList from "../MealEditor/MealList";

const DailyNutritionDetails = () => {
  return (
    <Stack gap={3} px={3} py={1}>
      <CalorieGoalDetails current={2600} goal={2500} />
      <MacroDetailTab />
      <MealList />
    </Stack>
  );
};

export default DailyNutritionDetails;
