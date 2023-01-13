import React from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { apiURL } from "../../utils/constants";
import hardcodedData from "../../utils/data.js";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    isError: false,
    ingredientsData: hardcodedData,
  });

  React.useEffect(() => {
    const getData = () => {
      setState({ ...state, isLoading: true });
      fetch(`${apiURL}`)
        .then((res) => res.json())
        .then((data) =>
          setState({ ...state, ingredientsData: data, isLoading: false })
        )
        .catch((e) => {
          setState({ ...state, isLoading: false, isError: true });
        });
    };
    // getData();
  }, []);

  return (
    <>
      <AppHeader />
      <Modal header={""}>
        <OrderDetails />
      </Modal>
      <Modal header={"Детали ингредиента"}>
        <IngredientDetails
          ingredientImage={hardcodedData[0].image_large}
          ingredientName={hardcodedData[0].name}
          infoArray={[
            hardcodedData[0].calories,
            hardcodedData[0].calories,
            hardcodedData[0].calories,
            hardcodedData[0].calories,
          ]}
        />
      </Modal>

      <div className={appStyles.centralBlock}>
        <BurgerIngredients ingredientsData={state.ingredientsData} />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;
