import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableConstructorElement from "../draggable-constructor-element/draggable-constructor-element";
import constructorStyles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import useToggle from "../../hooks/useToggle";
import {
  addIngredient,
  calculateTotalPrice,
  reset,
  setBun,
  setModalStatus,
} from "../../services/constructorSlice";
import { AppDispatch, useAppSelector } from "../../index";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks";
import { IngredientObject } from "../../utils/interfaces";
import { sendOrderRequest } from "../../services/constructorSlice";
import Modal from "../modal/modal";

const BurgerConstructor = () => {
  // Достаем текущее состояние конструктора
  const { currentIngredients, currentBun, totalPrice } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const dispatch = useDispatch<AppDispatch>();

  // Хук дропа карточек в конструктор
  const [, dropTarget] = useDrop({
    accept: "ingredient-card",
    drop(ingredient: IngredientObject) {
      onDropHandler(ingredient);
    },
  });

  // Обработка дропа
  const onDropHandler = (ingredient: IngredientObject) => {
    // Если дропнутый ингредиент - булка, то меняем булку,
    // иначе - добавляем ингредиент

    if (ingredient.type === "bun") {
      dispatch(setBun(ingredient));
      dispatch(setModalStatus("bun-there"));
    } else {
      dispatch(addIngredient(ingredient));
    }

    // И в любом случае пересчитываем цену
    dispatch(calculateTotalPrice());
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    dispatch(reset());
  }

  // Хук-переключалка для модалки
  const [modalVisible, setModalVisible] = useToggle(false);

  // Обработчик кнопки "Оформить заказ"
  const sendOrderHandler = () => {

    // Показываем модальное окно
    setModalVisible(true);

    // Если булка есть
    if (Object.keys(currentBun).length !== 0) {
      // Берем айдишники ингредиентов в конструкторе
      const ingredientsId = currentIngredients.map(
        (item) => item.ingredient._id
      );

      // Оборачиваем ингредиенты в булки
      const idArray = [currentBun._id, ...ingredientsId, currentBun._id];

      dispatch(sendOrderRequest(idArray)).then((payload) => {
        return payload;
      });
    }
  };

  // Часть, которая описывает верхнюю и нижнюю булки
  const bunPart = (position: "top" | "bottom") => {
    // Общий класс для пустой булки
    const bunClass = `${constructorStyles.emptyBun} text text_type_main-small`;

    // Доп класс для верхней и нижней
    const extraClass =
      position === "top"
        ? `${constructorStyles.topEmptyBun}`
        : `${constructorStyles.bottomEmptyBun}`;

    // Проверяем пуста ли булка и, в зависимости от этого, показываем
    // нужный элемент
    return Object.keys(currentBun).length === 0 ? (
      <div className={`${bunClass} ${extraClass}`}>Выберите булку</div>
    ) : (
      <ConstructorElement
        type={position}
        isLocked={true}
        text={currentBun.name + (position === "top" ? " (верх)" : " (низ)")}
        price={currentBun.price}
        thumbnail={currentBun.image || ""}
      />
    );
  };

  // Часть, которая соответствует отрисовке ингредиентов
  const ingredientsPart =
    // Если нет игредиентов - показываем класс пустой булки
    // Иначе рисуем draggable ингредиенты.
    currentIngredients.length === 0 ? (
      <div
        className={`${constructorStyles.emptyBun} text text_type_main-small`}
      >
        Выберите ингредиенты
      </div>
    ) : (
      <div className={constructorStyles.dynamicBurgerElements}>
        {currentIngredients.map((item, indx) => (
          <DraggableConstructorElement key={item.id} index={indx} item={item} />
        ))}
      </div>
    );

  // Часть, которая отвечает за оформление заказа
  const orderPart = (
    <div className={constructorStyles.priceAndOrder}>
      <div className={constructorStyles.price}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass="ml-10"
        onClick={sendOrderHandler}
      >
        Оформить заказ
      </Button>
    </div>
  );

  return (
    <>
      <main className={constructorStyles.mainBlock}>
        <div className={constructorStyles.allBurgerElements} ref={dropTarget}>
          {bunPart("top")}
          {ingredientsPart}
          {bunPart("bottom")}
          {orderPart}
        </div>
      </main>

      {modalVisible && (
        <Modal header={" "} onClosedModal={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
