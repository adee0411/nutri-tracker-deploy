import { db } from "../../firebase/firestore_config";
import { setDoc, doc } from "firebase/firestore";

import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Button,
} from "@mui/joy";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CiEdit } from "react-icons/ci";

import {
  toggleIsEditCustomIngredientModalOpen,
  setIngredientList,
} from "../../store/ingredientSlice";
import { AnimatePresence, motion } from "framer-motion";

const EditCustomIngredientModal = ({ isModalOpen, ingredient }) => {
  const dispatch = useDispatch();

  const { customIngredients } = useSelector((state) => state.ingredient);

  const ingredientNameRef = useRef();
  const unitageRef = useRef();
  const unitRef = useRef();
  const carbRef = useRef();
  const proteinRef = useRef();
  const fatRef = useRef();
  const energyRef = useRef();

  const [unit, setUnit] = useState(ingredient.unit);

  const handleUnitChange = (e, newValue) => {
    setUnit(newValue);
  };

  const handleShowModal = () => {
    dispatch(toggleIsEditCustomIngredientModalOpen());
  };

  const handleUpdateCustomIngredient = (e) => {
    e.preventDefault();

    let ingredientsCopy = [...customIngredients];
    const existingIngredientIndex = ingredientsCopy.findIndex((ing) => {
      return ing.id === ingredient.id;
    });

    const updatedIngredient = {
      ...ingredient,
      ingredientName: ingredientNameRef.current.value,
      unitage: +unitageRef.current.value,
      unit: unit,
      amount: +unitageRef.current.value,
      nutritionData: {
        ...ingredient.nutritionDataPerUnit,
        carb: +carbRef.current.value,
        protein: +proteinRef.current.value,
        fat: +fatRef.current.value,
        energy: +energyRef.current.value,
      },
    };

    ingredientsCopy[existingIngredientIndex] = updatedIngredient;

    (async function () {
      await setDoc(
        doc(db, "customIngredients", ingredient.id),
        updatedIngredient
      );

      // Set the appropriate ingredient list to state!!!
      dispatch(
        setIngredientList({
          listName: "customIngredients",
          ingredientList: ingredientsCopy,
        })
      );

      dispatch(toggleIsEditCustomIngredientModalOpen());
    })();
  };
  return (
    <Modal open={isModalOpen} onClose={handleShowModal}>
      <ModalDialog
        component={motion.div}
        initial={{ opacity: 0.2, top: "45%" }}
        animate={{ opacity: 1, top: "50%" }}
        transition={{
          duration: 1,
          top: { type: "spring", visualDuration: 0.3, bounce: 0.4 },
        }}
      >
        <ModalClose />
        <Stack direction="row" gap={2} alignItems="center">
          <CiEdit />
          <Typography level="title-sm">Saját alapanyag szerkesztése</Typography>
        </Stack>
        <form onSubmit={handleUpdateCustomIngredient}>
          <Stack gap={2} my={4}>
            <FormControl>
              <FormLabel>Alapanyag neve</FormLabel>
              <Input
                slotProps={{
                  input: {
                    ref: ingredientNameRef,
                    style: { width: "100%" },
                  },
                }}
                defaultValue={ingredient.ingredientName}
                required
                name="ingredientName"
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mennyiségi egység</FormLabel>
              <Input
                defaultValue={ingredient.unitage}
                type="number"
                slotProps={{
                  input: { ref: unitageRef, style: { width: "100%" } },
                }}
                name="unitage"
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mértékegység</FormLabel>
              <Select
                value={unit}
                onChange={handleUnitChange}
                sx={{ width: "100%" }}
                size="sm"
                name="unit"
              >
                <Option value="g" ref={unitRef}>
                  g
                </Option>
                <Option value="ml" ref={unitRef}>
                  ml
                </Option>
                <Option value="db" ref={unitRef}>
                  db
                </Option>
              </Select>
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
              <FormLabel>Szénhidrát</FormLabel>
              <Input
                type="number"
                slotProps={{
                  input: { style: { width: "100%" }, ref: carbRef },
                }}
                endDecorator="g"
                placeholder="0"
                defaultValue={ingredient.nutritionData.carb}
                name="carb"
                size="sm"
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel>Fehérje</FormLabel>
              <Input
                type="number"
                slotProps={{
                  input: { style: { width: "100%" }, ref: proteinRef },
                }}
                endDecorator="g"
                placeholder="0"
                defaultValue={ingredient.nutritionData.protein}
                name="protein"
                size="sm"
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel>Zsír</FormLabel>
              <Input
                type="number"
                slotProps={{
                  input: { style: { width: "100%" }, ref: fatRef },
                }}
                endDecorator="g"
                placeholder="0"
                defaultValue={ingredient.nutritionData.fat}
                name="fat"
                size="sm"
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel>Energia</FormLabel>
              <Input
                type="number"
                slotProps={{
                  input: { style: { width: "100%" }, ref: energyRef },
                }}
                endDecorator="kcal"
                placeholder="0"
                defaultValue={ingredient.nutritionData.energy}
                name="energy"
                size="sm"
              />
            </FormControl>

            <Button type="submit" size="sm">
              Módosít
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default EditCustomIngredientModal;
