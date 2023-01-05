import React from "react";
import ingredientCardStyles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({image}: any) => {
  console.log(ingredientCardStyles)
  return (
    <div className={ingredientCardStyles.ingredientCard}>
      <img
        src={image}
        className={ingredientCardStyles.cardImg}
      />
      <p
        className={`${ingredientCardStyles.cardPrice} text text_type_digits-default`}
      >
        20
        <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">Краторная булка N-200i</p>
    </div>
  );
};

export default IngredientCard;
