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
  const [current, setCurrent] = React.useState("bun");
  
  const mapRussianTitles = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  return (
    <div className={ingredientStyles.mainBlock}>
      <p className={`${ingredientStyles.mainTitle} text text_type_main-large`}>
        Соберите бургер
      </p>

      {/* Go throughout [key, value] of mapRussianTitles and draw tabs */}
      <div className={ingredientStyles.tabs}>
        {Object.entries(mapRussianTitles).map(([key]) => (
          <Tab key={key} value={key} active={current === key} onClick={setCurrent}>
            {mapRussianTitles[key as keyof typeof mapRussianTitles]}
          </Tab>
        ))}
      </div>

      {/* Draw the list of ingredients, which correspodns to the chosen tab */}
      <div className={ingredientStyles.ingredientSection}>
        <IngredientType data={findButchItems(current)}>
          {mapRussianTitles[current as keyof typeof mapRussianTitles]}
        </IngredientType>
      </div>
    </div>
  );
};

export default BurgerIngredients;
