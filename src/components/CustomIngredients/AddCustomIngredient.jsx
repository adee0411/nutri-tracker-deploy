import db from "../../firebase/firestore_config";
import { doc, setDoc } from "firebase/firestore";

import {
  Typography,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Button,
  Sheet,
} from "@mui/joy";
import { useRef, useState } from "react";

import generateUniqueId from "generate-unique-id";

import { setIngredientList } from "../../store/ingredientSlice";
import { useDispatch, useSelector } from "react-redux";

const AddCustomIngredient = () => {
  const dispatch = useDispatch();

  const { customIngredients } = useSelector((state) => state.ingredient);

  const carbRef = useRef();
  const proteinRef = useRef();
  const fatRef = useRef();
  const energyRef = useRef();

  const [unit, setUnit] = useState("g");
  const [unitage, setUnitage] = useState(100);
  const [ingredientName, setIngredientName] = useState("");

  const handleUnitChange = (e, newValue) => {
    setUnit(newValue);
    let newUnitage = newValue === "db" ? 1 : 100;
    setUnitage(newUnitage);
  };

  const handleUnitageChange = (e) => {
    setUnitage(e.target.value);
  };

  const handleAddCustomIngredient = (e) => {
    e.preventDefault();

    const customIngredientsCopy = [...customIngredients];

    const newCustomIngredient = {
      id: "custom_" + generateUniqueId(),
      ingredientName: ingredientName,
      unitage: +unitage,
      unit: unit,
      amount: +unitage,
      nutritionData: {
        carb: +carbRef.current.value,
        protein: +proteinRef.current.value,
        fat: +fatRef.current.value,
        energy: +energyRef.current.value,
      },
    };

    customIngredientsCopy.push(newCustomIngredient);

    (async function () {
      await setDoc(
        doc(db, "customIngredients", newCustomIngredient.id),
        newCustomIngredient
      );
      dispatch(
        setIngredientList({
          listName: "customIngredients",
          ingredientList: customIngredientsCopy,
        })
      );
    })();

    //dispatch(addCustomIngredient(newCustomIngredient));
  };
  return (
    <Sheet
      color="primary"
      variant="soft"
      sx={{ p: 2, borderRadius: "md", boxShadow: "md" }}
    >
      <form onSubmit={handleAddCustomIngredient}>
        <Typography level="title-lg">Új alapanyag hozzáadása</Typography>
        <Stack gap={4} my={4}>
          <Stack direction="row" gap={2}>
            <FormControl>
              <FormLabel>Alapanyag neve</FormLabel>
              <Input
                slotProps={{
                  input: { style: { width: "100%" } },
                }}
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mennyiségi egység</FormLabel>
              <Input
                value={unitage}
                type="number"
                slotProps={{
                  input: { style: { width: "100%" } },
                }}
                onChange={handleUnitageChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mértékegység</FormLabel>
              <Select
                value={unit}
                onChange={handleUnitChange}
                sx={{ width: "100%" }}
              >
                <Option value="g">g</Option>
                <Option value="ml">ml</Option>
                <Option value="db">db</Option>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" width="100%" gap={2}>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel>Szénhidrát</FormLabel>
              <Input
                type="number"
                slotProps={{
                  input: { style: { width: "100%" }, ref: carbRef },
                }}
                endDecorator="g"
                placeholder="0"
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
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel>Zsír</FormLabel>
              <Input
                type="number"
                slotProps={{ input: { style: { width: "100%" }, ref: fatRef } }}
                endDecorator="g"
                placeholder="0"
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
              />
            </FormControl>
          </Stack>
          <Button type="submit" disabled={ingredientName.length === 0}>
            Hozzáad
          </Button>
        </Stack>
      </form>
    </Sheet>
  );
};

export default AddCustomIngredient;
