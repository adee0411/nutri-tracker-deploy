import { Stack, Typography } from "@mui/joy";

const NutritionDetails = ({ nutritionData, fontSize }) => {
  // Destructure macro data
  const { carb, protein, fat, energy } = nutritionData;
  return (
    <Stack direction="row" gap={1} justifyContent="space-between" flex={1}>
      <Stack>
        {" "}
        <Typography level="body-sm" fontSize={fontSize} fontWeight={400}>
          Szénhidrát:
        </Typography>
        <Typography fontSize={fontSize * 1.25}>{carb} g</Typography>
      </Stack>
      <Stack>
        {" "}
        <Typography level="body-sm" fontSize={fontSize} fontWeight={400}>
          Fehérje:
        </Typography>
        <Typography fontSize={fontSize * 1.25}>{protein} g</Typography>
      </Stack>
      <Stack>
        {" "}
        <Typography level="body-sm" fontSize={fontSize} fontWeight={400}>
          Zsír:
        </Typography>
        <Typography fontSize={fontSize * 1.25}>{fat} g</Typography>
      </Stack>
      <Stack>
        <Typography level="body-sm" fontSize={fontSize} fontWeight={400}>
          Energia:
        </Typography>
        <Typography color="primary" fontSize={fontSize * 1.25}>
          {energy} kcal
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NutritionDetails;
