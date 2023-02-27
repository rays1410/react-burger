import React from "react";

export interface IIngredientObject {
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

export interface IIngredientObjectArray {
  ingredientsData: IIngredientObject[];
}

export interface IIngredientCard {
  ingredient: IIngredientObject;
  ingredientClickHandler: (ingredient: IIngredientObject) => void;
}

export interface IIngredientType {
  children: string;
  data: IIngredientObject[];
  typeName: string;
  ingredientClickHandler: (ingredient: IIngredientObject) => void;
}

export interface IModal {
  children: React.ReactNode;
  header: string;
  onClosedModal: () => void;
}

export interface IModalOverlay {
  children: React.ReactNode;
  onClosed: () => void;
}

export interface IProtectedRoute {
  onlyUnAuth: boolean;
  redirectTo: string;
  children: React.ReactNode;
}

export interface IDragItem {
  index: number;
  id: string;
  type: string;
}

export interface IDraggableConstructorElementProps {
  index: number;
  item: IConstructorItem;
}

export interface IConstructorItem {
  id: string;
  ingredient: IIngredientObject;
}

export interface IUserInfoObject {
  email: string;
  name: string;
}

export interface IAuthState {
  isAuthChecked: boolean;
  isUserLogged: boolean;
  isUserData: boolean;
  loading: boolean;
  userInfo: null | IUserInfoObject;
  userMessage: null | string;
  devError: null | string;
}

export interface IBurgerIngredientsState {
  currentIngredients: IConstructorItem[];
  currentBun: IIngredientObject;
  orderNumber: number;
  totalPrice: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  modalStatus: "no-bun-error" | "bun-there" | "order-success" | "order-failed";
  error: string | null | undefined;
}

export interface IIngredientsState {
  ingredientsData: IIngredientObject[];
  modalIngredient: IIngredientObject | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

export interface IResetPassword {
  loading: boolean;
  requestSuccess: boolean;
  changeSuccess: boolean;
  userMessage: null | string;
  devError: null | string;
}
