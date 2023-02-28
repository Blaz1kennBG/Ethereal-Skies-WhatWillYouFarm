import { Ingredient } from "./interfaces/ingredient.interface";
import { Material } from "./interfaces/material.interface";
import { Weaponry } from "./interfaces/weaponry.interface";
import itemsJson from "./items.json";

export const database = {
  getAllItems: () => {
    const modified = itemsJson;
    // Fill the materials with ingredients
    modified.materials.forEach((v) => {
      v.ingredients = v.ingredients.map((ingr) => {
        const replace =
          itemsJson.ingredients[
            ingr.name as keyof typeof itemsJson.ingredients
          ];
        return {
          ...ingr,
          ...replace,
        };
      });
    });
    modified.fill_with.forEach((v) => {
      let category = modified[v.category];
      category = modified[v.category].map((item: Weaponry) => {
        /*  console.log("item: ", item); */
        /* console.log(item.name, item.ingredients); */
        return {
          ...item,
          ingredients: (item.ingredients = item.ingredients.map((mat) => {
            const existing = modified.materials.find(
              (_) => _.name === mat.name
            );
            return {
              ...mat,
              ...existing,
            };
          })),
        };
      });
    });
    console.log(modified);
    return modified;
  },
};
