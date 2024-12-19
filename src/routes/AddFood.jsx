import {
  Button,
  FormControl,
  IconButton,
  Input,
  Sheet,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Typography,
} from "@mui/joy";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import SearchForm from "../components/AddFood/SearchForm";
import NutritionDetailCard from "../components/MealEditor/NutritionDetailCard";

import { transformNutritionData } from "../data/TESTDATA";

import { FaRegHeart } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { IoRepeat } from "react-icons/io5";

import { tabClasses } from "@mui/joy";

import {
  setNewIngredientInput,
  addIngredient,
  setSearchQueryInput,
  setSearchResultList,
  setSelectedIngredient,
} from "../store/ingredientSlie";
import { redirect, useNavigate, useParams } from "react-router";

const AddFood = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mealTitle } = useParams();
  const { selectedIngredient } = useSelector((state) => state.ingredient);
  const { newIngredientInput } = useSelector((state) => state.ingredient.UI);

  let transformedNutritionData;
  if (selectedIngredient) {
    transformedNutritionData = transformNutritionData(
      selectedIngredient.nutritionData,
      newIngredientInput,
      selectedIngredient.unitage
    );
  }

  const handleNewIngredientAmountChange = (e) => {
    const amount = e.target.value;
    dispatch(setNewIngredientInput(amount));
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      ...selectedIngredient,
      nutritionData: transformedNutritionData,
      amount: +newIngredientInput,
    };
    dispatch(addIngredient({ mealName: mealTitle, ingredient: newIngredient }));
    dispatch(setSearchQueryInput(""));
    dispatch(setSearchResultList([]));
  };

  return (
    <Sheet
      variant="plain"
      color="primary"
      sx={{ p: 4, backgroundColor: "transparent" }}
    >
      <SearchForm />

      {/** Render ingredient details conditionally */}
      {!selectedIngredient ? (
        ""
      ) : (
        <>
          <NutritionDetailCard
            title={selectedIngredient.ingredientName}
            imageURL={selectedIngredient.imageURL}
            nutritionData={transformedNutritionData}
          />
          <Stack direction="row" width="100%" gap={2} my={4}>
            <FormControl sx={{ flex: 1 }}>
              <Input
                type="number"
                endDecorator={selectedIngredient.unit}
                value={newIngredientInput}
                onChange={handleNewIngredientAmountChange}
              />
            </FormControl>
            <FormControl>
              <Button type="submit" onClick={handleAddIngredient}>
                Hozzáad
              </Button>
            </FormControl>
            <FormControl>
              <IconButton variant="soft" color="warning">
                <FaRegHeart />
              </IconButton>
            </FormControl>
          </Stack>
        </>
      )}
      <Sheet>
        <Tabs
          aria-label="Ingredient list tab"
          defaultValue={0}
          variant="outlined"
          sx={{
            borderRadius: "lg",
            boxShadow: "md",
            overflow: "auto",
          }}
        >
          <TabList
            size="sm"
            tabFlex={1}
            disableUnderline
            sx={{
              "--Tab-indicatorThickness": 0,
              [`& .${tabClasses.root}`]: {
                fontSize: "sm",
                fontWeight: "lg",
                [`&[aria-selected="true"]`]: {
                  color: "primary.500",
                  bgcolor: "background.surface",
                },
              },
            }}
          >
            <Tab disableIndicator variant="soft">
              <FaRegHeart />
              Kedvencek
            </Tab>
            <Tab disableIndicator variant="soft">
              <IoRepeat />
              Gyakoriak
            </Tab>
            <Tab disableIndicator variant="soft">
              <LuClock />
              Legutóbbiak
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <Typography>Kedvencek</Typography>
          </TabPanel>
          <TabPanel value={1}>
            <Typography>Gyakoriak</Typography>
          </TabPanel>
          <TabPanel value={2}>
            <Typography>Legutóbbiak</Typography>
          </TabPanel>
        </Tabs>
      </Sheet>
    </Sheet>
  );
};

export default AddFood;
