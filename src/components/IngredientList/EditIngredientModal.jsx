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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import NutritionDetails from "../NutritionDetails";
import { setIsEditIngredientModalOpen } from "../../store/ingredientSlie";
import { transformNutritionData } from "../../data/TESTDATA";

const EditIngredientModal = ({ isModalOpen, ingredient }) => {
  const { ingredientName, unit, unitage, amount, nutritionData } = ingredient;
  const dispatch = useDispatch();
  const { mealTitle } = useParams();

  const handleCloseModal = () => {
    dispatch(setIsEditIngredientModalOpen(false));
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <ModalDialog>
        <ModalClose />
        <Typography level="title-md">{`${ingredientName}, ${amount}${unit}`}</Typography>
        <NutritionDetails nutritionData={nutritionData} />
        <form>
          <Stack direction="row" gap={2}>
            <FormControl>
              <Input type="number" />
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
