import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import doneIcon from "../../images/done.svg";

const OrderDetails = () => {
  return (
    <div className={orderDetailsStyles.modalContent}>
      <p
        className={`${orderDetailsStyles.orderId} text text_type_digits-large`}
      >
        034536
      </p>
      <p
        className={`${orderDetailsStyles.textOrderId} text text_type_main-medium`}
      >
        идентификатор заказа
      </p>
      <img className={`${orderDetailsStyles.successIcon}`} src={doneIcon} />
      <p className={`text text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${orderDetailsStyles.bottomText}text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
