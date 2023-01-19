import React from "react";

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

export interface IngredientObjectArray {
  ingredientsData: IngredientObject[];
}

export interface IngredientCardType {
  ingredient: IngredientObject;
}

export interface IngredientTypeTypes {
  children: React.ReactNode;
  data: IngredientObject[];
  typeName: string;
}

export interface ModalTypes {
  children: React.ReactNode;
  header: string;
  onClosed: any;
}
