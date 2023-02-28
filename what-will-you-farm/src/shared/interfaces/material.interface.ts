import { Ingredient } from "./ingredient.interface";

export interface Material {
  name: string;
  description?: string;
  quantity?: number;
  ingredients?: Ingredient[];
}
