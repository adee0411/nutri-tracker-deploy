import { Typography, List, ListItem, ListItemButton } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedIngredient,
  setNewIngredientInput,
} from "../../store/ingredientSlice";

const ResultList = ({ resultList }) => {
  const dispatch = useDispatch();

  const { selectedIngredient } = useSelector((state) => state.ingredient);

  const handleSelectedIngredient = (e) => {
    const ingredientID = e.target.id;
    const ingredient = resultList.find(
      (ingredient) => ingredient.id === ingredientID
    );
    dispatch(setSelectedIngredient(ingredient));
    dispatch(setNewIngredientInput(ingredient.unitage));
  };
  return (
    <>
      <Typography level="title-md">Találatok:</Typography>
      <List
        variant="plain"
        color="primary"
        sx={{
          borderRadius: "md",
          p: 0,
          mt: 1,
          mb: 4,
          overflow: "hidden",
        }}
      >
        {resultList.map((result) => {
          const ingredientName =
            result.ingredientName[0].toUpperCase() +
            result.ingredientName.slice(1);
          return (
            <ListItem key={result.id}>
              <ListItemButton
                sx={{
                  borderRadius: 0,
                  fontSize: 12,
                  fontWeight: result.id === selectedIngredient?.id ? 700 : "",
                }}
                id={result.id}
                onClick={handleSelectedIngredient}
              >
                {ingredientName}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default ResultList;
