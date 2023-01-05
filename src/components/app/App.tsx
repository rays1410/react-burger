import React from "react";
import logo from "../../images/logo.svg";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css"

function App() {
  return (
    <>
      <AppHeader/>
      <div className={appStyles.centralBlock}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
    </>
  );
}

export default App;
