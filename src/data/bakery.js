const bakery = {
  categoryName: "Pékáru",
  data: [
    {
      name: "Magvas kenyér",
      category: "Pékáru",
      nutritions: { energy: 288, protein: 11, fat: 7, carb: 45 },
      unit: "g",
    },
    {
      name: "Korpás kenyér",
      category: "Pékáru",
      nutritions: { energy: 247, protein: 10, fat: 1.8, carb: 44.6 },
      unit: "g",
    },
    {
      name: "Rozskenyér",
      category: "Pékáru",
      nutritions: { energy: 260, protein: 8, fat: 3, carb: 42 },
      unit: "g",
    },
    {
      name: "Pur Pur kenyér (Spar)",
      category: "Pékáru",
      nutritions: { energy: 210, protein: 11.4, fat: 3.2, carb: 30.5 },
      unit: "g",
      price: {
        quantity: 400,
        money: 700,
      },
    },
  ],
};

export default bakery;
