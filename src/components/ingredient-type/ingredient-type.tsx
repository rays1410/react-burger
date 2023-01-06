import React from "react";
import ingredientStyles from "./ingredient-type.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { IngredientObject, IngredientTypeTypes } from "../../utils/interfaces";

/* This component contains groups of ingredients, for example buns */
const IngredientType = ({ children, data }: IngredientTypeTypes) => {
  return (
    <div>
      <p
        className={`${ingredientStyles.butchTitle} text text_type_main-medium`}
      >
        {children}
      </p>
      <div className={ingredientStyles.ingredientsButch}>
        {data.map((item: IngredientObject) => {
          return <IngredientCard key={item._id} ingredient={item} />;
        })}
      </div>
    </div>
  );
};

export default IngredientType;
