import { createContext} from "react";
import { ContextProps, DataContextType } from "./appContext.interfaces";

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider: React.FC<ContextProps> = ({
  children,
  dataState,
  setDataState,
}) => {
  return (
    <DataContext.Provider value={{ dataState, setDataState }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
