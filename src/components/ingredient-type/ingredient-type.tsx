import React from "react";
import ingredientStyles from "./ingredient-type.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";

// This component contains groups of ingredients, for example buns
const IngredientType = ({ typeName, data }: any) => {
  return (
    <div>
      <p
        className={`${ingredientStyles.butchTitle} text text_type_main-medium`}
      >
        {typeName}
      </p>
      <div className={ingredientStyles.ingredientsButch}>
        {data.map((item: any) => {
          return <IngredientCard ingredient={item} />
        })}

      </div>
    </div>
  );
};

export default IngredientType;
