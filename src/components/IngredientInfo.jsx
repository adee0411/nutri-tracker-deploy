import { Stack, Typography } from "@mui/joy";

import MacroData from "./MacroData";

const IngredientInfo = ({
  ingredientName,
  ingredientQuantity,
  ingredientUnit,
  nutritionData,
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flex={1}
      gap={2}
    >
      <Stack flex={1}>
        <Stack gap={0.5}>
          <Typography level="title-sm">{`${ingredientName}, ${ingredientQuantity} ${ingredientUnit}`}</Typography>
          <Stack direction="row" gap={2}>
            {Object.entries(nutritionData).map((macro) => {
              return (
                <MacroData
                  macroName={macro[0]}
                  macroAmount={macro[1]}
                  macroUnit="g"
                  key={macro[0]}
                />
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default IngredientInfo;
