import { IconButton } from "@mui/joy";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addIngredient } from "../../store/ingredientSlice";

const QuickAddBtn = ({ mealName, ingredient }) => {
  const dispatch = useDispatch();

  const handleAddIngredient = () => {
    dispatch(addIngredient({ mealName, ingredient }));
  };
  return (
    <IconButton color="primary" variant="plain" onClick={handleAddIngredient}>
      <IoIosAddCircleOutline fontSize={22} />
    </IconButton>
  );
};

export default QuickAddBtn;
