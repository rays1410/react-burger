import React from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { apiURL } from "../../utils/constants";
import { getData } from "../../utils/utils";

function App() {
  
  // State for the data
  const [dataState, setDataState] = React.useState({
    isLoading: false,
    isError: false,
    ingredientsData: [],
  });

  // Load data from the server
  React.useEffect(() => {
    getData(dataState, setDataState, apiURL);
  }, []);

  return (
    <>
      <AppHeader />
      <div className={appStyles.centralBlock}>
        <BurgerIngredients ingredientsData={dataState.ingredientsData} />
        <BurgerConstructor ingredientsData={dataState.ingredientsData} />
      </div>
    </>
  );
}

export default App;
