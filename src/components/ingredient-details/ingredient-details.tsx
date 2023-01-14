import ingredientDetailsStyles from "./ingredient-details.module.css";
import { nutrientsNameMapping } from "../../utils/constants";
import { IngredientCardType, IngredientObject } from "../../utils/interfaces";

const IngredientDetails = ({ ingredient }: IngredientCardType) => {
  return (
    <div className={ingredientDetailsStyles.modalContent}>
      <img src={ingredient.image_large} className={`mb-4`} />
      <p className="text text_type_main-medium mb-5">{ingredient.name}</p>
      <div className={ingredientDetailsStyles.bottomTable}>
        {Object.entries(nutrientsNameMapping).map(([key, value]) => (
          <div key={key} className={ingredientDetailsStyles.tableItem}>
            <p className={`text text_type_main-default text_color_inactive`}>
              {value}
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {ingredient[key as keyof IngredientObject]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientDetails;
