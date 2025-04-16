/** Import Style */
import "./App.css";

import { CssVarsProvider, extendTheme, Sheet } from "@mui/joy";

import { RouterProvider, createBrowserRouter } from "react-router";
import { Provider } from "react-redux";

import store from "./store/store";
/** Import MUI Joy Components */

import AuthProvider from "./AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";

import RootLayout from "./UI/RootLayout";

/** Import Routes */
import Home from "./routes/Home";
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

      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: ":mealTitle",
          element: (
            <PrivateRoute>
              <MealDetails />
            </PrivateRoute>
          ),
        },
        {
          path: ":mealTitle/add-food",
          element: (
            <PrivateRoute>
              <AddFood />
            </PrivateRoute>
          ),
          loader: ingredientLoader,
        },

        {
          path: "custom-ingredients",
          element: (
            <PrivateRoute>
              <CustomIngredientsRoute />
            </PrivateRoute>
          ),
          loader: customIngredientsListLoader,
        },
        {
          path: "my-meals",
          element: (
            <PrivateRoute>
              <CustomIngredientsRoute />
            </PrivateRoute>
          ),
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
    <AuthProvider>
      <CssVarsProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </CssVarsProvider>
    </AuthProvider>
  );
}

export default App;
