import { cloneDeep } from "lodash-es";
import { armors } from "./armors";
import { ingredients } from "./ingredients";
import { accessories } from "./jewelry";
import { materials } from "./materials";
import dataJson from "./test.json";
import { tools } from "./tools";
import { weapons } from "./weapons";

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
  ingredients: Material[];
}

export interface CraftingItem {
  icon: string;
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
}

const fill_database = () => {
  return {
    items: [...ingredients(), ...materials()],
    armor: armors(),
    weapon: weapons(),
    accessory: accessories(),
    tool: tools(),
    fillables: ["armor", "weapon", "tool", "accessory"],
  };
};

export const database = {
  getAllItems() {
    const root = fill_database();
    root.fillables.forEach((category: any) => {
      root[category as keyof typeof root].forEach((categoryItem: any) => {
        categoryItem.materials.forEach((material: any, materialIndex: any) => {
          let matching_material = cloneDeep(
            root.items.find((item) => item.name === material.name)
          );
          if (matching_material?.ingredients.length) {
            matching_material = recursiveMaterialSet(
              matching_material as any,
              categoryItem,
              matching_material as any
            );
          }

          categoryItem.materials[materialIndex] = {
            ...material,
            ...matching_material,
          };
        });
      });
    });
    const _new = Object.entries(root)
      .map(([key, value]) => value)
      .flat()
      .filter(
        (v) => typeof v === "object" && dataJson.fillables.includes(v.type)
      );

    return _new as CraftingItem[];
  },
};
export const dataItems = dataJson;
function recursiveMaterialSet(
  data: Material,
  categoryItem: CraftingItem,
  mainMaterial: Material
) {
  const item = cloneDeep(data);

  item.ingredients.forEach((ingredient, index) => {
    const existing = categoryItem.materials.find(
      (x) => x.name === ingredient.name
    );
    const matching = cloneDeep(
      dataJson.items.find((x) => x.name === ingredient.name)
    );
    if (existing) {
      existing.quantity += ingredient.quantity;
      existing.raw += ingredient.raw;
    } else {
      const objToPush = {
        ...matching,
        quantity: ingredient.quantity,
        raw: ingredient.raw,
      } as any;

      categoryItem.materials.push(objToPush);
    }

    if (matching?.ingredients.length) {
      matching.ingredients = recursiveMaterialSet(
        matching as any,
        categoryItem,
        mainMaterial
      ) as any;
    }

    const newObj = {};
    if (!Array.isArray(matching?.ingredients)) {
      try {
        if (matching) matching.ingredients = [matching.ingredients];
        else throw new Error("No matching ingredients");
      } catch (e) {
        console.error(
          `ERROR. Possibilities: \n 1. Item has materials listed but the the materials' ingredients are missing.`
        );
      }
    }

    Object.assign(newObj, { ...ingredient, ...matching });

    item.ingredients[index] = newObj as any;
  });
  return item;
}
