import { db } from "../../firebase/firestore_config";
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
  AccordionGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/joy";
import { accordionClasses } from "@mui/joy/Accordion";
import { accordionSummaryClasses } from "@mui/joy";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import generateUniqueId from "generate-unique-id";

import { setIngredientList } from "../../store/ingredientSlice";

import { IoAdd } from "react-icons/io5";

const AddCustomIngredient = () => {
  const dispatch = useDispatch();

  const { customIngredients } = useSelector((state) => state.ingredient);

  const [unit, setUnit] = useState("g");
  const [unitage, setUnitage] = useState(100);
  const [ingredientName, setIngredientName] = useState("");
  const [macroValue, setMacroValue] = useState({
    carb: "",
    protein: "",
    fat: "",
    energy: "",
  });

  const handleUnitChange = (e, newValue) => {
    setUnit(newValue);
    let newUnitage = newValue === "db" ? 1 : 100;
    setUnitage(newUnitage);
  };

  const handleUnitageChange = (e) => {
    setUnitage(e.target.value);
  };

  const handleMacroChange = (e) => {
    const macroName = e.target.name;
    const macroValue = e.target.value;

    if (+macroValue < 0) {
      return;
    } else {
      setMacroValue((prevState) => {
        return { ...prevState, [macroName]: macroValue };
      });
    }
  };

  const handleAddCustomIngredient = (e) => {
    e.preventDefault();

    const customIngredientsCopy = [...customIngredients];

    const nutritionData = {
      carb: +macroValue.carb,
      protein: +macroValue.protein,
      fat: +macroValue.fat,
      energy: +macroValue.energy,
    };

    const newCustomIngredient = {
      id: "custom_" + generateUniqueId(),
      ingredientName: ingredientName,
      unitage: +unitage,
      unit: unit,
      amount: +unitage,
      nutritionDataPerUnit: nutritionData,
      nutritionData: nutritionData,
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
  };
  return (
    <AccordionGroup
      variant="soft"
      size="md"
      sx={() => ({
        borderRadius: "md",
        boxShadow: "md",
        p: 1,
        [`& .${accordionClasses.root}`]: {
          transition: "0.2s ease",
        },
        [`& .${accordionSummaryClasses.indicator}`]: {
          transition: "0.2s",
        },
      })}
    >
      <Accordion>
        <AccordionSummary>
          <Typography
            component="span"
            display="flex"
            gap={1}
            alignItems="center"
          >
            <IoAdd />
            Saját alapanyag hozzáadása
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddCustomIngredient}>
            <Stack direction="column" gap={2}>
              <FormControl size="sm">
                <FormLabel>Alapanyag neve</FormLabel>
                <Input
                  slotProps={{
                    input: { style: { width: "100%" } },
                  }}
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                  name="ingredientName"
                />
              </FormControl>
              <Stack direction="row" gap={2}>
                <FormControl size="sm" sx={{ flex: 1 }}>
                  <FormLabel>Mennyiségi egység</FormLabel>
                  <Input
                    value={unitage}
                    type="number"
                    slotProps={{
                      input: { style: { width: "100%" } },
                    }}
                    onChange={handleUnitageChange}
                    name="unitage"
                  />
                </FormControl>
                <FormControl size="sm">
                  <FormLabel>Mértékegység</FormLabel>
                  <Select
                    value={unit}
                    onChange={handleUnitChange}
                    sx={{ width: "100%" }}
                    name="unit"
                  >
                    <Option value="g">g</Option>
                    <Option value="ml">ml</Option>
                    <Option value="db">db</Option>
                  </Select>
                </FormControl>
              </Stack>
              <FormControl size="sm" sx={{ flex: 1 }}>
                <FormLabel>Szénhidrát</FormLabel>
                <Input
                  type="number"
                  slotProps={{
                    input: { style: { width: "100%" } },
                  }}
                  endDecorator="g"
                  placeholder="0"
                  name="carb"
                  onChange={handleMacroChange}
                  value={macroValue.carb}
                />
              </FormControl>
              <FormControl size="sm" sx={{ flex: 1 }}>
                <FormLabel>Fehérje</FormLabel>
                <Input
                  type="number"
                  slotProps={{
                    input: { style: { width: "100%" } },
                  }}
                  endDecorator="g"
                  placeholder="0"
                  name="protein"
                  onChange={handleMacroChange}
                  value={macroValue.protein}
                />
              </FormControl>
              <FormControl size="sm" sx={{ flex: 1 }}>
                <FormLabel>Zsír</FormLabel>
                <Input
                  type="number"
                  slotProps={{ input: { style: { width: "100%" } } }}
                  endDecorator="g"
                  placeholder="0"
                  name="fat"
                  onChange={handleMacroChange}
                  value={macroValue.fat}
                />
              </FormControl>
              <FormControl size="sm" sx={{ flex: 1 }}>
                <FormLabel>Energia</FormLabel>
                <Input
                  type="number"
                  slotProps={{
                    input: { style: { width: "100%" } },
                  }}
                  endDecorator="kcal"
                  placeholder="0"
                  name="energy"
                  onChange={handleMacroChange}
                  value={macroValue.energy}
                />
              </FormControl>
              <Button
                size="sm"
                type="submit"
                disabled={ingredientName.length === 0}
              >
                Hozzáad
              </Button>
            </Stack>
          </form>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

export default AddCustomIngredient;
