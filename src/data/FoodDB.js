import bakery from "./bakery";
import cereal_pasta from "./cereal_pasta";
import egg_dairies from "./egg_dairies";
import fruit from "./fruit";
import meat_fish from "./meat_fish";
import other from "./other";
import vegetable_fruit from "./vegetable_fruit";

import generateUniqueId from "generate-unique-id";

const modules = [
  bakery,
  cereal_pasta,
  egg_dairies,
  fruit,
  meat_fish,
  other,
  vegetable_fruit,
];
let queryList = [];

modules.forEach((module) => {
  module.data.forEach((data) => {
    const query = {
      ingredientName: data.name,
      nutritionData: data.nutritions,
      unit: data.unit,
      unitage: data.unit === "g" || data.unit === "ml" ? 100 : 1,
      id: generateUniqueId(),
      imageURL: data.imageURL,
    };
    queryList.push(query);
  });
});

export default queryList;
