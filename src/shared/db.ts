import itemsJson from "./items.json";

export interface Requirements {
  level: number;
  coins: number;
}

export interface Material {
  craftable_amount: number;
  type: string;
  viewValue: string;
  name: string;
  raw: number;
  quantity: number;
  description: string;
  ingredients: Ingredient[];
}

export interface CraftingItem {
  description?: string;
  type: string;
  viewValue: string;
  name: string;
  requirements: Requirements;
  materials: Material[];
}
export interface Ingredient {
  type: string;
  viewValue: string;
  name: string;
  description: string;
  raw: number;
  quantity: number;
}

export interface Root {
  armor: CraftingItem[];
  weapon: CraftingItem[];
  materials: Material[];
  ingredients: { [key: string]: Ingredient };
  fill_with: { category: string; with: string }[];
  searchable: string[];
  [key: string]: any; // Index signature
}
export interface FarmingMaterial {
  quantity: number;
  item: any;
  checked: boolean;
}
export const database = {
  getAllItems() {
    const root = itemsJson as any as Root;

    // Loop over the materials in root object
    root.materials.forEach((material) => {
      // Loop over the ingredients for each material
      material.ingredients.forEach((ingredient) => {
        // Find the matching ingredient in the ingredients object
        const matchingIngredient = root.ingredients[ingredient.name];
        // Merge the ingredient with the matching ingredient from the ingredients object
        Object.assign(ingredient, matchingIngredient);
      });
    });

    // Loop over the fill_with array in the root object
    root.fill_with.forEach((fillItem) => {
      // Find the property in the root object that is equal to fillItem.category
      const category = root[fillItem.category];
      // Loop over the category
      category.forEach((categoryItem: CraftingItem) => {
        // Loop over the ingredients for each category item
        if (!categoryItem.materials) {
          console.warn("ERROR: ", categoryItem);
        }
        categoryItem.materials.forEach((ingredient) => {
          // Find the matching ingredient in the materials property of the root object
          const matchingMaterial = root.materials.find(
            (material) => material.name === ingredient.name
          );

          if (matchingMaterial) {
            // Merge the ingredient with the matching ingredient from the materials property of the root object
            matchingMaterial.ingredients = matchingMaterial.ingredients.map(
              (v) => ({ ...v })
            );
            Object.assign(ingredient, matchingMaterial);
          } else {
            Object.assign(ingredient);
          }
        });
      });
    });
    const base: CraftingItem[] = root.searchable
      .map((v) => root[v])
      .flat() as CraftingItem[];

    return base;
  },
};
