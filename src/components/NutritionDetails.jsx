import { Stack, Typography } from "@mui/joy";

const NutritionDetails = ({ nutritionData }) => {
  // Destructure macro data
  const { carb, protein, fat, energy } = nutritionData;
  return (
    <Stack direction="row" gap={2}>
      <Typography level="body-sm" fontSize={12} fontWeight={400}>
        Szénhidrát: {carb}g
      </Typography>
      <Typography level="body-sm" fontSize={12} fontWeight={400}>
        Fehérje: {protein}g
      </Typography>
      <Typography level="body-sm" fontSize={12} fontWeight={400}>
        Zsír: {fat}g
      </Typography>
      <Typography level="body-sm" fontSize={12} fontWeight={600}>
        Energia: {energy}cal
      </Typography>
    </Stack>
  );
};

export default NutritionDetails;
