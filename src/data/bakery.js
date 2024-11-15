const bakery = {
  categoryName: "Pékáru",
  data: [
    {
      name: "Magvas kenyér",
      category: "Pékáru",
      nutritions: { calories: 288, protein: 11, fat: 7, ch: 45 },
      unit: "g",
    },
    {
      name: "Korpás kenyér",
      category: "Pékáru",
      nutritions: { calories: 247, protein: 10, fat: 1.8, ch: 44.6 },
      unit: "g",
    },
    {
      name: "Rozskenyér",
      category: "Pékáru",
      nutritions: { calories: 260, protein: 8, fat: 3, ch: 42 },
      unit: "g",
    },
    {
      name: "Pur Pur kenyér (Spar)",
      category: "Pékáru",
      nutritions: { calories: 210, protein: 11.4, fat: 3.2, ch: 30.5 },
      unit: "g",
      price: {
        quantity: 400,
        money: 700,
      },
    },
  ],
};

export default bakery;
