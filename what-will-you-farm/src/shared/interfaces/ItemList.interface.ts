import { Ingredient } from "./ingredient.interface";
import { Material } from "./material.interface";
import { Weaponry } from "./weaponry.interface";

export interface ItemList {
  armor: Weaponry[];
  materials: Material[];
  ingredients: Ingredient[];
}
