import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
function App() {
  return (
    <>
      <AppHeader />
      <div className={appStyles.centralBlock}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;
