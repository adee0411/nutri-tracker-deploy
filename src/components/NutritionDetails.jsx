import { Stack, Typography } from "@mui/joy";

const NutritionDetails = ({ nutritionData }) => {
  // Destructure macro data
  const { carb, protein, fat, energy } = nutritionData;
  return (
    <Stack direction="row" gap={2}>
      <Typography level="body-sm" fontSize={12}>
        CH: {carb}g
      </Typography>
      <Typography level="body-sm" fontSize={12}>
        P: {protein}g
      </Typography>
      <Typography level="body-sm" fontSize={12}>
        F: {fat}g
      </Typography>
      <Typography level="body-sm" fontSize={12}>
        C: {energy}cal
      </Typography>
    </Stack>
  );
};

export default NutritionDetails;
