/** Import Style */
import "./App.css";

import { CssVarsProvider, extendTheme } from "@mui/joy";

import { RouterProvider, createBrowserRouter } from "react-router";
import { Provider } from "react-redux";

import store from "./store/store";
/** Import MUI Joy Components */

import RootLayout from "./UI/RootLayout";

/** Import Routes */
import Welcome from "./routes/Welcome";
import DailyOverview from "./routes/DailyOverview";
import MealDetails, { mealDataLoader } from "./routes/MealDetails";
import AddFood from "./routes/AddFood";
import CustomIngredientsRoute, {
  customIngredientsListLoader,
} from "./routes/CustomIngredientsRoute";

import { ingredientLoader } from "./routes/AddFood";
import { rootDataLoader } from "./UI/RootLayout";
import ErrorPage from "./UI/ErrorPage";

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      path: "/",
      loader: rootDataLoader,
      errorElement: <ErrorPage />,

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
          loader: customIngredientsListLoader,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
    },
  }
);

const theme = extendTheme({
  cssVarPrefix: "mode-toggle",
  colorSchemeSelector: ".demo_mode-toggle-%s",
});

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </CssVarsProvider>
  );
}

export default App;
