import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import constructorStyles from "./burger-constructor.module.css";
import { useContext, useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getRandomIngredients } from "../../utils/utils";
import { CONSTANT_BUN, ORDER_URL } from "../../utils/constants";
import { DataContext } from "../../services/appContext";
import { DataContextType } from "../../services/appContext.interfaces";
import useToggle from "../../hooks/useToggle";
import useOrder from "../../hooks/useOrder";

const BurgerConstructor = () => {
  // Булка захардкожена. В дальшейшем, когда можно будет выбирать ингредиенты
  // кликом, я буду проводить проверку ингредиента на булковость и, если это булка,
  // буду менять это состояние. Кажется это лучше, чем постоянно
  // бегать по массиву ингредиентов в конструкторе в поисках нескольких булок.
  const [currentBun] = useState(CONSTANT_BUN);
  const { dataState } = useContext<DataContextType>(DataContext);

  // Currently hardcoded
  // Сейчас в случайный массив может попасть несколько булок.
  // Это исправится само собой в будущем, как и написано выше,
  // так что, надеюсь, это не проблема.
  const numOfTestIngredients = 8;
  const currentIngredients = getRandomIngredients(
    numOfTestIngredients,
    dataState.ingredientsData
  );

  // Toggle for the modal window
  const [modalVisible, setModalVisible] = useToggle(false);

  // Custom hook for order checkout
  const { execute, orderNum } = useOrder(
    currentIngredients,
    currentBun,
    ORDER_URL,
    setModalVisible
  );

  const totalPrice = () => {
    return currentIngredients.reduce(
      (totalPrice, item) => (totalPrice += item?.price),
      currentBun.price * 2
    );
  };

  return (
    <>
      <div className={constructorStyles.mainBlock}>
        <div className={constructorStyles.allBurgerElements}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={currentBun.name + " (верх)"}
            price={currentBun.price}
            thumbnail={currentBun.image || ""}
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
            text={currentBun.name + " (низ)"}
            price={currentBun.price}
            thumbnail={currentBun.image || ""}
          />
        </div>

        <div className={constructorStyles.priceAndOrder}>
          <div className={constructorStyles.price}>
            <p className="text text_type_digits-medium">{totalPrice() || 0}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="ml-10"
            onClick={execute}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {modalVisible && (
        <Modal header={" "} onClosed={setModalVisible}>
          <OrderDetails>{orderNum}</OrderDetails>
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
