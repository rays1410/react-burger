import React from "react";
import ingredientCardStyles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({ ingredient }: any) => {
  console.log(ingredient);
  return (
    <div className={ingredientCardStyles.ingredientCard}>
      <img src={ingredient.image} className={ingredientCardStyles.cardImg} />
      <p
        className={`${ingredientCardStyles.cardPrice} text text_type_digits-default`}
      >
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};

export default IngredientCard;
