import { Typography } from "@mui/joy";

const IngredientListItemTitle = ({ ingredientName, amount, unit }) => {
  return (
    <Typography level="title-sm">
      {ingredientName}, {amount}
      {unit}
    </Typography>
  );
};

export default IngredientListItemTitle;
