import { Button, Stack, Typography, Sheet } from "@mui/joy";

import MacroData from "./MacroData";

const MealButton = ({ icon, nutritionData, title }) => {
  return (
    <Button variant="soft" color="neutral" sx={{ p: 2 }}>
      {" "}
      <Stack
        direction="row"
        flex={1}
        gap={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap={1}>
          <img src={icon} alt="breakfast-icon" width={24} />
          <Typography>{title}</Typography>
        </Stack>

        <Stack direction="row" gap={1} justifyContent="space-between">
          {Object.entries(nutritionData).map((macroData) => {
            return <MacroData data={macroData} key={macroData[0]} />;
          })}
        </Stack>
      </Stack>
    </Button>
  );
};

export default MealButton;
