import { createContext} from "react";
import { DataContextType } from "./appContext.interfaces";

export const DataContext = createContext<DataContextType>({} as DataContextType);
