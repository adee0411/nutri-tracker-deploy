import { Button } from "@mui/joy";

const IngredientListItemActionBtn = ({ ingredient, icon, title, handler }) => {
  return (
    <Button
      value={ingredient.id}
      size="lg"
      startDecorator={title}
      endDecorator={icon}
      color="neutral"
      variant="plain"
      fullWidth
      sx={{
        "&:hover": {
          backgroundColor: "transparent",
        },
        justifyContent: "space-between",
      }}
      id={ingredient.id}
      onClick={handler}
    ></Button>
  );
};

export default IngredientListItemActionBtn;
