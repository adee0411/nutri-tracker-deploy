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
import { setIsEditIngredientModalOpen } from "../../store/ingredientSlie";

const EditIngredientModal = ({ ingredient, isModalOpen }) => {
  const dispatch = useDispatch();
  const { ingredientName, nutritionData, unit, amount } = ingredient;

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
              <Button>Szerkeszt</Button>
            </FormControl>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default EditIngredientModal;
