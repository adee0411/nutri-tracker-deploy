import { db } from "../firebase/firestore_config";
import { getDoc, doc } from "firebase/firestore";

import { Stack, Sheet, Typography } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { setIngredientList } from "../store/ingredientSlice";
import { useEffect } from "react";

import ContentWrapper from "../UI/ContentWrapper";
import IngredientListHeader from "../components/IngredientList/IngredientListHeader";
import IngredientList from "../components/IngredientList/IngredientList";
import AddCustomIngredient from "../components/CustomIngredients/AddCustomIngredient";
import EditCustomIngredientModal from "../components/CustomIngredients/EditCustomIngredientModal";
import EmptyListPlaceholder from "../components/IngredientList/EmptyListPlaceholder";

import { CiEdit } from "react-icons/ci";

const CustomIngredientsRoute = () => {
  const dispatch = useDispatch();
  const { customIngredients } = useSelector((state) => state.ingredient);
  const { isEditCustomIngredientModalOpen } = useSelector(
    (state) => state.ingredient.UI
  );
  const { editableIngredient } = useSelector((state) => state.ingredient);

  const loadedData = useLoaderData();

  useEffect(() => {
    dispatch(
      setIngredientList({
        listName: "customIngredients",
        ingredientList: loadedData,
      })
    );
  }, []);

  return (
    <Stack gap={3}>
      <Stack gap={1}>
        <Typography level="h4">
          <CiEdit style={{ marginRight: 10 }} />
          Saját alapanyagok hozzáadása és szerkesztése
        </Typography>
        <Typography level="body-sm">
          Ha nem találod a keresett alapanyagot, rögzíts sajátokat és szerkeszd
          őket tetszés szerint
        </Typography>
      </Stack>

      <AddCustomIngredient />

      {customIngredients.length === 0 ? (
        <EmptyListPlaceholder text="Még nincsnek saját alapanyagok." />
      ) : (
        <>
          <IngredientListHeader
            listTitle="Saját alapanyagok"
            listName="customIngredients"
            listActions={["empty"]}
          />
          <IngredientList
            listName="customIngredients"
            actions={["update", "remove"]}
            ingredientList={customIngredients}
          />
          {isEditCustomIngredientModalOpen ? (
            <EditCustomIngredientModal
              isModalOpen={isEditCustomIngredientModalOpen}
              ingredient={editableIngredient}
            />
          ) : (
            ""
          )}
        </>
      )}
    </Stack>
  );
};

export default CustomIngredientsRoute;

export const customIngredientsListLoader = async () => {
  const customIngredients = [];
  const snapshot = await getDoc(doc(db, "customIngredients", "data"));
  snapshot.data().ingredients.forEach((ingredient) => {
    customIngredients.push(ingredient);
  });

  return customIngredients;
};
