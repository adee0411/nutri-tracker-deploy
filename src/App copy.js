/** Import Style */
import "./App.css";

import {
  createBrowserRouter,
  Route,
  Routes,
  BrowserRouter,
  RouterProvider,
  createRoutesFromChildren,
  createRoutesFromElements,
} from "react-router";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";

import store from "./store/store";
/** Import MUI Joy Components */

import RootLayout from "./UI/RootLayout";

/** Import Routes */
import DailyOverview from "./routes/DailyOverview";
import MealDetails, { mealDataLoader } from "./routes/MealDetails";
import AddFood from "./routes/AddFood";
import CustomIngredientsRoute, {
  customIngredientsListLoader,
} from "./routes/CustomIngredientsRoute";

import { ingredientLoader } from "./routes/AddFood";
import { rootDataLoader } from "./UI/RootLayout";
import { useLocation } from "react-router";

/*const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    loader: rootDataLoader,
    errorElement: <RootLayout />,

    children: [
      {
        path: "/",
        element: (
          <PageWrapper>
            <DailyOverview />
          </PageWrapper>
        ),
      },
      {
        path: ":mealTitle",
        element: (
          <PageWrapper>
            <MealDetails />
          </PageWrapper>
        ),
        loader: mealDataLoader,
      },
      {
        path: ":mealTitle/add-food",
        element: (
          <PageWrapper>
            <AddFood />
          </PageWrapper>
        ),
        loader: ingredientLoader,
      },
      {
        path: "/custom-ingredients",
        element: (
          <PageWrapper>
            <CustomIngredientsRoute />
          </PageWrapper>
        ),
        loader: customIngredientsListLoader,
      },
    ],
  },
]);*/

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={
        <PageWrapper>
          <RootLayout />
        </PageWrapper>
      }
      loader={rootDataLoader}
    >
      <Route
        path="/"
        element={
          <PageWrapper>
            <DailyOverview />
          </PageWrapper>
        }
      />
      <Route
        path=":mealTitle"
        element={
          <PageWrapper>
            <MealDetails />
          </PageWrapper>
        }
        loader={mealDataLoader}
      />
      <Route
        path=":mealTitle/add-food"
        element={
          <PageWrapper>
            <AddFood />
          </PageWrapper>
        }
        loader={ingredientLoader}
      />
      <Route
        path="/custom-ingredients"
        element={
          <PageWrapper>
            <CustomIngredientsRoute />
          </PageWrapper>
        }
        loader={customIngredientsListLoader}
      />
    </Route>,
  ])
);

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function RouteAnimationWrapper() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <RootLayout />
            </PageWrapper>
          }
          loader={rootDataLoader}
        >
          <Route
            path="/"
            element={
              <PageWrapper>
                <DailyOverview />
              </PageWrapper>
            }
          />
          <Route
            path=":mealTitle"
            element={
              <PageWrapper>
                <MealDetails />
              </PageWrapper>
            }
            loader={mealDataLoader}
          />
          <Route
            path=":mealTitle/add-food"
            element={
              <PageWrapper>
                <AddFood />
              </PageWrapper>
            }
            loader={ingredientLoader}
          />
          <Route
            path="/custom-ingredients"
            element={
              <PageWrapper>
                <CustomIngredientsRoute />
              </PageWrapper>
            }
            loader={customIngredientsListLoader}
          />
        </Route>
        ,
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteAnimationWrapper />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
