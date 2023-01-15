import ingredientCardStyles from "./ingredient-card.module.css";
import { IngredientCardType } from "../../utils/interfaces";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

// This component represents cards of ingredients that
// we see in the left part of application

const IngredientCard = React.memo(({ ingredient }: IngredientCardType) => {

  // State for modal window
  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <div
        className={ingredientCardStyles.ingredientCard}
        onClick={toggleModal}
      >
        {/* <div className={`${ingredientCardStyles.cardCounter} text text_type_digits-default`}>1</div> */}
        <img
          src={ingredient.image}
          className={ingredientCardStyles.cardImg}
          alt={"карточка ингредиента бургера"}
        />
        <p
          className={`${ingredientCardStyles.cardPrice} text text_type_digits-default`}
        >
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </div>

      {modalVisible && (
        <Modal header={"Детали ингредиента"} onClosed={toggleModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
});

export default IngredientCard;
