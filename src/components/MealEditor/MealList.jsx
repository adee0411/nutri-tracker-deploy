import { Stack } from "@mui/joy";

import MealButton from "./MealButton";

/**************** TEST DATA *********************/
const nutritionInfo = {
  breakfast: {
    C: 300,
    P: 40,
    F: 18,
    Cal: 1550,
  },
  meal2: {
    C: 220,
    P: 36,
    F: 28,
    Cal: 1420,
  },
  meal3: {
    C: 190,
    P: 50,
    F: 23,
    Cal: 1100,
  },
  meal4: {
    C: 150,
    P: 48,
    F: 13,
    Cal: 900,
  },
  snack: {
    C: 110,
    P: 20,
    F: 36,
    Cal: 600,
  },
};

const MealList = () => {
  //const [nutrition, setNutrition] = useState(nutritionInfo);

  return (
    <Stack gap={2}>
      {Object.entries(nutritionInfo).map((meal) => {
        return (
          <MealButton title={meal[0]} nutritionData={meal[1]} key={meal[0]} />
        );
      })}
    </Stack>
  );
};

export default MealList;
