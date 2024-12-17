import { Sheet, Typography, Stack } from "@mui/joy";

import NoImage from "../../img/no_image.png";

const NutritionDetailCard = ({ title, imageURL, nutritionData }) => {
  const { carb, protein, fat, energy } = nutritionData;
  return (
    <Sheet
      color="primary"
      variant="plain"
      sx={{
        borderRadius: "sm",
        px: 1.5,
        py: 3,
        backgroundColor: "transparent",
        backgroundImage: `url(${imageURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100px",
        backgroundPosition: "20px center",
        boxShadow: "md",
      }}
    >
      <Stack gap={3} width="75%" marginLeft="auto">
        <Typography level="title-lg" fontWeight={800} textAlign="center">
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
            <Typography level="title-sm">Szénhidrát</Typography>
            <Typography level="body-sm">{carb} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Fehérje</Typography>
            <Typography level="body-sm">{protein} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Zsír</Typography>
            <Typography level="body-sm">{fat} g</Typography>
          </Stack>
          <Stack>
            <Typography level="title-sm">Energia</Typography>
            <Typography level="body-sm">{energy} cal</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default NutritionDetailCard;
