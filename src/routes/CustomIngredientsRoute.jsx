import { db } from "../firebase/firestore_config";
import { getDocs, collection } from "firebase/firestore";

import { Stack, Sheet } from "@mui/joy";

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

import PlaceholderImg from "../img/undraw_add-information_06qr.svg";

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
    <ContentWrapper>
      <Stack gap={3}>
        <Stack alignItems="center" justifyContent="center">
          <img
            src={PlaceholderImg}
            alt="add-custom-ing-placeholder"
            width="50%"
          />
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
    </ContentWrapper>
  );
};

export default CustomIngredientsRoute;

export const customIngredientsListLoader = async () => {
  const customIngredients = [];
  const snapshot = await getDocs(collection(db, "customIngredients"));
  snapshot.forEach((ingredient) => {
    customIngredients.push(ingredient.data());
  });

  return customIngredients;
};
