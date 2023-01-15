import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import constructorStyles from "./burger-constructor.module.css";
import React from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IngredientObjectArray } from "../../utils/interfaces";
import { getRandomIngredients, getTotalPrice } from "../../utils/utils";
import { BUN_ID } from "../../utils/constants";

const BurgerConstructor = ({ ingredientsData }: IngredientObjectArray) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const BUN =
    ingredientsData.find((item) => item?._id === BUN_ID) || ingredientsData[0];

  // Currently hardcoded
  const numOfTestIngredients = 8;
  const currentIngredients = getRandomIngredients(
    numOfTestIngredients,
    ingredientsData
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <div className={constructorStyles.mainBlock}>
        <div className={constructorStyles.allBurgerElements}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={BUN?.price}
            thumbnail={BUN?.image || ""}
          />

          <div className={constructorStyles.dynamicBurgerElements}>
            {currentIngredients.map((item, indx) => (
              <div key={indx} className={constructorStyles.burgerItem}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item?.name}
                  price={item?.price}
                  thumbnail={item?.image || ""}
                />
              </div>
            ))}
          </div>

          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={BUN?.price}
            thumbnail={BUN?.image || ""}
          />
        </div>

        <div className={constructorStyles.priceAndOrder}>
          <div className={constructorStyles.price}>
            <p className="text text_type_digits-medium">
              {getTotalPrice(currentIngredients, BUN?.price) || 0}
            </p>
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
