/** Import Style */
import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";
/** Import MUI Joy Components */

import RootLayout from "./UI/RootLayout";

/** Import Routes */
import DailyOverview from "./routes/DailyOverview";
import MealDetails, { mealDataLoader } from "./routes/MealDetails";
import AddFood from "./routes/AddFood";
import CustomIngredientsRoute from "./routes/CustomIngredientsRoute";

import { ingredientLoader } from "./routes/AddFood";
import { addedIngredientsListLoader } from "./UI/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    loader: addedIngredientsListLoader,

    children: [
      {
        path: "/",
        element: <DailyOverview />,
      },
      {
        path: ":mealTitle",
        element: <MealDetails />,
        loader: mealDataLoader,
      },
      {
        path: ":mealTitle/add-food",
        element: <AddFood />,
        loader: ingredientLoader,
      },
      {
        path: "/custom-ingredients",
        element: <CustomIngredientsRoute />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
