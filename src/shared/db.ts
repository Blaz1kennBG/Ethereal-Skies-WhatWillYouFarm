import { cloneDeep } from "lodash-es";
import itemsJson from "./items.json";
import testJson from "./test.json";
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import path from "path";

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

async function doStuff() {
  const config: FirebaseOptions = {
    apiKey: "AIzaSyD8Nt0dY49P2akdSuyeAn32C7vhfAES8Iw",
    projectId: "ethereal-skies-wyyf",
  };
  const app = initializeApp(config);
  const db = getFirestore(app);
  const materialsQuery = collection(db, "armor");
  const materialsSnapshot = await getDocs(materialsQuery);
  /*   console.log(materialsQuery, materialsSnapshot); */
  const materialList = await materialsSnapshot.docs
    .map((doc) => doc.data())
    .map(async (item) => {
      return {
        ...item,
        materials: item.materials.map((v) => ({
          collection: v.ingredient.path.split("/")[0],
          path: v.Ingredient.path,
        })),
      };
    });
  const paths = materialList
    .map((m) => {
      // Extract collettion name and path
      const pathes = m.materials.map((v) => {
        return {
          collection: v.ingredient.path.split("/")[0],
          path: v.ingredient.path,
        };
      });
      return pathes;
    })
    .flat();

  for await (const v of paths) {
    const l = await getDocs(collection(db, v.collection));
    console.log(l);
  }
}

export const database = {
  getAllItems() {
    const root = cloneDeep(testJson);
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
        (v) => typeof v === "object" && testJson.fillables.includes(v.type)
      );
    return _new as CraftingItem[];
  },
};

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
      testJson.items.find((x) => x.name === ingredient.name)
    );
    if (existing) {
      /* console.log("[EXISTS: ]: ", existing, ingredient); */
      existing.quantity += ingredient.quantity;
      existing.raw += ingredient.raw;
    } else {
      /*  console.log("[NOT EXIST]: ", matching, ingredient); */
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
      matching.ingredients = [matching.ingredients];
    }
    Object.assign(newObj, { ...ingredient, ...matching });

    item.ingredients[index] = newObj as any;
  });
  return item;
}
function multiplyToTarget(target: number, step: any, initialValue = 1): number {
  const value = initialValue * step;
  if (!initialValue || !value) {
    throw new Error(
      "InitialValue or value is falsy: \n" +
        `Initial: ${initialValue} \n` +
        `value: ${value}\n` +
        `step: ${step}\n` +
        `target: ${target}`
    );
  }
  if (value < target) {
    return multiplyToTarget(target, step, initialValue + 1);
  }
  return value;
}
