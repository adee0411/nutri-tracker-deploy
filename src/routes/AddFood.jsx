import SearchForm from "../components/AddFood/SearchForm";
import NutritionDetailCard from "../components/MealEditor/NutritionDetailCard";

import ChickenImg from "../img/chicken_breast.webp";

const AddFood = () => {
  const nutritionData = { carb: 100, protein: 200, fat: 300, energy: 400 };
  return (
    <>
      <SearchForm />
      <NutritionDetailCard
        title="Chicken breast"
        imageURL={ChickenImg}
        nutritionData={nutritionData}
      />
    </>
  );
};

export default AddFood;
