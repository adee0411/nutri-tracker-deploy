import {
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

import generateUniqueId from "generate-unique-id";

import { addCustomIngredient } from "../../store/ingredientSlice";
import { useDispatch } from "react-redux";

const AddCustomIngredient = () => {
  const dispatch = useDispatch();

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

    const newCustomIngredient = {
      id: generateUniqueId(),
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
    dispatch(addCustomIngredient(newCustomIngredient));
  };
  return (
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
  );
};

export default AddCustomIngredient;
