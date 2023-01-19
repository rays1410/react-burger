import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { DataContext } from "../../services/appContext";
import { DataStateInterface } from "../../services/appContext.interfaces";
import { INGREDIENTS_URL } from "../../utils/constants";
import { getData } from "../../utils/utils";
import appStyles from "./app.module.css";

function App() {
  const [dataState, setDataState] = useState<DataStateInterface>({
    isLoading: false,
    isError: false,
    ingredientsData: [],
  });

  useEffect(() => {
    setDataState((dataState) => ({ ...dataState, isLoading: true }));
    getData(INGREDIENTS_URL)
      .then(({ data }) =>
        setDataState((dataState) => ({
          ...dataState,
          ingredientsData: data,
          isLoading: false,
        }))
      )
      .catch((e) =>
        setDataState((dataState) => ({
          ...dataState,
          isLoading: false,
          isError: true,
        }))
      )
      .finally(() => {
        setDataState((dataState) => ({
          ...dataState,
          isLoading: false,
        }));
      });
  }, []);

  return (
    <>
      <AppHeader />
      <div className={appStyles.centralBlock}>
        <DataContext.Provider value={{ dataState, setDataState }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DataContext.Provider>
      </div>
    </>
  );
}

export default App;
