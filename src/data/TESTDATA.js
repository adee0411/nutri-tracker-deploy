const TEST_INGREDIENT_LIST = {
  breakfast: [
    {
      id: "bre001",
      ingredientName: "Porridge oats",
      unit: "g",
      unitage: 100,
      amount: 100,
      nutritionData: {
        carb: 70,
        protein: 11,
        fat: 8,
        energy: 380,
      },
    },
    {
      id: "bre002",
      ingredientName: "White sugar",
      unit: "g",
      unitage: 100,
      amount: 100,
      nutritionData: {
        carb: 100,
        protein: 0,
        fat: 0,
        energy: 400,
      },
    },
    {
      id: "bre003",
      ingredientName: "Mokate 2 in 1 coffee powder",
      unit: "g",
      unitage: 100,
      amount: 14,
      nutritionData: {
        carb: 65,
        protein: 5,
        fat: 26,
        energy: 520,
      },
    },
    {
      id: "bre004",
      ingredientName: "MyProtein Whey Protein",
      unit: "g",
      unitage: 30,
      amount: 30,
      nutritionData: {
        carb: 2,
        protein: 22,
        fat: 2,
        energy: 114,
      },
    },
    {
      id: "bre005",
      ingredientName: "Milk 1.5%",
      unit: "ml",
      unitage: 100,
      amount: 200,
      nutritionData: {
        carb: 5,
        protein: 3,
        fat: 1,
        energy: 44,
      },
    },
    {
      id: "bre006",
      ingredientName: "Frosted forest fruits",
      unit: "g",
      unitage: 100,
      amount: 200,
      nutritionData: {
        carb: 7,
        protein: 1,
        fat: 0,
        energy: 40,
      },
    },
  ],
  meal2: [
    {
      id: "m2001",
      ingredientName: "Chicken breast",
      unit: "g",
      unitage: 100,
      amount: 200,
      nutritionData: {
        carb: 0,
        protein: 22,
        fat: 3,
        energy: 120,
      },
    },
    {
      id: "m2002",
      ingredientName: "White rice",
      unit: "g",
      unitage: 100,
      amount: 100,
      nutritionData: {
        carb: 78,
        protein: 7,
        fat: 1,
        energy: 360,
      },
    },
    {
      id: "m2003",
      ingredientName: "Frosted vegetables",
      unit: "g",
      unitage: 100,
      amount: 200,
      nutritionData: {
        carb: 4,
        protein: 3,
        fat: 1,
        energy: 34,
      },
    },
    {
      id: "m2004",
      ingredientName: "Hell energy drink",
      unit: "ml",
      unitage: 100,
      amount: 250,
      nutritionData: {
        carb: 27,
        protein: 0,
        fat: 0,
        energy: 112,
      },
    },
  ],
  meal3: [
    {
      id: "m3001",
      ingredientName: "Chicken breast",
      unit: "g",
      unitage: 100,
      amount: 200,
      nutritionData: {
        carb: 0,
        protein: 22,
        fat: 3,
        energy: 120,
      },
    },
    {
      id: "m3002",
      ingredientName: "Potato",
      unit: "g",
      unitage: 100,
      amount: 300,
      nutritionData: {
        carb: 16,
        protein: 2,
        fat: 0,
        energy: 77,
      },
    },
    {
      id: "m3003",
      ingredientName: "Apple",
      unit: "g",
      unitage: 100,
      amount: 150,
      nutritionData: {
        carb: 11,
        protein: 0,
        fat: 0,
        energy: 52,
      },
    },
  ],
  meal4: [],
  snack: [
    {
      id: "sna001",
      ingredientName: "Lay's paprika chips",
      unit: "g",
      unitage: 100,
      amount: 140,
      nutritionData: {
        carb: 52,
        protein: 6,
        fat: 31,
        energy: 525,
      },
    },
  ],
};

// Correct ingredient's nutrition data by amount and unitage
export const transformNutritionData = (ingredientData) => {
  const nutritionData = { ...ingredientData.nutritionData };

  for (const [key, value] of Object.entries(nutritionData)) {
    nutritionData[key] = Number(
      ((value * ingredientData.amount) / ingredientData.unitage).toFixed(0)
    );
  }

  return nutritionData;
};

export default TEST_INGREDIENT_LIST;
