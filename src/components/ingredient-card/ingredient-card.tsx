import ingredientCardStyles from "./ingredient-card.module.css";
import { IIngredientCard } from "../../utils/interfaces";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useAppSelector } from "../..";
import { useDrag } from "react-dnd";
import { getBurgerSlice } from "../../utils/utils";

// This component represents cards of ingredients that
// we see in the left part of application

const IngredientCard = React.memo(
  ({ ingredient, ingredientClickHandler }: IIngredientCard) => {
    const [{ opacity }, dragRef] = useDrag(
      () => ({
        type: "ingredient-card",
        item: ingredient,
        collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.5 : 1,
        }),
      }),
      []
    );

    const { currentIngredients, currentBun } = useAppSelector(getBurgerSlice);

    // Если текущий ингредиент === текущей булке, то
    // я показываю галочку на выбранной булке.
    // в противном случае считаю сколько раз текущий ингредиент
    // появляется в конструкторе
    const constructorEntriesNumber =
      ingredient._id === currentBun._id
        ? "✓"
        : currentIngredients.reduce(
            (accum, item) =>
              item.ingredient._id === ingredient._id ? ++accum : accum,
            0
          );

    return (
      <>
        <div
          className={ingredientCardStyles.ingredientCard}
          style={{ opacity: opacity }}
          ref={dragRef}
          onClick={() => ingredientClickHandler(ingredient)}
        >
          <div>
            {constructorEntriesNumber ? (
              <div
                className={`${ingredientCardStyles.cardCounter} text text_type_digits-default`}
              >
                {constructorEntriesNumber}
              </div>
            ) : null}
          </div>
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
      </>
    );
  }
);

export default IngredientCard;
