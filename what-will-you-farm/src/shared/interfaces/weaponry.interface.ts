import { Ingredient } from "./ingredient.interface";
import { Material } from "./material.interface";

export interface Weaponry {
  quantity?: number;
  name: string;
  requirements: {
    level: number;
    coins: number;
  };
  ingredients: Material[];
}
