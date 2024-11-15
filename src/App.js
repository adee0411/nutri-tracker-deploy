import "./App.css";

import Header from "./components/Header/Header";
import NutritionInfo from "./components/NutritionInfo/NutritionInfo";
import MealEditor from "./components/MealEditor/MealEditor";
import { Stack } from "@mui/joy";

function App() {
  return (
    <>
      <Header />
      <Stack gap={3}>
        <NutritionInfo />
        <MealEditor />
      </Stack>
    </>
  );
}

export default App;
