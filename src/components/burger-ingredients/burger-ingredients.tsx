import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ingredientsData from "../../utils/data.js";
import IngredientCard from "../ingredient-card/ingredient-card";
import ingredientStyles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("Булки");
  return (
    <div className={ingredientStyles.mainBlock}>
      <p className={`${ingredientStyles.mainTitle} text text_type_main-large`}>
        Соберите бургер
      </p>
      {/* <div style={{ display: "flex" }}> */}
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
        <p
          className={`${ingredientStyles.butchTitle} text text_type_main-medium`}
        >
          Булки
        </p>
        <div className={ingredientStyles.ingredientsButch}>
          <IngredientCard image={ingredientsData[0].image} />
          <IngredientCard image={ingredientsData[0].image} />
          <IngredientCard image={ingredientsData[0].image} />
        </div>

        <p
          className={`${ingredientStyles.butchTitle} text text_type_main-medium`}
        >
          Булки
        </p>
        <div className={ingredientStyles.ingredientsButch}>
          <IngredientCard image={ingredientsData[0].image} />
          <IngredientCard image={ingredientsData[0].image} />
          <IngredientCard image={ingredientsData[0].image} />
          <IngredientCard image={ingredientsData[0].image} />
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
