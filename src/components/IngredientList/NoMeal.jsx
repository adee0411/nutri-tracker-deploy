import { Button, Sheet, Typography } from "@mui/joy";

import { useNavigate } from "react-router";

import NoMealImg from "../../img/undraw_breakfast_psiw.svg";

const NoMeal = () => {
  const navigate = useNavigate();
  // Handle Add Ingredient
  const handleAddIngredient = () => {
    navigate("add-food");
  };
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
      <Typography color="neutral">A lista a mai napra még üres.</Typography>
      <Button onClick={handleAddIngredient}>Hozzáadás</Button>
    </Sheet>
  );
};

export default NoMeal;
