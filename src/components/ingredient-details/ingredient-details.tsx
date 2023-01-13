import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import {nameMapping} from "../../utils/constants"

const IngredientDetails = ({
  ingredient,
}: any) => {

  return (
    <div className={ingredientDetailsStyles.modalContent}>
      <img src={ingredient.image_large} className={`mb-4`} />
      <p className="text text_type_main-medium mb-5">{ingredient.name}</p>
      <div className={ingredientDetailsStyles.bottomTable}>
        {Object.entries(nameMapping).map(([key, value]: any) => (
          <div key={key} className={ingredientDetailsStyles.tableItem}>
            <p className={`text text_type_main-default text_color_inactive`}>{value}</p>
            <p className={`text text_type_digits-default text_color_inactive`}>{ingredient[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientDetails;
