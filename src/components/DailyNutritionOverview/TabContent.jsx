import { Stack } from "@mui/joy";

import MacroGoalDetails from "./MacroGoalDetails";

const TabContent = ({ macroData }) => {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <MacroGoalDetails
        macroType="Szénhidrát"
        goal={macroData.carb}
        current={0}
        color="primary"
      />
      <MacroGoalDetails
        macroType="Fehérje"
        goal={macroData.protein}
        current={0}
        color="warning"
      />
      <MacroGoalDetails
        macroType="Zsír"
        goal={macroData.fat}
        current={0}
        color="success"
      />
    </Stack>
  );
};

export default TabContent;
