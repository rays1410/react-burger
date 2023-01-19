import { IngredientObject } from "../utils/interfaces";

export interface DataStateInterface {
  isLoading: boolean;
  isError: boolean;
  ingredientsData: IngredientObject[];
}

export type DataContextType = {
  dataState: DataStateInterface;
  setDataState: React.Dispatch<React.SetStateAction<DataStateInterface>>;
};

export interface ContextProps {
  children?: React.ReactNode;
  dataState: DataStateInterface;
  setDataState: React.Dispatch<React.SetStateAction<DataStateInterface>>;
}
