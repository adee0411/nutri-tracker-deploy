import { Button, Sheet, Typography } from "@mui/joy";

import NoMealImg from "../../img/undraw_breakfast_psiw.svg";

const NoMeal = () => {
  return (
    <Sheet
      sx={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        my: 10,
      }}
    >
      <img width="50%" src={NoMealImg} />
      <Typography color="neutral">No ingredients added yet.</Typography>
      <Button>Add ingredient</Button>
    </Sheet>
  );
};

export default NoMeal;
