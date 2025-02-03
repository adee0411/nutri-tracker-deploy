import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/joy";
import { accordionClasses } from "@mui/joy/Accordion";
import { accordionSummaryClasses } from "@mui/joy";

import AddedIngredients from "../IngredientList/AddedIngredients";
import IngredientList from "../IngredientList/IngredientList";
import { useSelector } from "react-redux";

import BreakfastImg from "../../img/breakfast.png";
import MealImg from "../../img/lunch.png";
import SnackImg from "../../img/snack.png";
import { Link } from "react-router";

const AccordionImages = {
  breakfast: BreakfastImg,
  meal2: MealImg,
  meal3: MealImg,
  meal4: MealImg,
  snack: SnackImg,
};

const actionList = ["update", "addToFavorites", "remove"];

const MealAccordion = ({ title, ingredientData, list }) => {
  const ingredientList = useSelector(
    (state) => state.ingredient.addedIngredients.breakfast
  );

  const isMeal = title.includes("meal"); // Check if meal's title is Meal (number)
  const formattedMealTitle = isMeal
    ? `${title.at(-1)}. étkezés`
    : title === "breakfast"
    ? "Reggeli"
    : "Snack";
  return (
    <AccordionGroup
      size="sm"
      variant="plain"
      color="primary"
      sx={(theme) => ({
        maxWidth: 400,
        borderRadius: "md",
        boxShadow: "md",

        p: 1,
        [`& .${accordionClasses.root}`]: {
          transition: "0.2s ease",
          "& button:hover": {
            background: "transparent",
          },
          "& button:active": {
            background: "transparent",
          },
        },
        [`& .${accordionSummaryClasses.indicator}`]: {
          transition: "0.2s",
        },
      })}
    >
      <Accordion>
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Link
            to={title}
            style={{
              all: "unset",
              display: "inline-block",
              width: "100%",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Typography
              component="span"
              level="title-sm"
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                width={44}
                height={44}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src={AccordionImages[title]} alt="meal-img" width="100%" />
              </Typography>

              <Typography>{formattedMealTitle}</Typography>

              <Typography color="primary" fontWeight={400} fontSize={14}>
                {ingredientData.energy} kcal
              </Typography>
            </Typography>
          </Link>
          <AccordionSummary></AccordionSummary>
        </Stack>

        <AccordionDetails sx={{ px: 1 }}>
          {list.length === 0 ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography level="body-sm">Nincs még alapanyag</Typography>
              <Link to={title} viewTransition>
                <Button size="sm" variant="plain">
                  Hozzáadás
                </Button>
              </Link>
            </Stack>
          ) : (
            <IngredientList
              ingredientList={list}
              actionList={actionList}
              listName="addedIngredients"
            />
          )}
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

export default MealAccordion;
