import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ingredientsData from "../../utils/data.js";
import IngredientType from "../ingredient-type/ingredient-type";
import ingredientStyles from "./burger-ingredients.module.css";

// Find all entries of ingredient type
// For example, if typeName is equal 'bun', function return array of all buns
function findButchItems(typeName: any) {
  return ingredientsData.filter((item) => item.type === typeName);
}

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("Булки");

  return (
    <div className={ingredientStyles.mainBlock}>
      <p className={`${ingredientStyles.mainTitle} text text_type_main-large`}>
        Соберите бургер
      </p>

      <div className={ingredientStyles.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={ingredientStyles.ingredientSection}>
        <IngredientType typeName={"Булки"} data={findButchItems("bun")} />
        <IngredientType typeName={"Соусы"} data={findButchItems("sauce")} />
        <IngredientType typeName={"Начинки"} data={findButchItems("main")} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
