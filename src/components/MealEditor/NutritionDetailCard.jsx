import { Sheet, Typography, Stack } from "@mui/joy";

const NutritionDetailCard = ({ title, imageURL, nutritionData }) => {
  const { carb, protein, fat, energy } = nutritionData;
  return (
    <Sheet
      color="primary"
      variant="plain"
      sx={{
        borderRadius: "sm",
        p: 1.5,
        backgroundColor: "transparent",
        backgroundImage: `url(${imageURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100px",
        backgroundPosition: "left center",
        boxShadow: "md",
      }}
    >
      <Stack gap={3} width="75%" marginLeft="auto">
        <Typography level="title-lg" textAlign="center">
          {title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          textAlign="center"
          width="80%"
          m="0 auto"
        >
          <Stack>
            <Typography level="title-sm">Carb</Typography>
            <Typography level="body-sm">{carb} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Protein</Typography>
            <Typography level="body-sm">{protein} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Fat</Typography>
            <Typography level="body-sm">{fat} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Energy</Typography>
            <Typography level="body-sm">{energy} cal</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default NutritionDetailCard;
