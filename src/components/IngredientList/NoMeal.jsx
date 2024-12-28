import { Sheet, Typography } from "@mui/joy";

import NoMealImg from "../../img/undraw_breakfast_psiw.svg";

const NoMeal = ({ text }) => {
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
      <img width="50%" src={NoMealImg} alt="no-data-img" />
      <Typography color="neutral">{text}</Typography>
    </Sheet>
  );
};

export default NoMeal;
