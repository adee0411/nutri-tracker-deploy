import { Button, Stack } from "@mui/joy";

import { Link } from "react-router-dom";

import MealButtonLabel from "./MealButtonLabel";
import NutritionDetails from "../NutritionDetails";

const MealButton = ({ title, ingredientData }) => {
  return (
    <Button variant="soft" color="neutral" sx={{ p: 0 }}>
      <Link
        to={title}
        style={{
          all: "unset",
          display: "block",
          width: "100%",
          height: "100%",
          padding: "12px",
        }}
      >
        <Stack
          direction="row"
          flex={1}
          gap={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <MealButtonLabel title={title} />
          <NutritionDetails nutritionData={ingredientData} />
        </Stack>
      </Link>
    </Button>
  );
};

export default MealButton;
