import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/joy";

import { accordionClasses } from "@mui/joy/Accordion";
import { accordionSummaryClasses } from "@mui/joy";

import IngredientList from "../IngredientList/IngredientList";

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

const MealAccordion = ({ mealName, mealIngredientData, ingredientList }) => {
  const isMeal = mealName.includes("meal"); // Check if meal's title is Meal (number)
  const formattedMealTitle = isMeal
    ? `${mealName.at(-1)}. étkezés`
    : mealName === "breakfast"
    ? "Reggeli"
    : "Nasi";

  const ingredientActions = ["update", "addToFavorites", "remove"];
  return (
    <AccordionGroup
      size="sm"
      variant="soft"
      color="neutral"
      sx={(theme) => ({
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
            to={mealName}
            style={{
              all: "unset",
              display: "inline-block",
              width: "100%",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
            viewTransition
          >
            <Typography
              component="span"
              level="title-sm"
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              <Typography
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                component="span"
                gap={2}
              >
                <Typography
                  component="span"
                  width={44}
                  height={44}
                  display="flex"
                  justifyContent="cener"
                  alignItems="center"
                >
                  <img
                    src={AccordionImages[mealName]}
                    alt="meal-img"
                    width="100%"
                  />
                </Typography>

                <Typography>{formattedMealTitle}</Typography>
                <Typography color="primary" fontWeight={300} fontSize={12}>
                  {mealIngredientData.energy} kcal
                </Typography>
              </Typography>
            </Typography>
          </Link>
          <AccordionSummary></AccordionSummary>
        </Stack>

        <AccordionDetails sx={{ px: 1 }}>
          {ingredientList.length === 0 ? (
            <Typography level="body-sm" textAlign="center">
              Nincs még alapanyag
            </Typography>
          ) : (
            <IngredientList
              listName="addedIngredients"
              mealName={mealName}
              ingredientList={ingredientList}
              actions={ingredientActions}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

export default MealAccordion;

/************ MODAL ON DAILY OVERVIEW PAGE!!!! **********************/
