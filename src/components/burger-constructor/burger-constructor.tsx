import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import constructorStyles from "./burger-constructor.module.css";
import { ingredientsData } from "../../utils/data";

// TODO there: replace num field by Symbol and fetch data from server
const BurgerConstructor = () => {
  
  // Currently hardcoded
  const numOfTestIngredients = 8;
  const totalNumberOfIngredients = ingredientsData.length;
  const testIngredients = [];
  for (let i = 0; i < numOfTestIngredients; i++) {
    let randIndx = Math.floor(
      Math.random() * (totalNumberOfIngredients - 1) + 1
    );
    testIngredients.push({num: i, ...ingredientsData[randIndx]});
  }

  return (
    <div className={constructorStyles.mainBlock}>
      <div className={constructorStyles.allBurgerElements}>
        {/* It seems that allBurgerElements level is redundant */}

        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={ingredientsData[1].image}
        />

        <div className={constructorStyles.dynamicBurgerElements}>
          {testIngredients.map((item) => (
            <div key={item.num} className={constructorStyles.burgerItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={ingredientsData[1].image}
        />
      </div>

      <div className={constructorStyles.priceAndOrder}>
        <div className={constructorStyles.price}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
