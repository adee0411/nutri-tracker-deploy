import {
  Button,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemButton,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { useState, useEffect, useRef } from "react";
import IngredientList from "../components/IngredientList/IngredientList";
import IngredientInfo from "../components/IngredientInfo";
import IngredientInfoCard from "../components/IngredientInfoCard";

const testQueries = [
  "chicken",
  "rice",
  "oat",
  "potato",
  "apple",
  "egg",
  "beef",
  "pork",
  "bread",
  "tuna",
  "chickpea",
  "chips",
  "ricotta",
  "pasta",
];

const testIngredientData = {
  chicken: {
    carb: 1,
    protein: 20,
    fat: 1,
    calorie: 80,
  },
  rice: {
    carb: 75,
    protein: 1,
    fat: 1,
    calorie: 300,
  },
  oat: {
    carb: 60,
    protein: 4,
    fat: 2,
    calorie: 270,
  },
  potato: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  apple: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  egg: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  beef: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  pork: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  bread: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  tuna: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  chickpea: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  chips: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  ricotta: { carb: 60, protein: 4, fat: 2, calorie: 270 },
  pasta: { carb: 60, protein: 4, fat: 2, calorie: 270 },
};

const AddFood = () => {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [selectedIngredient, setSelectedIngredient] = useState("");

  const handleSelectedIngredient = (e) => {
    setSelectedIngredient(e.target.id);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value.toLowerCase());
    if (e.target.value === "") setSelectedIngredient("");
  };

  useEffect(() => {
    const resultList =
      query === "" ? [] : testQueries.filter((data) => data.includes(query));

    setResults(resultList);
  }, [query]);

  return (
    <>
      <form>
        {" "}
        <Stack direction="row" m={1}>
          <FormControl sx={{ p: 1, flex: 1 }}>
            <Input
              type="search"
              name="ingredient"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search ingredient"
            ></Input>
          </FormControl>
          <FormControl sx={{ p: 1 }}>
            <Button type="submit">Search</Button>
          </FormControl>
        </Stack>
        {results.length === 0 ? (
          ""
        ) : (
          <List
            variant="outlined"
            sx={{ m: 2, borderRadius: "md", p: 0, overflow: "hidden" }}
          >
            {results.map((result) => {
              return (
                <ListItem key={result}>
                  <ListItemButton
                    sx={{ borderRadius: 0, fontSize: 12 }}
                    id={result}
                    onClick={handleSelectedIngredient}
                  >
                    {result}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
        {!selectedIngredient || query === "" ? (
          ""
        ) : (
          <Sheet
            variant="soft"
            color="primary"
            sx={{ m: 2, p: 2, borderRadius: "md" }}
          >
            <IngredientInfo
              ingredientName={selectedIngredient}
              ingredientUnit="g"
              ingredientQuantity={100}
              nutritionData={testIngredientData[selectedIngredient]}
            />
          </Sheet>
        )}
        {/**
         *         <Sheet
          color="primary"
          variant="soft"
          sx={{ m: 2, p: 2, borderRadius: "md" }}
        >
          <IngredientList />
        </Sheet>
         */}
      </form>
      <IngredientInfoCard />
    </>
  );
};

export default AddFood;
