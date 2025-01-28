// Correct ingredient's nutrition data by amount and unitage
export const transformNutritionData = (nutritionData, amount, unitage) => {
  const transformedNutritionData = { ...nutritionData };

  for (const [key, value] of Object.entries(transformedNutritionData)) {
    transformedNutritionData[key] = Number(
      ((value * amount) / unitage).toFixed(0)
    );
  }

  return transformedNutritionData;
};
