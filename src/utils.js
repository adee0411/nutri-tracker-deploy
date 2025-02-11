// Correct ingredient's nutrition data by amount and unitage
export const transformNutritionData = (
  nutritionDataPerUnit,
  amount,
  unitage
) => {
  const transformedNutritionData = { ...nutritionDataPerUnit };

  for (const [key, value] of Object.entries(transformedNutritionData)) {
    transformedNutritionData[key] = Number(
      ((value * amount) / unitage).toFixed(0)
    );
  }

  return transformedNutritionData;
};

export const logMealIngredient = (list, ingredient, updatedIngredient) => {
  // Add ingredient to meal list
  const existingMealIngredient = list.find((ing) => ing.id === ingredient.id);
  const existingMealIngredientIndex = list.findIndex(
    (ing) => ing.id === ingredient.id
  );
  let updatedMealList = [...list];

  if (!existingMealIngredient) {
    updatedMealList.push(updatedIngredient);
  } else {
    const newAmount = updatedIngredient.amount + existingMealIngredient.amount;
    const updatedNutritionData = transformNutritionData(
      existingMealIngredient.nutritionDataPerUnit,
      newAmount,
      existingMealIngredient.unitage
    );

    const updatedMealIngredient = {
      ...updatedIngredient,
      amount: newAmount,
      nutritionData: updatedNutritionData,
    };

    updatedMealList[existingMealIngredientIndex] = updatedMealIngredient;
  }

  return updatedMealList;
};

export const logRecentIngredient = (list, ingredient, updatedIngredient) => {
  // Add ingredient to recent ingredients
  const existingRecentIngredient = list.find((ing) => ing.id === ingredient.id);
  const existingRecentIngredientIndex = list.findIndex(
    (ing) => ing.id === ingredient.id
  );
  let updatedRecentIngredientList = [...list];

  if (!existingRecentIngredient) {
    updatedRecentIngredientList.push(updatedIngredient);
  } else {
    const updatedRecentIngredient = {
      ...updatedIngredient,
    };
    updatedRecentIngredientList[existingRecentIngredientIndex] =
      updatedRecentIngredient;
  }

  return updatedRecentIngredientList;
};
