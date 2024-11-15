import { Sheet, Typography } from "@mui/joy";

import MealList from "./MealList";

const MealEditor = () => {
  return (
    <Sheet sx={{ px: 3, py: 1, backgroundColor: "transparent" }}>
      <Typography level="title-lg" my={2}>
        Edit your meals
      </Typography>

      <MealList />
    </Sheet>
  );
};

export default MealEditor;
