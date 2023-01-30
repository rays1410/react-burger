import orderDetailsStyles from "./order-details.module.css";
import doneIcon from "../../images/done.svg";
import { useAppSelector } from "../..";
import { ORDER_NUMBER_LOADING } from "../../utils/constants";
import React from "react";

const OrderDetails = React.memo(() => {
  const { modalStatus, orderNumber } = useAppSelector(
    (state) => state.burgerConstructor
  );
  // const isBunEmpty = !Object.keys(currentBun).length;
  // const isOrderSuccess = status === "succeeded";

  const modalContent = (
    <>
      <p
        className={`${orderDetailsStyles.orderId} text text_type_digits-large`}
      >
        {orderNumber}
      </p>
      <p
        className={`${orderDetailsStyles.textOrderId} text text_type_main-medium`}
      >
        идентификатор заказа
      </p>
      <img
        className={`${orderDetailsStyles.successIcon}`}
        src={doneIcon}
        alt={"иконка успешного оформления заказа"}
      />
      <p className={`text text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.bottomText}text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );

  const bunError = (
    <p className={`text text_type_main-medium`}>Ошибка. Выберите булку</p>
  );

  const loaderContent = (
    <p className={`text text_type_main-medium`}>Загрузка...</p>
  );

  return (
    <div className={orderDetailsStyles.modalContent}>
      {modalStatus === "no-bun-error"
        ? bunError
        : modalStatus === "bun-there"
        ? loaderContent
        : modalStatus === "order-success"
        ? modalContent
        : modalStatus === "order-failed"
        ? null
        : null}
    </div>
  );
});

export default OrderDetails;
