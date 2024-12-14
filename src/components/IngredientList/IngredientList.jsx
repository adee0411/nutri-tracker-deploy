import {
  List,
  Typography,
  Sheet,
  Stack,
  IconButton,
  ButtonGroup,
} from "@mui/joy";

import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import IngredientListItem from "./IngredientListItem";

import { IoIosAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";

import { emptyIngredientList } from "../../store/ingredientSlie";

const IngredientList = ({ ingredientList }) => {
  const { mealTitle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Add Ingredient
  const handleAddIngredient = () => {
    navigate("add-food");
  };

  // Handle Empty List
  const handleEmptyIngredientList = () => {
    dispatch(emptyIngredientList(mealTitle));
  };
  return (
    <Sheet variant="plain" sx={{ backgroundColor: "transparent" }}>
      {" "}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {" "}
        <Typography level="title-lg">Ingredient list</Typography>
        <ButtonGroup size="sm">
          <IconButton
            sx={{ fontSize: 18 }}
            title="Add ingredient"
            color="primary"
            variant="solid"
            onClick={handleAddIngredient}
          >
            <IoIosAddCircleOutline />
          </IconButton>
          <IconButton
            sx={{ fontSize: 18 }}
            title="Empty list"
            onClick={handleEmptyIngredientList}
          >
            <CiTrash />
          </IconButton>
          <IconButton
            sx={{ fontSize: 18 }}
            title="Re-add deleted item"
            disabled
          >
            <IoIosRefresh />
          </IconButton>
        </ButtonGroup>
      </Stack>
      <List
        color="primary"
        variant="plain"
        sx={{ "--ListDivider-gap": "8px", my: 2 }}
      >
        {ingredientList.map((ingredient) => {
          return (
            <IngredientListItem
              ingredientData={ingredient}
              key={ingredient.ingredientName}
            />
          );
        })}
      </List>
    </Sheet>
  );
};

export default IngredientList;
