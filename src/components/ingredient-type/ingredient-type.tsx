import React from "react";
import ingredientStyles from "./ingredient-type.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";

// This component contains groups of ingredients, for example buns
const IngredientType = (props: any) => {
  return (
    <div>
      <p
        className={`${ingredientStyles.butchTitle} text text_type_main-medium`}
      >
        {props.children}
      </p>
      <div className={ingredientStyles.ingredientsButch}>
        {props.data.map((item: any) => {
          return <IngredientCard key={item._id} ingredient={item} />
        })}

      </div>
    </div>
  );
};

export default IngredientType;
