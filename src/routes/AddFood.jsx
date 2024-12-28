import { Sheet } from "@mui/joy";
import { useSelector } from "react-redux";

import SearchForm from "../components/AddFood/SearchForm";
import SelectedIngredient from "../components/AddFood/SelectedIngredient";
import QuickIngredientTab from "../components/AddFood/QuickIngredientTab";

const AddFood = () => {
  const { selectedIngredient } = useSelector((state) => state.ingredient);

  return (
    <Sheet sx={{ p: 4, backgroundColor: "transparent" }}>
      <SearchForm />

      {/** Render ingredient details conditionally */}
      {!selectedIngredient ? (
        ""
      ) : (
        <SelectedIngredient selectedIngredient={selectedIngredient} />
      )}
      <QuickIngredientTab />
    </Sheet>
  );
};

export default AddFood;
