import { Button, Stack } from "@mui/joy";

import { Link } from "react-router";

import MealButtonLabel from "./MealButtonLabel";
import NutritionDetails from "../NutritionDetails";

const MealButton = ({ title, ingredientData }) => {
  return (
    <Button variant="soft" color="primary" sx={{ p: 0 }}>
      <Link
        to={title}
        style={{
          all: "unset",
          display: "block",
          width: "100%",
          height: "100%",
          padding: "10px",
        }}
        viewTransition
      >
        <Stack
          direction="row"
          flex={1}
          gap={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <MealButtonLabel title={title} />
          <NutritionDetails nutritionData={ingredientData} fontSize={10} />
        </Stack>
      </Link>
    </Button>
  );
};

export default MealButton;
