import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
} from "@mui/joy";
import { useRef, useState } from "react";

const CustomIngredientsRoute = () => {
  const ingredientNameRef = useRef();
  const unitageRef = useRef();
  const unitRef = useRef();
  const carbRef = useRef();
  const proteinRef = useRef();
  const fatRef = useRef();
  const energyRef = useRef();

  const [unit, setUnit] = useState("g");

  const handleSetUnit = (e, newValue) => {
    setUnit(newValue);
  };

  return (
    <form>
      <Stack p={3} gap={2}>
        <Stack direction="row" gap={2}>
          <FormControl>
            <FormLabel>Alapanyag neve</FormLabel>
            <Input
              slotProps={{
                input: { ref: ingredientNameRef, style: { width: "100%" } },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Mennyiségi egység</FormLabel>
            <Input
              defaultValue={unit === "db" ? 1 : 100}
              type="number"
              slotProps={{
                input: { ref: unitageRef, style: { width: "100%" } },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Mértékegység</FormLabel>
            <Select
              value={unit}
              onChange={handleSetUnit}
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
              slotProps={{ input: { style: { width: "100%" }, ref: carbRef } }}
              endDecorator="g"
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
            />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel>Zsír</FormLabel>
            <Input
              type="number"
              slotProps={{ input: { style: { width: "100%" }, ref: fatRef } }}
              endDecorator="g"
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
            />
          </FormControl>
        </Stack>
        <Button>Hozzáad</Button>
      </Stack>
    </form>
  );
};

export default CustomIngredientsRoute;
