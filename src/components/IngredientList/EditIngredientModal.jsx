import {
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  Stack,
  FormControl,
  Input,
  Button,
} from "@mui/joy";
import NutritionDetails from "../NutritionDetails";
import { useDispatch } from "react-redux";
import {
  setIsEditIngredientModalOpen,
  setEditIngredientAmount,
  addIngredient,
  updateIngredient,
} from "../../store/ingredientSlie";
import { transformNutritionData } from "../../data/TESTDATA";
import { useParams } from "react-router";

const EditIngredientModal = ({ isModalOpen, ingredient }) => {
  const dispatch = useDispatch();
  const { mealTitle } = useParams();

  const { ingredientName, nutritionData, unit, amount, unitage } = ingredient;
  const transformedNutritionData = transformNutritionData(
    nutritionData,
    amount,
    unitage
  );

  const newIngredient = {
    ...ingredient,
    nutritionData: transformedNutritionData,
  };

  const handleCloseModal = () => {
    dispatch(setIsEditIngredientModalOpen(false));
  };

  const handleIngredientInputChange = (e) => {
    const ingredientAmount = e.target.value;
    dispatch(setEditIngredientAmount(ingredientAmount));
  };

  const submitIngredientAmount = (e) => {
    e.preventDefault();
    dispatch(
      updateIngredient({ ingredient: newIngredient, mealName: mealTitle })
    );
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <ModalDialog>
        <ModalClose />
        <Typography level="title-md">{`${ingredientName}, ${amount}${unit}`}</Typography>
        <NutritionDetails nutritionData={newIngredient.nutritionData} />
        <form onSubmit={submitIngredientAmount}>
          <Stack direction="row" gap={2}>
            <FormControl>
              <Input
                type="number"
                value={amount}
                onChange={handleIngredientInputChange}
              />
            </FormControl>
            <FormControl>
              <Button type="submit">Módosít</Button>
            </FormControl>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default EditIngredientModal;
