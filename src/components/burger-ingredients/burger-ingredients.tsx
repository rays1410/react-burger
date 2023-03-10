import { useState, useMemo } from "react";
import { Link, Element } from "react-scroll";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientType from "../ingredient-type/ingredient-type";
import ingredientStyles from "./burger-ingredients.module.css";
import { IIngredientObject } from "../../utils/interfaces";
import { titlesEntries } from "../../utils/constants";
import { useAppSelector } from "../..";
import { useDispatch } from "react-redux";
import { setModalIngredient } from "../../services/ingredientSlice";
import { getIngredientsSlice } from "../../utils/utils";

// Find all entries of ingredient type
// For example, if typeName is 'bun', function returns array of all buns
function findButchItems(
  typeName: string,
  ingredientsData: IIngredientObject[]
) {
  return ingredientsData.filter((item) => item.type === typeName);
}

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");

  // State for modal window
  const dispatch = useDispatch();

  const ingredientClickHandler = (ingredient: IIngredientObject) => {
    dispatch(setModalIngredient(ingredient));
  };

  // Получаем ингредиенты из хранилища
  const { ingredientsData } = useAppSelector(getIngredientsSlice);

  // Мемоизируем ингредиенты
  const content = useMemo(() => {
    return titlesEntries.map(([key, value]) => (
      <IngredientType
        key={key}
        data={findButchItems(key, ingredientsData)}
        typeName={key}
        ingredientClickHandler={ingredientClickHandler}
      >
        {value}
      </IngredientType>
    ));
  }, [ingredientsData]);

  return (
    <main className={ingredientStyles.mainBlock}>
      <p className={`${ingredientStyles.mainTitle} text text_type_main-large`}>
        Соберите бургер
      </p>

      {/* Go throughout [key, value] of ingredient types and draw tabs */}
      {/* We wrap each tab with <Link> to be able to move when we click on tab */}

      <div className={ingredientStyles.tabs}>
        {titlesEntries.map(([key, value]) => (
          <Link
            key={key}
            activeClass="active"
            to={key}
            containerId="ingredientsContainer"
            spy={true}
            smooth={true}
            duration={500}
            onSetActive={() => setCurrentTab(key)}
          >
            <Tab
              value={key}
              active={currentTab === key}
              onClick={() => undefined}
            >
              {value}
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
        {content}
      </Element>
    </main>
  );
};

export default BurgerIngredients;
