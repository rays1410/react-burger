import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientSlice";
import { AppDispatch } from "../..";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const dataStatus = useSelector((state: any) => state.ingredients.status);

  useEffect(() => {
    if (dataStatus === "idle") dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <div className={appStyles.centralBlock}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </>
  );
}

export default App;
