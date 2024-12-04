/** Import Style */
import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

/** Import MUI Joy Components */

import RootLayout from "./UI/RootLayout";

/** Import Routes */
import DailyOverview from "./routes/DailyOverview";
import MealDetails from "./routes/MealDetails";
import AddFood from "./routes/AddFood";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    children: [
      {
        path: "/",
        element: <DailyOverview />,
      },
      {
        path: ":mealTitle",
        element: <MealDetails />,
      },
      {
        path: ":mealTitle/add-food",
        element: <AddFood />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
