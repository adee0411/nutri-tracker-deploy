import { Stack } from "@mui/joy";

import MacroGoalDetails from "./MacroGoalDetails";

const TabContent = ({ macroGoal, currentMacro }) => {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <MacroGoalDetails
        macroType="Szénhidrát"
        goal={macroGoal.carb}
        current={currentMacro.carb}
        color="primary"
      />
      <MacroGoalDetails
        macroType="Fehérje"
        goal={macroGoal.protein}
        current={currentMacro.protein}
        color="warning"
      />
      <MacroGoalDetails
        macroType="Zsír"
        goal={macroGoal.fat}
        current={currentMacro.fat}
        color="success"
      />
    </Stack>
  );
};

export default TabContent;
