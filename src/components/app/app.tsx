import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import DataContextProvider from "../../services/appContext";
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
    getData(dataState, setDataState, INGREDIENTS_URL);
  }, []);

  return (
    <>
      <AppHeader />
      <div className={appStyles.centralBlock}>
        <DataContextProvider dataState={dataState} setDataState={setDataState}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DataContextProvider>
      </div>
    </>
  );
}

export default App;
