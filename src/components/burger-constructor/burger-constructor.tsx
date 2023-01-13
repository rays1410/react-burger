import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import constructorStyles from "./burger-constructor.module.css";
import { ingredientsData } from "../../utils/data";
import React from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

// TODO there: replace num field by Symbol and fetch data from server
const BurgerConstructor = () => {
  // Currently hardcoded
  const numOfTestIngredients = 8;
  const totalNumberOfIngredients = ingredientsData.length;
  const testIngredients = [];

  // Generate random set of ingredients in the constructor
  for (let i = 0; i < numOfTestIngredients; i++) {
    let randIndx = Math.floor(Math.random() * totalNumberOfIngredients);
    testIngredients.push({ num: i, ...ingredientsData[randIndx] });
  }

  // State for modal window
  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
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
            onClick={toggleModal}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      
      {modalVisible && (
        <Modal header={" "} onClosed={toggleModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
