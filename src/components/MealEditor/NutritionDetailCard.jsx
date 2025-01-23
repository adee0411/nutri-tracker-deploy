import { Sheet, Typography, Stack } from "@mui/joy";

import NoImage from "../../img/no_image.png";

const NutritionDetailCard = ({
  title,
  imageURL,
  nutritionData,
  unit,
  amount,
}) => {
  const { carb, protein, fat, energy } = nutritionData;
  const formattedTitle = title[0].toUpperCase() + title.slice(1);
  return (
    <Stack gap={3} sx={{ zIndex: 1 }}>
      <Stack>
        <Typography level="h4" fontWeight={700} textAlign="center">
          {formattedTitle}
        </Typography>
        <Typography textAlign="center" level="h5" fontWeight={300}>
          {`Tápanyag tartalom ${amount} ${unit}-${
            unit === "ml" ? "ben" : "ban"
          }`}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
        width="80%"
        m="0 auto"
      >
        <Stack>
          <Typography level="title-sm">Szénhidrát</Typography>
          <Typography
            level="body-lg"
            fontSize={20}
            fontWeight={300}
            color="neutral"
          >
            {carb} g
          </Typography>
        </Stack>
        <Stack>
          <Typography level="title-sm">Fehérje</Typography>
          <Typography
            level="body-lg"
            fontSize={20}
            fontWeight={300}
            color="neutral"
          >
            {protein} g
          </Typography>
        </Stack>
        <Stack>
          <Typography level="title-sm">Zsír</Typography>
          <Typography
            level="body-lg"
            fontSize={20}
            fontWeight={300}
            color="neutral"
          >
            {fat} g
          </Typography>
        </Stack>
        <Stack>
          <Typography level="title-sm">Energia</Typography>
          <Typography
            level="body-lg"
            fontSize={20}
            fontWeight={800}
            color="neutral"
          >
            {energy} cal
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NutritionDetailCard;
