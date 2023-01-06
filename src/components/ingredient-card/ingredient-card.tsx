import ingredientCardStyles from "./ingredient-card.module.css";
import { IngredientCardType } from "../../utils/interfaces";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({ ingredient }: IngredientCardType) => {
  return (
    <div className={ingredientCardStyles.ingredientCard}>
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
  );
};

export default IngredientCard;
