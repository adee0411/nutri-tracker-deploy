import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Stack,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedIngredient,
  setNewIngredientInput,
} from "../../store/ingredientSlice";

import { FaRegUser } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const ResultList = ({ resultList }) => {
  const dispatch = useDispatch();

  const { selectedIngredient } = useSelector((state) => state.ingredient);

  const handleSelectedIngredient = (e) => {
    const ingredientID = e.currentTarget.id;
    const ingredient = resultList.find(
      (ingredient) => ingredient.id === ingredientID
    );
    dispatch(setSelectedIngredient(ingredient));
    dispatch(setNewIngredientInput(ingredient.unitage));
  };
  return (
    <Stack>
      <Typography level="title-md">Találatok:</Typography>
      <List
        variant="plain"
        color="primary"
        sx={{
          borderRadius: "md",
          p: 0,
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
                  fontWeight: result.id === selectedIngredient?.id ? 500 : 300,
                }}
                id={result.id}
                onClick={handleSelectedIngredient}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  {result.id === selectedIngredient?.id ? (
                    <ListItemDecorator>
                      <FaCheck />
                    </ListItemDecorator>
                  ) : (
                    ""
                  )}
                  <Typography level="body-sm" component="span">
                    {ingredientName}
                  </Typography>
                  <ListItemDecorator>
                    {result.id.includes("custom") ? (
                      <FaRegUser style={{ fontSize: 10 }} />
                    ) : (
                      ""
                    )}
                  </ListItemDecorator>
                </Stack>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

export default ResultList;
