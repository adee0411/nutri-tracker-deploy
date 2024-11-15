import { Stack } from "@mui/joy";

import CalorieInfo from "./CalorieInfo";
import MacroInfo from "./MacroInfo";

const NutritionInfo = () => {
  return (
    <Stack gap={3} px={3} py={1}>
      <CalorieInfo current={2200} goal={2500} />
      <MacroInfo />
    </Stack>
  );
};

export default NutritionInfo;
