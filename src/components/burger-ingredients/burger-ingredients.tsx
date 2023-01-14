import React from "react";
import { Link, Element } from "react-scroll";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientType from "../ingredient-type/ingredient-type";
import ingredientStyles from "./burger-ingredients.module.css";
import { IngredientObject, IngredientObjectArray } from "../../utils/interfaces";
import {typeNameMapping} from "../../utils/constants"

// Find all entries of ingredient type
// For example, if typeName is 'bun', function returns array of all buns

function findButchItems(typeName: string, ingredientsData: IngredientObject[]) {
  return ingredientsData.filter((item) => item.type === typeName);
}

const BurgerIngredients = ({ingredientsData}: IngredientObjectArray) => {
  const [currentTab, setCurrentTab] = React.useState("bun");
  const titlesEntries = Object.entries(typeNameMapping);
  return (
    <div className={ingredientStyles.mainBlock}>
      <p className={`${ingredientStyles.mainTitle} text text_type_main-large`}>
        Соберите бургер
      </p>

      {/* Go throughout [key, value] of ingredient types and draw tabs */}
      {/* We wrap each tab with <Link> to be able to move when we click on tab */}
      <div className={ingredientStyles.tabs}>
        {titlesEntries.map(([key]) => (
          <Link
            key={key}
            activeClass="active"
            to={key}
            containerId="ingredientsContainer"
            spy={true}
            smooth={true}
            duration={500}
          >
            <Tab value={key} active={currentTab === key} onClick={setCurrentTab}>
              {typeNameMapping[key as keyof typeof typeNameMapping]}
            </Tab>
          </Link>
        ))}
      </div>

      {/* Draw the list of ingredients */}
      {/* <Element> defines container in which we can walk using tabs */}
      {/* Using container id, <Link> understands where it scroll us*/}
      {/* In <IngredientType>, we wrap titles with <Element> creating 'anchors' for react-scroll*/}
      <Element
        name="leftContainer"
        id="ingredientsContainer"
        className={ingredientStyles.ingredientSection}
      >
        {titlesEntries.map(([key, value]) => (
          <IngredientType
            key={key}
            data={findButchItems(key, ingredientsData)}
            typeName={key}
          >
            {value}
          </IngredientType>
        ))}
      </Element>
    </div>
  );
};

export default BurgerIngredients;
