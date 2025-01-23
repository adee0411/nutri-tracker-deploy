import { Typography } from "@mui/joy";

const IngredientListItemTitle = ({ ingredientName, amount, unit }) => {
  const formattedIngredientName =
    ingredientName[0].toUpperCase() + ingredientName.slice(1);
  return (
    <Typography level="title-md">{`${formattedIngredientName}, ${amount} ${unit}`}</Typography>
  );
};

export default IngredientListItemTitle;
