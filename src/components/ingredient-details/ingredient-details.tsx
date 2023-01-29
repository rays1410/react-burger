import ingredientDetailsStyles from "./ingredient-details.module.css";
import { nutrientsNameMapping } from "../../utils/constants";
import { IngredientObject } from "../../utils/interfaces";
import { useAppSelector } from "../..";

// const IngredientDetails = ({ ingredient }: IngredientCardType) => {
const IngredientDetails = () => {

  // Вытаскиваем ингредиент, который будем показывать в модалке
  const modalIngredient = useAppSelector(
    (state) => state.ingredients.modalIngredient
  );

  return modalIngredient ? (
    <div className={ingredientDetailsStyles.modalContent}>
      <img
        src={modalIngredient.image_large}
        className={`mb-4`}
        alt="картинка ингредиента"
      />
      <p className="text text_type_main-medium mb-5">{modalIngredient.name}</p>
      <div className={ingredientDetailsStyles.bottomTable}>
        {Object.entries(nutrientsNameMapping).map(([key, value]) => (
          <div key={key} className={ingredientDetailsStyles.tableItem}>
            <p className={`text text_type_main-default text_color_inactive`}>
              {value}
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {modalIngredient[key as keyof IngredientObject]}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Ошибка</div>
  );
};

export default IngredientDetails;
