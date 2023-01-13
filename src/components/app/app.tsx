import React from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { apiURL } from "../../utils/constants";

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    isError: false,
    ingredientsData: [],
  });

  React.useEffect(() => {
    const getData = () => {
      setState({ ...state, isLoading: true });
      fetch(`${apiURL}`)
        .then((res) => res.json())
        .then((data) =>
          setState({ ...state, ingredientsData: data.data, isLoading: false })
        )
        .catch((e) => {
          setState({ ...state, isLoading: false, isError: true });
        });
    };
    getData();
  }, []);

  return (
    <>
      <AppHeader />
      <div className={appStyles.centralBlock}>
        <BurgerIngredients {...state} />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;
