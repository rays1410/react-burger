export interface IngredientObject {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IngredientCardType {
  ingredient: IngredientObject;
}

export interface IngredientTypeTypes {
  children: React.ReactNode;
  data: IngredientObject[];
}
